const fs = require('fs');
const path = require('path');

// Utiliser le dossier temporaire de Netlify au lieu de créer un dossier data
const LOCAL_DATA_PATH = path.join('/tmp', 'jobs.json');

function ensureDataDirectory() {
  // Le dossier /tmp existe toujours dans Netlify Functions
  // Pas besoin de le créer
}

function loadJobs() {
  try {
    if (fs.existsSync(LOCAL_DATA_PATH)) {
      const data = fs.readFileSync(LOCAL_DATA_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading jobs from local storage:', error);
  }
  return [];
}

function saveJobs(jobs) {
  try {
    fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(jobs, null, 2));
  } catch (error) {
    console.error('Error saving jobs to local storage:', error);
    throw error;
  }
}

module.exports = {
  loadJobs,
  saveJobs
};
