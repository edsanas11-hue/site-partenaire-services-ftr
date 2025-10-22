import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Load Supabase credentials from env
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET - Récupérer les offres publiées (API publique)
export async function GET() {
  try {
    // Query Supabase for published jobs
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('published', true)
      .order('order', { ascending: true });
    if (error) {
      console.error('Erreur Supabase (public jobs):', error);
      return NextResponse.json({ error: 'Erreur lors du chargement des offres' }, { status: 500 });
    }
    return NextResponse.json({ jobs: data || [] });
  } catch (error) {
    console.error('Erreur lors du chargement des offres publiques:', error);
    return NextResponse.json({ error: 'Erreur lors du chargement des offres' }, { status: 500 });
  }
}

