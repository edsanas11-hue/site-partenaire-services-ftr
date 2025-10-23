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
      let valueStart = -1;
      // Cherche les headers du champ
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
        if (line === "" && valueStart === -1) {
          valueStart = i + 1;
          break;
        }
      }
      if (fieldName) {
        if (fileName && fileName.length > 0) {
          // Champ FILE
          // Prends TOUTES les lignes jusqu'à la fin du chunk, inclus (certaines libs laissent un "\r\n" de trop à la fin)
          const valueLines = lines.slice(valueStart);
          if (valueLines.at(-1) === "" || valueLines.at(-1) === undefined) valueLines.pop();
          // Re-crée un buffer binaire au lieu de traiter en base64
          const bufferContent = Buffer.from(valueLines.join("\r\n"), "binary");
          attachment = {
            filename: fileName,
            content: bufferContent.toString("base64"),
            type: contentType || "application/octet-stream"
          };
          console.log("DEBUG FILE DETECTED", { name: fileName, type: contentType || "application/octet-stream", size: bufferContent.length });
        } else {
          // Champ texte
          const valueLines = lines.slice(valueStart);
          if (valueLines.at(-1) === "" || valueLines.at(-1) === undefined) valueLines.pop();
          formData[fieldName] = valueLines.join("\n").trim();
        }
      }
    }
  }
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
      content: attachment.content, // Buffer.toString('base64'), already correct
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
