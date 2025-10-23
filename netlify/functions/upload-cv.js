const { Resend } = require("resend");

console.log("=== UPLOAD CV FUNCTION START ===");
console.log("Environment variables:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
  DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
});
const resend = new Resend(process.env.RESEND_API_KEY);

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
          // Champ FILE - traitement binaire robuste
          const valueLines = lines.slice(valueStart);
          // Supprimer la dernière ligne vide si elle existe
          if (valueLines.length > 0 && valueLines[valueLines.length - 1] === '') {
            valueLines.pop();
          }
          
          if (valueLines.length > 0) {
            // Pour les fichiers, traitement binaire ultra-robuste
            const fileContent = valueLines.join('\r\n');
            
            // Méthode 1: Essayer de décoder en base64 d'abord
            let bufferContent;
            let method = 'unknown';
            
            try {
              // Vérifier si c'est du base64 valide
              const base64Test = Buffer.from(fileContent, 'base64');
              const backToString = base64Test.toString('base64');
              if (backToString === fileContent) {
                bufferContent = base64Test;
                method = 'base64';
              } else {
                throw new Error('Not valid base64');
              }
            } catch (e) {
              // Méthode 2: Traitement binaire direct
              try {
                bufferContent = Buffer.from(fileContent, 'binary');
                method = 'binary';
              } catch (e2) {
                // Méthode 3: Traitement UTF-8 puis conversion
                bufferContent = Buffer.from(fileContent, 'utf8');
                method = 'utf8';
              }
            }
            
            attachment = {
              filename: fileName,
              content: bufferContent.toString("base64"),
              type: contentType || "application/pdf"
            };
            console.log("DEBUG FILE DETECTED", { 
              name: fileName, 
              type: contentType || "application/pdf", 
              size: bufferContent.length,
              lines: valueLines.length,
              method: method,
              firstBytes: bufferContent.slice(0, 10).toString('hex'),
              isPDF: bufferContent.slice(0, 4).toString() === '%PDF'
            });
          }
        } else {
          // Champ texte - extraction de la vraie valeur
          const valueLines = lines.slice(valueStart);
          // Supprimer la dernière ligne vide si elle existe
          if (valueLines.length > 0 && valueLines[valueLines.length - 1] === '') {
            valueLines.pop();
          }
          if (valueLines.length > 0) {
            // Prendre la dernière ligne non vide (la vraie valeur)
            let fullValue = valueLines.join('\n').trim();
            let valueArr = fullValue.split('\n');
            let value = valueArr.pop().trim();
            formData[fieldName] = value;
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
      content: attachment.content, // Buffer.toString('base64'), already correct
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
