const { Resend } = require('resend');

const resend = new Resend('re_b8s8YdGX_Jby8ffDdJ6qvWR8CAG44cmGt');

async function testEmail() {
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'edsanas11@gmail.com',
      subject: 'Test Email',
      html: '<h1>Test Email</h1><p>Ceci est un test d\'envoi d\'email.</p>',
    });
    
    console.log('Email envoyé avec succès:', result);
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
  }
}

testEmail();
