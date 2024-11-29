declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_URL: string
    SUPABASE_KEY: string
    SUPABASE_SERVICE_KEY: string
    DATABASE_URL?: string
  }
}