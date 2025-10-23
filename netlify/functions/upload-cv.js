const { Resend } = require("resend");

console.log("=== UPLOAD CV FUNCTION START ===");
console.log("Environment variables:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
  DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Nouvelle fonction : parser chaque part binaire, et conversion UTF-8 UNIQUE pour champs texte
function parseMultipartFormDataBuffer(rawBuffer, boundary) {
  const results = {};
  let attachment = null;
  const boundaryBuffer = Buffer.from(`--${boundary}`);
  let state = 0;
  let partStart = 0;

  // Chercher chaque boundary
  for (let i = 0; i < rawBuffer.length; i++) {
    if (
      rawBuffer.slice(i, i + boundaryBuffer.length).equals(boundaryBuffer)
    ) {
      if (state === 1) {
        // slice la part [partStart, i) => partBuffer
        const partBuffer = rawBuffer.slice(partStart, i - 2); // -2 pour 

        // Analyse headers/cont (CRLF CRLF)
        const doubleCRLF = partBuffer.indexOf(Buffer.from('\r\n\r\n'));
        if (doubleCRLF !== -1) {
          const headersBuf = partBuffer.slice(0, doubleCRLF).toString();
          const contentBuf = partBuffer.slice(doubleCRLF + 4);
          let fieldName = '';
          let fileName = '';
          let contentType = '';

          const nameMatch = headersBuf.match(/name="([^"]+)"/);
          if (nameMatch) fieldName = nameMatch[1];
          const fileMatch = headersBuf.match(/filename="([^"]*)"/);
          if (fileMatch) fileName = fileMatch[1];
          const ctMatch = headersBuf.match(/Content-Type: (.+)/);
          if (ctMatch) contentType = ctMatch[1];

          if (fileName && fileName.length > 0) {
            // C'est un fichier => contentBuf binaire DIRECT
            attachment = {
              filename: fileName,
              content: contentBuf.toString("base64"),
              type: contentType || "application/pdf"
            };

            console.log('DEBUG FILE =', {
              name: fileName,
              contentType,
              size: contentBuf.length,
              start: contentBuf.slice(0, 8).toString("hex"),
              isPDF: contentBuf.slice(0, 4).toString() === '%PDF'
            });
          } else if (fieldName) {
            // Champ texte converti utf-8
            results[fieldName] = contentBuf.toString('utf8').trim();
            console.log(`DEBUG TEXT FIELD - ${fieldName}:`, results[fieldName]);
          }
        }
      }
      state = 1;
      partStart = i + boundaryBuffer.length + 2; // +2 pour sauter \r\n
      i = partStart;
    }
  }
  return { formData: results, attachment };
}

exports.handler = async (event) => {
  console.log("=== UPLOAD CV HANDLER START ===");
  if (event.httpMethod !== "POST")
    return { statusCode: 405, body: "Method Not Allowed" };

  let formData = {};
  let attachment = null;
  const contentType = event.headers['content-type'] || event.headers['Content-Type'];
  try {
    if (contentType && contentType.includes('multipart/form-data')) {
      const boundaryMatch = contentType.match(/boundary=([^;]+)/);
      const boundary = boundaryMatch ? boundaryMatch[1] : '----WebKitFormBoundary';
      const rawBuffer = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : Buffer.from(event.body, 'binary');
      const parsed = parseMultipartFormDataBuffer(rawBuffer, boundary);
      formData = parsed.formData;
      attachment = parsed.attachment;
      console.log("Parsed multipart (buffer):", formData, attachment);
    } else if (contentType && contentType.includes('application/json')) {
      formData = JSON.parse(event.body);
    } else if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
      const params = new URLSearchParams(event.body);
      formData = Object.fromEntries(params);
    }
  } catch (error) {
    console.error("Could not parse body, error:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Impossible de lire le formulaire d'offre d'emploi", error: error.message })
    };
  }

  let allFieldsHtml = '';
  for (const [key, value] of Object.entries(formData)) {
    if (value && value !== '') {
      allFieldsHtml += `<p><strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> ${value}</p>`;
    }
  }

  const emailHtml = `
    <h1>Nouvelle Candidature Reçue - Partenaire Services</h1>
    <h2>📋 Détails de la candidature</h2>
    ${allFieldsHtml}
    <h2>📎 Documents</h2>
    <p><strong>CV:</strong> ${attachment ? `✅ ${attachment.filename} (${(attachment.content.length / 1024).toFixed(1)} KB)` : '❌ Non fourni'}</p>
    <hr>
    <p><strong>Action requise:</strong> Veuillez examiner cette candidature et contacter le candidat si nécessaire.</p>
    <p><em>Cet email a été envoyé automatiquement par le système de candidatures de Partenaire Services.</em></p>
  `;

  const attachments = [];
  if (attachment) {
    attachments.push({
      filename: attachment.filename,
      content: attachment.content,
      type: attachment.type,
      disposition: "attachment",
    });
  }
  try {
    const destinationEmail = process.env.DESTINATION_EMAIL || 'edsanas11@gmail.com';
    let finalEmail = applyEmail || destinationEmail;
    if (finalEmail && typeof finalEmail === 'string')
      finalEmail = finalEmail.trim().replace(/[<>]/g, '');
    if (!finalEmail || !finalEmail.includes('@') || finalEmail.length < 5)
      finalEmail = 'edsanas11@gmail.com';
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: finalEmail,
      subject: `Candidature pour l'offre - ${jobTitle || ''} (${firstName || ''} ${lastName || ''})`,
      html: emailHtml,
      attachments,
    });
    console.log("Email sent successfully:", emailResult);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Candidature envoyée avec succès" })
    };
  } catch (error) {
    console.error("Error in upload-cv:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};