import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);
const destinationEmail = process.env.DESTINATION_EMAIL || 'edsanas11@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const applyEmail = formData.get('applyEmail') as string;
    const cvFile = formData.get('cv') as File | null;

    const attachments = [];
    if (cvFile) {
      const arrayBuffer = await cvFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: cvFile.name,
        content: buffer,
        contentType: cvFile.type,
      });
    }

    const emailHtml = `
      <h1>Nouvelle Candidature Reçue - Partenaire Services</h1>
      
      <h2>📋 Détails de l'Offre</h2>
      <p><strong>Poste:</strong> ${jobTitle}</p>
      
      <h2>👤 Informations du Candidat</h2>
      <p><strong>Nom complet:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${phone}</p>
      
      <h2>📎 Documents</h2>
      <p><strong>CV:</strong> ${cvFile ? `✅ ${cvFile.name} (${(cvFile.size / 1024).toFixed(1)} KB)` : '❌ Non fourni'}</p>
      
      <hr>
      <p><strong>Action requise:</strong> Veuillez examiner cette candidature et contacter le candidat si nécessaire.</p>
      <p><em>Cet email a été envoyé automatiquement par le système de candidatures de Partenaire Services.</em></p>
    `;

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: applyEmail,
        subject: `Candidature pour l'offre - ${jobTitle} (${firstName} ${lastName})`,
        html: emailHtml,
        attachments: attachments,
      });
      return NextResponse.json({ success: true, message: 'Candidature envoyée avec succès' });
    } else {
      console.warn("RESEND_API_KEY non configuré. L'email ne sera pas envoyé réellement.");
      console.log("Candidature simulée:", { firstName, lastName, email, phone, jobTitle, applyEmail, cv: cvFile?.name });
      return NextResponse.json({ success: true, message: 'Candidature simulée envoyée avec succès (RESEND_API_KEY non configuré)' });
    }

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json({ success: false, message: 'Erreur lors de l\'envoi de la candidature. Veuillez réessayer.' }, { status: 500 });
  }
}
