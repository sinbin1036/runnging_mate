import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  // Handle errors from Supabase (e.g., otp_expired)
  if (error || errorDescription) {
    console.error('Supabase Callback Error:', error, errorDescription);
    return NextResponse.redirect(`${requestUrl.origin}/login?message=${encodeURIComponent(errorDescription || 'Authentication failed')}`);
  }

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${requestUrl.origin}/main`);
    }
    console.error('Supabase exchangeCodeForSession Error:', error);
  }

  // return the user to an error page or login page if there's no code or an unexpected error
  return NextResponse.redirect(`${requestUrl.origin}/login?message=Authentication failed`);
}
