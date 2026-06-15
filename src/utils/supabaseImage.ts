const SUPABASE_URL = "https://ipkrjpftddtxwzmylxtf.supabase.co";

export function supabaseImage(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/${path}`;
}
