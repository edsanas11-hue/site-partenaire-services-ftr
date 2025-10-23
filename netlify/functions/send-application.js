const { Resend } = require("resend");

console.log("=== SEND APPLICATION FUNCTION START ===");
console.log("Environment variables:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
  DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Fonction pour parser multipart/form-data manuellement
function parseMultipartFormData(body, boundary) {
  console.log("DEBUG PARSING - Body length:", body.length);
  console.log("DEBUG PARSING - Boundary:", boundary);
  
  const formData = {};
  let attachment = null;
  
  // Nettoyer le body des caractères de fin
  const cleanBody = body.replace(/\r\n$/, '');
  const parts = cleanBody.split('--' + boundary);
  
  console.log("DEBUG PARSING - Parts count:", parts.length);
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    console.log(`DEBUG PARSING - Part ${i} length:`, part.length);
    
    if (part.includes('Content-Disposition: form-data') && part.trim() !== '') {
      const lines = part.split('\r\n');
      let fieldName = '';
      let fileName = '';
      let contentType = '';
      let valueStart = -1;
      
      // Cherche les headers du champ
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
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
          valueStart = j + 1;
        }
      }
      
      console.log(`DEBUG PARSING - Field: ${fieldName}, File: ${fileName}, ValueStart: ${valueStart}`);
      
      if (fieldName && valueStart > 0) {
        if (fileName && fileName.length > 0) {
          // Champ FILE
          const valueLines = lines.slice(valueStart);
          // Supprimer la dernière ligne vide si elle existe
          if (valueLines.length > 0 && valueLines[valueLines.length - 1] === '') {
            valueLines.pop();
          }
          
          if (valueLines.length > 0) {
            const fileContent = valueLines.join('\r\n');
            const bufferContent = Buffer.from(fileContent, 'binary');
            attachment = {
              filename: fileName,
              content: bufferContent.toString("base64"),
              type: contentType || "application/octet-stream"
            };
            console.log("DEBUG FILE DETECTED", { 
              name: fileName, 
              type: contentType || "application/octet-stream", 
              size: bufferContent.length,
              lines: valueLines.length 
            });
          }
        } else {
          // Champ texte
          const valueLines = lines.slice(valueStart);
          // Supprimer la dernière ligne vide si elle existe
          if (valueLines.length > 0 && valueLines[valueLines.length - 1] === '') {
            valueLines.pop();
          }
          
          if (valueLines.length > 0) {
            formData[fieldName] = valueLines.join('\n').trim();
            console.log(`DEBUG TEXT FIELD - ${fieldName}:`, formData[fieldName]);
          }
        }
      }
    }
  }
  
  console.log("DEBUG MULTIPART - champs texte:", formData);
  console.log("DEBUG MULTIPART - fichier:", attachment);
  return { formData, attachment };
}

exports.handler = async (event) => {
  console.log("=== SEND APPLICATION HANDLER START ===");
  console.log("Event method:", event.httpMethod);
  console.log("Event headers:", event.headers);
  console.log("Event body type:", typeof event.body);
  console.log("Event body length:", event.body ? event.body.length : 0);

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
      // Extraire le boundary
      const boundaryMatch = contentType.match(/boundary=([^;]+)/);
      const boundary = boundaryMatch ? boundaryMatch[1] : '----WebKitFormBoundary';
      console.log("Boundary:", boundary);
      // Décoder base64 si nécessaire
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
      body: JSON.stringify({ success: false, message: "Impossible de lire le formulaire de candidature", error: error.message })
    };
  }

  console.log('Final form data:', formData);

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
    console.log("Attempting to send email...");
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.DESTINATION_EMAIL,
      subject: `Candidature spontanée - ${firstName} ${lastName}`,
      html: emailHtml,
      attachments: attachments
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
