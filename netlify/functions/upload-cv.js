const { Resend } = require("resend");

console.log("=== UPLOAD CV FUNCTION START ===");
console.log("Environment variables:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
  DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
});

const resend = new Resend(process.env.RESEND_API_KEY);

let attachmentBuffer = null;
let attachmentName = null;
let attachmentType = null;

function parseMultipartFormData(body, boundary) {
  const formData = {};
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
      if (fieldName && fileName && valueLines.length > 0) {
        // Fichier attaché
        const fileData = valueLines.join('\n').trim();
        attachmentBuffer = Buffer.from(fileData, 'base64');
        attachmentName = fileName;
        attachmentType = contentType || "application/octet-stream";
      } else if (fieldName && valueLines.length > 0) {
        formData[fieldName] = valueLines.join('\n').trim();
      }
    }
  }
  return formData;
}

exports.handler = async (event) => {
  console.log("=== UPLOAD CV HANDLER START ===");
  console.log("Event method:", event.httpMethod);

  if (event.httpMethod !== "POST") {
    console.log("Method not allowed:", event.httpMethod);
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let formData = {};
  const contentType = event.headers['content-type'] || event.headers['Content-Type'];
  console.log("Content-Type:", contentType);

  try {
    if (contentType && contentType.includes('multipart/form-data')) {
      // Extraire le boundary
      const boundaryMatch = contentType.match(/boundary=([^;]+)/);
      const boundary = boundaryMatch ? boundaryMatch[1] : '----WebKitFormBoundary';
      console.log("Boundary:", boundary);
      // Décoder base64 si nécessaire
      const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
      formData = parseMultipartFormData(body, boundary);
      console.log("Parsed as multipart/form-data:", formData);
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
    <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Téléphone:</strong> ${phone}</p>
  `;

  const attachments = [];
  if (attachmentBuffer && attachmentName) {
    attachments.push({
      filename: attachmentName,
      content: attachmentBuffer.toString('base64'),
      type: attachmentType,
      disposition: "attachment",
    });
  }

  try {
    console.log("Attempting to send email...");
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: applyEmail || process.env.DESTINATION_EMAIL,
      subject: `Candidature pour l'offre - ${jobTitle} (${firstName} ${lastName})`,
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
