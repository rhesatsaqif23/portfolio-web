const SUPABASE_URL = "https://ipkrjpftddtxwzmylxtf.supabase.co";

export function supabaseImage(path: string, p0: number) {
  return `${SUPABASE_URL}/storage/v1/object/public/${path}`;
}
