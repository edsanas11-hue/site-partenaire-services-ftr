const { Resend } = require("resend");

console.log("=== SEND APPLICATION FUNCTION START ===");
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
  const cvFile = formData.cvFile || formData.cv || '';

  const emailHtml = `
    <h1>Nouvelle candidature spontanée reçue</h1>
    <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Téléphone:</strong> ${phone}</p>
    <p><strong>Poste souhaité:</strong> ${position}</p>
    <p><strong>Expérience:</strong> ${experience}</p>
    <h2>Motivation:</h2>
    <p>${motivation}</p>
    <p>CV: ${cvFile ? cvFile : 'Non fourni'}</p>
  `;

  try {
    console.log("Attempting to send email...");
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.DESTINATION_EMAIL,
      subject: `Candidature spontanée - ${firstName} ${lastName}`,
      html: emailHtml
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
