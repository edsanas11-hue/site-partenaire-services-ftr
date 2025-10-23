const { Resend } = require("resend");

console.log("=== SEND CONTACT FUNCTION START ===");
console.log("Environment variables:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
  DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Fonction pour parser multipart/form-data manuellement
function parseMultipartFormData(body, boundary) {
  const formData = {};
  const parts = body.split('--' + boundary);
  
  for (const part of parts) {
    if (part.includes('Content-Disposition: form-data')) {
      const lines = part.split('\r\n');
      let fieldName = '';
      let fieldValue = '';
      let inValue = false;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.includes('name="')) {
          const nameMatch = line.match(/name="([^"]+)"/);
          if (nameMatch) {
            fieldName = nameMatch[1];
          }
        }
        
        if (line === '' && fieldName) {
          inValue = true;
          continue;
        }
        
        if (inValue && fieldName) {
          if (fieldValue) fieldValue += '\n';
          fieldValue += line;
        }
      }
      
      if (fieldName && fieldValue) {
        formData[fieldName] = fieldValue.trim();
      }
    }
  }
  
  return formData;
}

exports.handler = async (event) => {
  console.log("=== SEND CONTACT HANDLER START ===");
  console.log("Event method:", event.httpMethod);
  console.log("Event headers:", event.headers);
  console.log("Event body type:", typeof event.body);
  console.log("Event body length:", event.body ? event.body.length : 0);

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
      body: JSON.stringify({ success: false, message: "Impossible de lire le formulaire contact", error: error.message })
    };
  }

  console.log('Final form data:', formData);

  const nom = formData.firstName || formData.prenom || formData.nom || '';
  const prenom = formData.lastName || formData.prenom || '';
  const email = formData.email || formData.mail || '';
  const phone = formData.phone || formData.telephone || '';
  const company = formData.company || formData.entreprise || '';
  const position = formData.position || formData.poste || '';
  const service = formData.service || formData.serviceInteresse || '';
  const projectType = formData.projectType || formData.typeProjet || '';

  const displayNom = nom === prenom ? nom : nom + ' ' + prenom;

  const emailHtml = `
    <h1>Nouveau message de contact reçu</h1>
    <p><strong>Nom:</strong> ${displayNom}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Téléphone:</strong> ${phone}</p>
    <p><strong>Entreprise:</strong> ${company}</p>
    <p><strong>Poste:</strong> ${position}</p>
    <p><strong>Service intéressé:</strong> ${service}</p>
    <p><strong>Type de projet:</strong> ${projectType}</p>
  `;

  try {
    console.log("Attempting to send email...");
    console.log("DESTINATION_EMAIL value:", process.env.DESTINATION_EMAIL);
    
    const destinationEmail = process.env.DESTINATION_EMAIL || 'edsanas11@gmail.com';
    console.log("Final email to send to:", destinationEmail);
    
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: destinationEmail,
      subject: `Nouveau message de contact - ${displayNom}`,
      html: emailHtml
    });
    console.log("Email sent successfully:", emailResult);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Message envoyé avec succès" })
    };
  } catch (error) {
    console.error("Error in send-contact:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};