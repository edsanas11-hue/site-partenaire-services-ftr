const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('published', true)
      .order('order', { ascending: true });

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
        headers: { 'Content-Type': 'application/json' }
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ jobs: data || [] }),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur serveur' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};
