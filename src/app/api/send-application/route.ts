import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extraire les données du formulaire
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const experience = formData.get('experience') as string;
    const motivation = formData.get('motivation') as string;
    const cvFile = formData.get('cv') as File | null;

    // Préparer le contenu de l'email
    const emailContent = `
Nouvelle candidature spontanée reçue :

Nom: ${firstName} ${lastName}
Email: ${email}
Téléphone: ${phone}
Poste souhaité: ${position}
Expérience: ${experience}

Motivation:
${motivation}

CV: ${cvFile ? cvFile.name : 'Non fourni'}
    `;

    // Si Resend est configuré, utiliser Resend
    if (process.env.RESEND_API_KEY) {
      const attachments = [];
      if (cvFile) {
        const buffer = Buffer.from(await cvFile.arrayBuffer());
        attachments.push({
          filename: cvFile.name,
          content: buffer,
        });
      }

      await resend.emails.send({
        from: 'onboarding@resend.dev', // Domaine par défaut de Resend
        to: 'edsanas11@gmail.com',
        subject: `Candidature spontanée - ${firstName} ${lastName}`,
        text: emailContent,
        attachments: attachments,
      });
    } else {
      // Fallback: simulation d'envoi
      console.log('Candidature reçue (simulation):', {
        firstName,
        lastName,
        email,
        phone,
        position,
        experience,
        motivation,
        cvFile: cvFile ? cvFile.name : null
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Candidature envoyée avec succès' 
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de la candidature:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de l\'envoi de la candidature' 
      },
      { status: 500 }
    );
  }
}