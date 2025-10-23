const { Resend } = require("resend");

console.log("=== UPLOAD CV FUNCTION START ===");
console.log("Environment variables:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
  DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
});
const resend = new Resend(process.env.RESEND_API_KEY);

function parseMultipartFormData(body, boundary) {
  const formData = {};
  let attachment = null;
  const parts = body.split('--' + boundary);
  for (const part of parts) {
    if (part.includes('Content-Disposition: form-data')) {
      const lines = part.split('\r\n');
      let fieldName = '';
      let fileName = '';
      let contentType = '';
      let valueLines = [];
      let inValue = false;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('name="')) {
          const nameMatch = line.match(/name="([^"]+)"/);
          if (nameMatch) fieldName = nameMatch[1];
        }
        if (line.includes('filename="')) {
          const fileMatch = line.match(/filename="([^"]*)"/);
          if (fileMatch) fileName = fileMatch[1];
        }
        if (line.startsWith("Content-Type:")) {
          contentType = line.split("Content-Type:")[1].trim();
        }
        if (line === '' && fieldName) {
          inValue = true;
          continue;
        }
        if (inValue) {
          valueLines.push(line);
        }
      }
      if (fieldName && fileName && valueLines.length > 0 && fileName.length > 0) {
        const fileData = valueLines.join('\n').trim();
        attachment = {
          filename: fileName,
          content: fileData,
          type: contentType || "application/octet-stream"
        };
      } else if (fieldName && valueLines.length > 0 && !fileName) {
        formData[fieldName] = valueLines.join('\n').trim();
      }
    }
  }
  // Ajoute un log détaillé du parsing
  console.log("DEBUG MULTIPART - champs texte:", formData);
  console.log("DEBUG MULTIPART - fichier:", attachment);
  return { formData, attachment };
}

exports.handler = async (event) => {
  console.log("=== UPLOAD CV HANDLER START ===");
  console.log("Event method:", event.httpMethod);
  if (event.httpMethod !== "POST") {
    console.log("Method not allowed:", event.httpMethod);
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  let formData = {};
  let attachment = null;
  const contentType = event.headers['content-type'] || event.headers['Content-Type'];
  console.log("Content-Type:", contentType);
  try {
    if (contentType && contentType.includes('multipart/form-data')) {
      const boundaryMatch = contentType.match(/boundary=([^;]+)/);
      const boundary = boundaryMatch ? boundaryMatch[1] : '----WebKitFormBoundary';
      console.log("Boundary:", boundary);
      const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
      const parsed = parseMultipartFormData(body, boundary);
      formData = parsed.formData;
      attachment = parsed.attachment;
      console.log("Parsed as multipart/form-data:", formData, attachment);
    } else if (contentType && contentType.includes('application/json')) {
      formData = JSON.parse(event.body);
      console.log("Parsed as JSON:", formData);
    } else if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
      const params = new URLSearchParams(event.body);
      formData = Object.fromEntries(params);
      console.log("Parsed as URLSearchParams:", formData);
    }
  } catch (error) {
    console.log("Could not parse body, error:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Impossible de lire le formulaire d'offre d'emploi", error: error.message })
    };
  }
  console.log("Final form data:", formData);
  const { firstName, lastName, email, phone, jobTitle, applyEmail } = formData;
  const emailHtml = `
    <h1>Nouvelle Candidature Reçue - Partenaire Services</h1>
    <h2>📋 Offre: ${jobTitle}</h2>
    <p><strong>Nom:</strong> ${firstName || ''} ${lastName || ''}</p>
    <p><strong>Email:</strong> ${email || ''}</p>
    <p><strong>Téléphone:</strong> ${phone || ''}</p>
  `;
  const attachments = [];
  if (attachment) {
    attachments.push({
      filename: attachment.filename,
      content: Buffer.from(attachment.content, 'base64').toString('base64'),
      type: attachment.type,
      disposition: "attachment",
    });
  }
  try {
    console.log("Attempting to send email...");
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: applyEmail || process.env.DESTINATION_EMAIL,
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
