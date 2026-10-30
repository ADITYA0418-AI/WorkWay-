import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isDemoMode = !supabaseUrl || 
  !supabaseAnonKey || 
  supabaseUrl.includes('your-supabase') || 
  import.meta.env.VITE_ENABLE_DEMO_MODE === 'true';

let supabaseClient = null;

if (!isDemoMode) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Failed to initialize Supabase client, falling back to Demo Mode:', err);
  }
}

export const supabase = supabaseClient;
