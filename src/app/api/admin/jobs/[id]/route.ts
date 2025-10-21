import { NextRequest, NextResponse } from 'next/server';
import { loadJobs, saveJobs, validateJobOffer, JobOffer } from '@/lib/jobs-storage';

// Fonction pour vérifier l'authentification admin
function checkAdminAuth(request: NextRequest): boolean {
  const adminToken = request.headers.get('x-admin-token');
  const expectedToken = process.env.ADMIN_TOKEN || 'ps-token-2025';
  
  return adminToken === expectedToken;
}

// GET - Récupérer une offre spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const jobs = await loadJobs();
    const job = jobs.find(j => j.id === id);
    
    if (!job) {
      return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error('Erreur lors du chargement de l\'offre:', error);
    return NextResponse.json({ error: 'Erreur lors du chargement de l\'offre' }, { status: 500 });
  }
}

// PUT - Mettre à jour une offre
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const jobs = await loadJobs();
    const jobIndex = jobs.findIndex(j => j.id === id);
    
    if (jobIndex === -1) {
      return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 });
    }

    // Mettre à jour l'offre existante
    const updatedJob: JobOffer = {
      ...jobs[jobIndex],
      ...body,
      id: id, // Garder l'ID original
      updatedAt: new Date().toISOString(),
    };

    // Validation
    const validation = validateJobOffer(updatedJob);
    if (!validation.valid) {
      return NextResponse.json({ 
        error: 'Données invalides', 
        details: validation.errors 
      }, { status: 400 });
    }

    jobs[jobIndex] = updatedJob;
    await saveJobs(jobs);

    return NextResponse.json({ 
      success: true, 
      job: updatedJob,
      message: 'Offre mise à jour avec succès' 
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'offre:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de l\'offre' }, { status: 500 });
  }
}

// DELETE - Supprimer une offre
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const jobs = await loadJobs();
    const jobIndex = jobs.findIndex(j => j.id === id);
    
    if (jobIndex === -1) {
      return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 });
    }

    const deletedJob = jobs[jobIndex];
    jobs.splice(jobIndex, 1);
    await saveJobs(jobs);

    return NextResponse.json({ 
      success: true,
      message: 'Offre supprimée avec succès',
      job: deletedJob
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'offre:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression de l\'offre' }, { status: 500 });
  }
}

