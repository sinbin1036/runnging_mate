'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers, cookies } from 'next/headers';

export async function signup(formData: FormData) {
  const origin = headers().get('origin');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // This will redirect the user to the specified URL after they confirm their email.
      // Make sure to create this route in your app.
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Signup Error:', error);
    if (error.name === 'AuthWeakPasswordError') {
      return redirect('/signup?message=Password is too weak. Please use at least 6 characters.');
    }
    // For other errors, redirect with a generic message
    return redirect('/signup?message=Could not authenticate user');
  }

  // Redirect to a page that informs the user to check their email for confirmation.
  return redirect('/signup?message=Check email to continue sign in process');
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?message=Could not authenticate user');
  }

  return redirect('/main');
}
