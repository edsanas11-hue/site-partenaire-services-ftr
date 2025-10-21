import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || 'ps-admin-2025';
    
    if (password !== expectedPassword) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
    }

    // Générer un token de session (simple pour cet exemple)
    const token = process.env.ADMIN_TOKEN || 'ps-token-2025';
    
    return NextResponse.json({ 
      success: true, 
      token,
      message: 'Authentification réussie' 
    });
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'authentification' }, { status: 500 });
  }
}

