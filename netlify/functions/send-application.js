const { Resend } = require("resend");

console.log("=== SEND APPLICATION FUNCTION START ===");
console.log("Environment variables:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
  DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
});
const resend = new Resend(process.env.RESEND_API_KEY);

// Parsing multipart binaire/utf8 (copié de upload-cv.js)
function parseMultipartFormDataBuffer(rawBuffer, boundary) {
  const results = {};
  let attachment = null;
  const boundaryBuffer = Buffer.from(`--${boundary}`);
  let state = 0;
  let partStart = 0;
  for (let i = 0; i < rawBuffer.length; i++) {
    if (
      rawBuffer.slice(i, i + boundaryBuffer.length).equals(boundaryBuffer)
    ) {
      if (state === 1) {
        const partBuffer = rawBuffer.slice(partStart, i - 2); // -2 pour \r\n
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
  console.log("=== SEND APPLICATION HANDLER START ===");
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
      body: JSON.stringify({ success: false, message: "Impossible de lire le formulaire de candidature", error: error.message })
    };
  }
  const firstName = formData.firstName || formData.prenom || '';
  const lastName = formData.lastName || formData.nom || '';
  const email = formData.email || formData.mail || '';
  const phone = formData.phone || formData.telephone || '';
  const position = formData.position || formData.poste || '';
  const experience = formData.experience || formData.experience || '';
  const motivation = formData.motivation || formData.motivation || '';

  const emailHtml = `
    <h1>Nouvelle candidature spontanée reçue</h1>
    <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Téléphone:</strong> ${phone}</p>
    <p><strong>Poste souhaité:</strong> ${position}</p>
    <p><strong>Expérience:</strong> ${experience}</p>
    <h2>Motivation:</h2>
    <p>${motivation}</p>
    <p><strong>CV:</strong> ${attachment ? `✅ ${attachment.filename} (${(attachment.content.length / 1024).toFixed(1)} KB)` : '❌ Non fourni'}</p>
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
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: destinationEmail,
      subject: `Candidature spontanée - ${firstName} ${lastName}`,
      html: emailHtml,
      attachments,
    });
    console.log("Email sent successfully:", emailResult);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Candidature envoyée avec succès" })
    };
  } catch (error) {
    console.error("Error in send-application:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};
