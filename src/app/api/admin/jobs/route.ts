import { NextRequest, NextResponse } from 'next/server';
import { loadJobs, saveJobs, generateJobId, validateJobOffer, JobOffer } from '@/lib/jobs-storage';

// Fonction pour vérifier l'authentification admin
function checkAdminAuth(request: NextRequest): boolean {
  const adminToken = request.headers.get('x-admin-token');
  const expectedToken = process.env.ADMIN_TOKEN || 'ps-token-2025';
  
  return adminToken === expectedToken;
}

// GET - Récupérer toutes les offres
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const jobs = await loadJobs();
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Erreur lors du chargement des offres:', error);
    return NextResponse.json({ error: 'Erreur lors du chargement des offres' }, { status: 500 });
  }
}

// POST - Créer une nouvelle offre
export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const jobs = await loadJobs();
    
    // Générer un nouvel ID et les timestamps
    const newJob: JobOffer = {
      id: generateJobId(),
      title: body.title || '',
      location: body.location || '',
      type: body.type || '',
      department: body.department || '',
      summary: body.summary || '',
      requirements: body.requirements || [],
      missions: body.missions || [],
      applyEmail: body.applyEmail || '',
      published: body.published || false,
      order: body.order || jobs.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Validation
    const validation = validateJobOffer(newJob);
    if (!validation.valid) {
      return NextResponse.json({ 
        error: 'Données invalides', 
        details: validation.errors 
      }, { status: 400 });
    }

    // Ajouter la nouvelle offre
    jobs.push(newJob);
    await saveJobs(jobs);

    return NextResponse.json({ 
      success: true, 
      job: newJob,
      message: 'Offre créée avec succès' 
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'offre:', error);
    return NextResponse.json({ error: 'Erreur lors de la création de l\'offre' }, { status: 500 });
  }
}

