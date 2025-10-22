const { Resend } = require("resend");

console.log("=== SEND APPLICATION FUNCTION START ===");
console.log("Environment variables:", {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
  DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
});

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  console.log("=== SEND APPLICATION HANDLER START ===");
  console.log("Event method:", event.httpMethod);
  console.log("Event body:", event.body);
  
  if (event.httpMethod !== "POST") {
    console.log("Method not allowed:", event.httpMethod);
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const formData = JSON.parse(event.body);
    console.log("Parsed form data:", formData);
    const { firstName, lastName, email, phone, position, experience, motivation, cvFile } = formData;

    // Construire le HTML de l'email
    const emailHtml = `
      <h1>Nouvelle candidature spontanée reçue</h1>
      <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${phone}</p>
      <p><strong>Poste souhaité:</strong> ${position}</p>
      <p><strong>Expérience:</strong> ${experience}</p>
      <h2>Motivation:</h2>
      <p>${motivation}</p>
      <p>CV: ${cvFile ? cvFile.name : 'Non fourni'}</p>
    `;

    console.log("Attempting to send email...");
    console.log("From: onboarding@resend.dev");
    console.log("To:", process.env.DESTINATION_EMAIL);
    console.log("Subject:", `Candidature spontanée - ${firstName} ${lastName}`);
    
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.DESTINATION_EMAIL,
      subject: `Candidature spontanée - ${firstName} ${lastName}`,
      html: emailHtml,
      // attachments à adapter si cvFile est en base64 !
    });
    
    console.log("Email sent successfully:", emailResult);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Candidature envoyée avec succès" })
    };
  } catch (error) {
    console.error("Error in send-application:", error);
    console.error("Error stack:", error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};
