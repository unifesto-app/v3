import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  if (error) {
    console.error('OAuth error:', error, errorDescription);
    return NextResponse.redirect(new URL('/auth?error=oauth_failed', requestUrl.origin));
  }

  if (code) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      
      // Exchange code for session via backend
      const response = await fetch(`${apiUrl}/api/auth/callback?code=${code}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.success && data.data?.session) {
        // Redirect to a page that will set the session in localStorage
        const redirectUrl = new URL('/auth/success', requestUrl.origin);
        redirectUrl.searchParams.set('token', data.data.session.access_token);
        redirectUrl.searchParams.set('user', JSON.stringify(data.data.user));
        return NextResponse.redirect(redirectUrl);
      }
    } catch (err) {
      console.error('Callback error:', err);
    }
  }

  return NextResponse.redirect(new URL('/auth?error=callback_failed', requestUrl.origin));
}
