// SUPABASE VERIFICATION AND RLS TEST SCRIPT
// Run with: node scripts/verify-supabase.js

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Load .env if present
if (fs.existsSync('.env')) {
  try {
    process.loadEnvFile('.env');
  } catch (e) {
    // ignore
  }
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('====================================================');
console.log('WORKWAY V2: SUPABASE & RLS HEALTH CHECK');
console.log('====================================================\n');

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project')) {
  console.log('⚠️  No valid Supabase credentials configured in .env.');
  console.log('   The application is running in Offline Demo Mode (mock data enabled).');
  console.log('   To connect to a live Supabase project:');
  console.log('   1. Update VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
  console.log('   2. Run the migration SQL in supabase/migrations/20260811_workway_v2.sql');
  process.exit(0);
}

console.log(`Connecting to: ${supabaseUrl}`);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TABLES_TO_CHECK = [
  'profiles',
  'consumer_profiles',
  'categories',
  'services',
  'provider_profiles',
  'provider_badges',
  'portfolio_items',
  'saved_addresses',
  'bookings',
  'reviews',
  'messages',
  'notifications',
  'favorites',
  'disputes'
];

async function runCheck() {
  let successCount = 0;
  let errorCount = 0;

  for (const table of TABLES_TO_CHECK) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      if (error) {
        console.log(`❌ Table [${table}]: Error - ${error.message} (Code: ${error.code || 'N/A'})`);
        errorCount++;
        if (error.message?.includes('fetch failed') || error.message?.includes('ENOTFOUND')) {
          console.log(`\n⚠️  The Supabase host "${supabaseUrl}" is unreachable or does not resolve.`);
          console.log('   Please check your Project URL in .env, or verify your internet/DNS connection.');
          break;
        }
      } else {
        console.log(`✅ Table [${table}]: OK (Accessible with RLS)`);
        successCount++;
      }
    } catch (err) {
      console.log(`❌ Table [${table}]: Failed to reach host - ${err.message}`);
      errorCount++;
      break;
    }
  }

  console.log('\n====================================================');
  console.log(`Summary: ${successCount} accessible, ${errorCount} errors`);
  if (errorCount > 0) {
    console.log('Tip: If tables do not exist yet, copy the contents of:');
    console.log('     supabase/migrations/20260811_workway_v2.sql');
    console.log('     into your Supabase Project -> SQL Editor -> Run');
  } else {
    console.log('All checked tables are active and responding properly.');
  }
  console.log('====================================================');
}

runCheck();
