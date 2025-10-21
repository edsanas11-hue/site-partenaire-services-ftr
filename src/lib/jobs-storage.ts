import { put, del, list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

export interface JobOffer {
  id: string;
  title: string;
  location: string;
  type: string;
  department: string;
  summary: string;
  requirements: string[];
  missions: string[];
  applyEmail: string;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const BLOB_FILENAME = 'jobs.json';
const LOCAL_DATA_PATH = path.join(process.cwd(), 'data', 'jobs.json');

// Fonction pour créer le dossier data s'il n'existe pas
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Fonction pour lire les données depuis le stockage local ou Vercel Blob
export async function loadJobs(): Promise<JobOffer[]> {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN) {
      // En production avec Vercel Blob
      try {
        const { blobs } = await list({ prefix: BLOB_FILENAME });
        if (blobs.length > 0) {
          const response = await fetch(blobs[0].url);
          const data = await response.json();
          return data;
        }
      } catch (error) {
        console.warn('Erreur lors du chargement depuis Vercel Blob:', error);
      }
    }

    // Fallback: stockage local
    ensureDataDirectory();
    if (fs.existsSync(LOCAL_DATA_PATH)) {
      const data = fs.readFileSync(LOCAL_DATA_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Erreur lors du chargement des offres:', error);
  }

  return [];
}

// Fonction pour sauvegarder les données
export async function saveJobs(jobs: JobOffer[]): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN) {
      // En production avec Vercel Blob
      try {
        const jsonData = JSON.stringify(jobs, null, 2);
        await put(BLOB_FILENAME, jsonData, {
          access: 'public',
          contentType: 'application/json',
        });
        return;
      } catch (error) {
        console.warn('Erreur lors de la sauvegarde sur Vercel Blob:', error);
      }
    }

    // Fallback: stockage local
    ensureDataDirectory();
    fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(jobs, null, 2));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des offres:', error);
    throw error;
  }
}

// Fonction pour générer un ID unique
export function generateJobId(): string {
  return `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Fonction pour valider une offre d'emploi
export function validateJobOffer(job: Partial<JobOffer>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!job.title || job.title.trim().length === 0) {
    errors.push('Le titre est requis');
  }

  if (!job.location || job.location.trim().length === 0) {
    errors.push('Le lieu est requis');
  }

  if (!job.type || job.type.trim().length === 0) {
    errors.push('Le type de contrat est requis');
  }

  if (!job.department || job.department.trim().length === 0) {
    errors.push('Le département est requis');
  }

  if (!job.summary || job.summary.trim().length === 0) {
    errors.push('Le résumé est requis');
  }

  if (!job.applyEmail || job.applyEmail.trim().length === 0) {
    errors.push('L\'email de candidature est requis');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(job.applyEmail)) {
    errors.push('L\'email de candidature n\'est pas valide');
  }

  if (!job.requirements || !Array.isArray(job.requirements) || job.requirements.length === 0) {
    errors.push('Au moins une exigence est requise');
  }

  if (!job.missions || !Array.isArray(job.missions) || job.missions.length === 0) {
    errors.push('Au moins une mission est requise');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

