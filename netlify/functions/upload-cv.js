const { Resend } = require("resend");

console.log("=== UPLOAD CV FUNCTION START ===");
console.log("Environment variables:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
  DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
});

const resend = new Resend(process.env.RESEND_API_KEY);

// NOUVELLE FONCTION: Parsing binaire robuste
function parseMultipartFormDataBinary(buffer, boundary) {
  console.log("DEBUG BINARY PARSING - Buffer length:", buffer.length);
  console.log("DEBUG BINARY PARSING - Boundary:", boundary);

  const formData = {};
  let attachment = null;

  // Convertir le buffer en string pour le parsing
  const body = buffer.toString('binary');
  const parts = body.split('--' + boundary);

  console.log("DEBUG BINARY PARSING - Parts count:", parts.length);

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.includes('Content-Disposition: form-data') && part.trim() !== '') {
      
      // Trouver la position du double CRLF qui sépare headers du contenu
      const doubleCRLF = '\r\n\r\n';
      const headerEnd = part.indexOf(doubleCRLF);
      
      if (headerEnd === -1) continue;
      
      const headers = part.substring(0, headerEnd);
      const content = part.substring(headerEnd + doubleCRLF.length);
      
      // Parser les headers
      let fieldName = '';
      let fileName = '';
      let contentType = '';
      
      if (headers.includes('name="')) {
        const nameMatch = headers.match(/name="([^"]+)"/);
        if (nameMatch) fieldName = nameMatch[1];
      }
      if (headers.includes('filename="')) {
        const fileMatch = headers.match(/filename="([^"]*)"/);
        if (fileMatch) fileName = fileMatch[1];
      }
      if (headers.includes("Content-Type:")) {
        contentType = headers.split("Content-Type:")[1].trim();
      }

      console.log(`DEBUG BINARY PARSING - Field: ${fieldName}, File: ${fileName}`);

      if (fieldName) {
        if (fileName && fileName.length > 0) {
          // FICHIER: Traitement binaire pur
          const fileBuffer = Buffer.from(content, 'binary');
          
          attachment = {
            filename: fileName,
            content: fileBuffer.toString("base64"),
            type: contentType || "application/pdf"
          };
          
          console.log("DEBUG BINARY FILE DETECTED", { 
            name: fileName, 
            type: contentType || "application/pdf", 
            size: fileBuffer.length,
            firstBytes: fileBuffer.slice(0, 10).toString('hex'),
            isPDF: fileBuffer.slice(0, 4).toString() === '%PDF'
          });
        } else {
          // TEXTE: Extraction simple
          formData[fieldName] = content.trim();
          console.log(`DEBUG BINARY TEXT FIELD - ${fieldName}:`, formData[fieldName]);
        }
      }
    }
  }

  console.log("DEBUG BINARY MULTIPART - champs texte:", formData);
  console.log("DEBUG BINARY MULTIPART - fichier:", attachment);
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
      // Extraire le boundary
      const boundaryMatch = contentType.match(/boundary=([^;]+)/);
      const boundary = boundaryMatch ? boundaryMatch[1] : '----WebKitFormBoundary';
      console.log("Boundary:", boundary);
      console.log("isBase64Encoded:", event.isBase64Encoded);
      
      // CORRECTION CRITIQUE: Traitement binaire robuste
      let rawBody;
      if (event.isBase64Encoded) {
        // Le body est en base64, on le décode en buffer binaire
        rawBody = Buffer.from(event.body, 'base64');
        console.log("Body decoded from base64, buffer length:", rawBody.length);
      } else {
        // Le body est déjà en string, on le convertit en buffer
        rawBody = Buffer.from(event.body, 'binary');
        console.log("Body as binary buffer, length:", rawBody.length);
      }
      
      const parsed = parseMultipartFormDataBinary(rawBody, boundary);
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
  
  console.log("DEBUG EMAIL VALUES:");
  console.log("- firstName:", firstName);
  console.log("- lastName:", lastName);
  console.log("- email:", email);
  console.log("- phone:", phone);
  console.log("- jobTitle:", jobTitle);
  console.log("- applyEmail:", applyEmail);
  
  const emailHtml = `
    <h1>Nouvelle Candidature Reçue - Partenaire Services</h1>
    
    <h2>📋 Détails de l'Offre</h2>
    <p><strong>Poste:</strong> ${jobTitle || 'Non spécifié'}</p>
    
    <h2>👤 Informations du Candidat</h2>
    <p><strong>Nom complet:</strong> ${firstName || ''} ${lastName || ''}</p>
    <p><strong>Email:</strong> ${email || 'Non fourni'}</p>
    <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
    
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
    console.log("Attempting to send email...");
    console.log("DESTINATION_EMAIL value:", process.env.DESTINATION_EMAIL);
    console.log("applyEmail value:", applyEmail);
    
    // Validation et nettoyage de l'email de destination
    const destinationEmail = process.env.DESTINATION_EMAIL || 'edsanas11@gmail.com';
    let finalEmail = applyEmail || destinationEmail;
    
    // Nettoyer l'email s'il contient des caractères invalides
    if (finalEmail && typeof finalEmail === 'string') {
        finalEmail = finalEmail.trim().replace(/[<>]/g, '');
    }
    
    // Fallback si l'email n'est toujours pas valide
    if (!finalEmail || !finalEmail.includes('@') || finalEmail.length < 5) {
        finalEmail = 'edsanas11@gmail.com';
        console.log("Email invalide détecté, utilisation du fallback:", finalEmail);
    }
    
    console.log("Final email to send to:", finalEmail);
    
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