const { Resend } = require("resend");

console.log("=== UPLOAD CV FUNCTION START ===");
console.log("Environment variables:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
  DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
});

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  console.log("=== UPLOAD CV HANDLER START ===");
  console.log("Event method:", event.httpMethod);
  console.log("Event body:", event.body);
  
  if (event.httpMethod !== "POST") {
    console.log("Method not allowed:", event.httpMethod);
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const formData = JSON.parse(event.body);
    console.log("Parsed form data:", formData);
    const { firstName, lastName, email, phone, jobTitle, applyEmail } = formData;

    const emailHtml = `
      <h1>Nouvelle Candidature Reçue - Partenaire Services</h1>
      <h2>📋 Offre: ${jobTitle}</h2>
      <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${phone}</p>
    `;

    console.log("Attempting to send email...");
    console.log("From: onboarding@resend.dev");
    console.log("To:", applyEmail || process.env.DESTINATION_EMAIL);
    console.log("Subject:", `Candidature pour l'offre - ${jobTitle} (${firstName} ${lastName})`);
    
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: applyEmail || process.env.DESTINATION_EMAIL,
      subject: `Candidature pour l'offre - ${jobTitle} (${firstName} ${lastName})`,
      html: emailHtml
    });
    
    console.log("Email sent successfully:", emailResult);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Candidature envoyée avec succès" })
    };
  } catch (error) {
    console.error("Error in upload-cv:", error);
    console.error("Error stack:", error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};
