'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(prevState: any, formData: FormData) {
  try {
    await signIn('credentials', {
      redirect: true,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    // console.log('\n\n Failed to sign in:', error);
    if (error instanceof AuthError) {
      return { error: 'Sign in failed', message: error.message, status: 401 };
    }
    throw error;
  }
}
