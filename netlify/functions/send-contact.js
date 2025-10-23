const { Resend } = require("resend");
const formidable = require('formidable');

console.log("=== SEND CONTACT FUNCTION START ===");
console.log("Environment variables:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
  DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
});

const resend = new Resend(process.env.RESEND_API_KEY);

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
      // Netlify v3: body est base64
      const bodyBuffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');
      // Simuler stream http classique
      let fields = {};
      await new Promise((resolve, reject) => {
        const form = formidable({ multiples: false });
        form.parse({ headers: { 'content-type': contentType },
                     on: () => {}, resume: () => {},
                     pipe: () => {}, unpipe: () => {} },
          bodyBuffer,
          (err, parsedFields, files) => {
            if (err) {
              reject(err);
            } else {
              fields = parsedFields;
              resolve();
            }
          });
      });
      // Si valeurs = array, prendre valeur [0]
      Object.keys(fields).forEach(k => Array.isArray(fields[k]) ? fields[k] = fields[k][0] : null);
      formData = fields;
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
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.DESTINATION_EMAIL,
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