import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Public pages (home, projetos, currículo) use only the static data in src/data.
// Supabase is needed only for the admin area, the blog and analytics.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
    console.warn("Supabase não configurado: admin, blog e analytics ficam desativados. O portfólio funciona com os dados estáticos.");
}

// createClient throws on an empty URL, which used to take the whole app down.
export const supabase = createClient(
    supabaseUrl || 'http://localhost:54321',
    supabaseAnonKey || 'supabase-not-configured',
);
