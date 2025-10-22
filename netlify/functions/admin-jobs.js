const { loadJobs, saveJobs } = require('../../src/lib/jobs-storage');

console.log("=== ADMIN JOBS FUNCTION START ===");
console.log("Environment variables:", {
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? "SET" : "NOT SET"
});

exports.handler = async (event) => {
  console.log("=== ADMIN JOBS HANDLER START ===");
  console.log("Event method:", event.httpMethod);
  console.log("Event headers:", event.headers);
  console.log("Event body:", event.body);

  // Vérification de l'authentification
  const authHeader = event.headers.authorization || event.headers.Authorization;
  console.log("Auth header:", authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("No valid auth header found");
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Non autorisé" })
    };
  }

  const token = authHeader.replace('Bearer ', '');
  console.log("Token:", token);
  
  if (token !== process.env.ADMIN_PASSWORD) {
    console.log("Invalid token");
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Token invalide" })
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      console.log("Loading jobs...");
      const jobs = loadJobs();
      console.log("Jobs loaded:", jobs.length);
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobs)
      };
    }

    if (event.httpMethod === 'POST') {
      const jobData = JSON.parse(event.body);
      console.log("Creating job:", jobData);
      
      const jobs = loadJobs();
      const newJob = {
        ...jobData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      jobs.push(newJob);
      saveJobs(jobs);
      
      console.log("Job created successfully");
      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      };
    }

    if (event.httpMethod === 'PUT') {
      const { id, ...jobData } = JSON.parse(event.body);
      console.log("Updating job:", id, jobData);
      
      const jobs = loadJobs();
      const jobIndex = jobs.findIndex(job => job.id === id);
      
      if (jobIndex === -1) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Offre non trouvée" })
        };
      }
      
      jobs[jobIndex] = { ...jobs[jobIndex], ...jobData };
      saveJobs(jobs);
      
      console.log("Job updated successfully");
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobs[jobIndex])
      };
    }

    if (event.httpMethod === 'DELETE') {
      const { id } = JSON.parse(event.body);
      console.log("Deleting job:", id);
      
      const jobs = loadJobs();
      const filteredJobs = jobs.filter(job => job.id !== id);
      saveJobs(filteredJobs);
      
      console.log("Job deleted successfully");
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Méthode non autorisée" })
    };

  } catch (error) {
    console.error("Error in admin-jobs function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
