const { Resend } = require("resend");

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
  
  try {
    let formData = {};
    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    console.log("Content-Type:", contentType);
    
    // Essayer JSON d'abord
    try {
      formData = JSON.parse(event.body);
      console.log("Parsed as JSON:", formData);
    } catch (jsonError) {
      // Si JSON échoue, essayer URLSearchParams
      try {
        const params = new URLSearchParams(event.body);
        formData = Object.fromEntries(params);
        console.log("Parsed as URLSearchParams:", formData);
      } catch (urlError) {
        // Dernier recours : parsing manuel simple
        console.log("Trying manual parsing...");
        const lines = event.body.split('\n');
        for (const line of lines) {
          if (line.includes('=')) {
            const [key, value] = line.split('=', 2);
            if (key && value) {
              formData[key.trim()] = value.trim();
            }
          }
        }
        console.log("Manual parsing result:", formData);
      }
    }
    
    console.log('Final form data:', formData);
    console.log('Form data keys:', Object.keys(formData));
    
    // Gestion des champs en FR et fallback EN
    const nom = formData.firstName || formData.prenom || formData.nom || '';
    const prenom = formData.lastName || formData.prenom || '';
    const email = formData.email || formData.mail || '';
    const phone = formData.phone || formData.telephone || '';
    const company = formData.company || formData.entreprise || '';
    const position = formData.position || formData.poste || '';
    const service = formData.service || formData.serviceInteresse || '';
    const projectType = formData.projectType || formData.typeProjet || '';
    
    // Correction concat nom/prénom : si nom == prénom, n'affiche qu'une fois
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
    
    console.log("Attempting to send email...");
    console.log("From: onboarding@resend.dev");
    console.log("To:", process.env.DESTINATION_EMAIL);
    console.log("Subject:", `Nouveau message de contact - ${displayNom}`);
    
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
    console.error("Error stack:", error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};