import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extraire les données du formulaire de contact
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const position = formData.get('position') as string;
    const service = formData.get('service') as string;
    const projectType = formData.get('projectType') as string;
    const budget = formData.get('budget') as string;
    const timeline = formData.get('timeline') as string;
    const description = formData.get('description') as string;
    const message = formData.get('message') as string;

    // Préparer le contenu de l'email
    const emailContent = `
Nouveau message de contact reçu :

INFORMATIONS PERSONNELLES :
Nom: ${firstName} ${lastName}
Email: ${email}
Téléphone: ${phone}
Entreprise: ${company}
Poste: ${position}

INFORMATIONS PROJET :
Service souhaité: ${service}
Type de projet: ${projectType}
Budget: ${budget}
Délai: ${timeline}

DESCRIPTION :
${description}

MESSAGE :
${message}
    `;

    // Si Resend est configuré, utiliser Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'onboarding@resend.dev', // Domaine par défaut de Resend
        to: 'edsanas11@gmail.com',
        subject: `Nouveau contact - ${firstName} ${lastName} (${company})`,
        text: emailContent,
      });
    } else {
      // Fallback: simulation d'envoi
      console.log('Message de contact reçu (simulation):', {
        firstName,
        lastName,
        email,
        phone,
        company,
        position,
        service,
        projectType,
        budget,
        timeline,
        description,
        message
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message envoyé avec succès' 
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de l\'envoi du message' 
      },
      { status: 500 }
    );
  }
}

