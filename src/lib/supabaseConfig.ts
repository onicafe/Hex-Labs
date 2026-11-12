// Separado do cliente para que as páginas públicas possam checar a configuração
// sem carregar a biblioteca do Supabase.
export const isSupabaseConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
