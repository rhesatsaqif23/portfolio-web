import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/src/lib/supabase/server';

export async function GET() {
  const supabase = await createServerSupabase();
  
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('cv_url')
      .single();

    if (error || !profile?.cv_url) {
      return new NextResponse("CV not found", { status: 404 });
    }

    const fileUrl = profile.cv_url;
    
    const res = await fetch(fileUrl);
    
    if (!res.ok) {
      return new NextResponse("Failed to fetch CV", { status: res.status });
    }
    
    const blob = await res.blob();
    
    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=CV_Rhesa_Tsaqif_Adyatma.pdf",
      },
    });
  } catch (error) {
    return new NextResponse("Error fetching CV", { status: 500 });
  }
}
