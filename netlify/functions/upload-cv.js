const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const formData = JSON.parse(event.body);
    const { firstName, lastName, email, phone, jobTitle, applyEmail } = formData;

    const emailHtml = `
      <h1>Nouvelle Candidature Reçue - Partenaire Services</h1>
      <h2>📋 Offre: ${jobTitle}</h2>
      <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${phone}</p>
    `;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: applyEmail || process.env.DESTINATION_EMAIL,
      subject: `Candidature pour l'offre - ${jobTitle} (${firstName} ${lastName})`,
      html: emailHtml
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Candidature envoyée avec succès" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};
