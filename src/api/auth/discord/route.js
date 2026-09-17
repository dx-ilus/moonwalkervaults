// Example for App Router (app/api/auth/discord/route.js)
import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    // 1. Exchange code for token with Discord
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://moonwalkervault.dpdns.org/api/auth/discord',
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) throw new Error('Failed to get access token');

    // 2. Fetch user guilds/roles or user profile to check the leaker role ID
    // (Ensure your bot or OAuth scope includes 'guilds.members.read' or check user guilds)
    
    // 3. Redirect back to home dashboard with success state
    return NextResponse.redirect(new URL('/?login=success', request.url));

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.redirect(new URL('/?error=server_error', request.url));
  }
}
