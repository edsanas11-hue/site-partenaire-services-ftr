const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const formData = JSON.parse(event.body);
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

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.DESTINATION_EMAIL,
      subject: `Candidature spontanée - ${firstName} ${lastName}`,
      html: emailHtml,
      // attachments à adapter si cvFile est en base64 !
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
