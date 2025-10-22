const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log("=== SUPABASE CONFIG DEBUG ===");
console.log("SUPABASE_URL:", supabaseUrl ? "SET" : "NOT SET");
console.log("SUPABASE_ANON_KEY:", supabaseKey ? "SET" : "NOT SET");
console.log("URL value:", supabaseUrl);
console.log("Key value:", supabaseKey ? supabaseKey.substring(0, 20) + "..." : "NOT SET");

const supabase = createClient(supabaseUrl, supabaseKey);

async function loadJobs() {
  try {
    console.log('Loading jobs from Supabase...');
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      console.error('Error loading jobs from Supabase:', error);
      return [];
    }
    
    console.log('Jobs loaded from Supabase:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('Error loading jobs from Supabase:', error);
    return [];
  }
}

async function saveJobs(jobs) {
  try {
    console.log('Saving jobs to Supabase...');
    
    // Supprimer toutes les offres existantes
    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .neq('id', 0); // Supprime tout
    
    if (deleteError) {
      console.error('Error deleting existing jobs:', deleteError);
      throw deleteError;
    }
    
    // Insérer les nouvelles offres
    if (jobs.length > 0) {
      const { error: insertError } = await supabase
        .from('jobs')
        .insert(jobs);
      
      if (insertError) {
        console.error('Error inserting jobs:', insertError);
        throw insertError;
      }
    }
    
    console.log('Jobs saved successfully to Supabase');
  } catch (error) {
    console.error('Error saving jobs to Supabase:', error);
    throw error;
  }
}

module.exports = {
  loadJobs,
  saveJobs
};
