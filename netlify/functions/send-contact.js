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
  console.log("Event body:", event.body);
  
  if (event.httpMethod !== "POST") {
    console.log("Method not allowed:", event.httpMethod);
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const formData = JSON.parse(event.body);
    console.log("Parsed form data:", formData);
    const { firstName, lastName, email, phone, company, position, service, projectType } = formData;

    const emailHtml = `
      <h1>Nouveau message de contact reçu</h1>
      <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
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
    console.log("Subject:", `Nouveau message de contact - ${firstName} ${lastName}`);
    
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.DESTINATION_EMAIL,
      subject: `Nouveau message de contact - ${firstName} ${lastName}`,
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
