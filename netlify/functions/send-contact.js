const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const formData = JSON.parse(event.body);
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

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.DESTINATION_EMAIL,
      subject: `Nouveau message de contact - ${firstName} ${lastName}`,
      html: emailHtml
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Message envoyé avec succès" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};
