const fs = require('fs');
const path = require('path');

// Interface pour les offres d'emploi
const JobOffer = {
  id: '',
  title: '',
  location: '',
  type: '',
  department: '',
  summary: '',
  requirements: [],
  missions: [],
  applyEmail: '',
  published: false,
  order: 0,
  createdAt: '',
  updatedAt: ''
};

const LOCAL_DATA_PATH = path.join(process.cwd(), 'data', 'jobs.json');

// Fonction pour créer le dossier data s'il n'existe pas
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Fonction pour lire les données depuis le stockage local
function loadJobs() {
  try {
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
function saveJobs(jobs) {
  try {
    ensureDataDirectory();
    fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(jobs, null, 2));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des offres:', error);
    throw error;
  }
}

// Fonction pour générer un ID unique
function generateJobId() {
  return `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Fonction pour valider une offre d'emploi
function validateJobOffer(job) {
  const errors = [];

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

module.exports = {
  loadJobs,
  saveJobs,
  generateJobId,
  validateJobOffer
};
