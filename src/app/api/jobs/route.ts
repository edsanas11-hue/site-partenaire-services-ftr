import { NextResponse } from 'next/server';
import { loadJobs } from '@/lib/jobs-storage';

// GET - Récupérer les offres publiées (API publique)
export async function GET() {
  try {
    const allJobs = await loadJobs();
    
    // Filtrer seulement les offres publiées et les trier par ordre
    const publishedJobs = allJobs
      .filter(job => job.published)
      .sort((a, b) => a.order - b.order);

    return NextResponse.json({ jobs: publishedJobs });
  } catch (error) {
    console.error('Erreur lors du chargement des offres publiques:', error);
    return NextResponse.json({ error: 'Erreur lors du chargement des offres' }, { status: 500 });
  }
}

