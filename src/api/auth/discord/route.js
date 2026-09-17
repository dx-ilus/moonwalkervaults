import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  const clientId = '1542916030685511740';
  // ⚠️ Make sure this matches your exact redirect URI configured in the Discord Developer Portal
  const redirectUri = 'https://yourdomain.com/api/auth/discord';
  const clientSecret = process.env.DISCORD_CLIENT_SECRET; // Store your client secret securely in .env.local
  const targetGuildId = process.env.DISCORD_GUILD_ID; // Your Discord Server ID
  const requiredRoleId = '1540748020037976206'; // The Leaker Role ID

  try {
    // 1. Exchange authorization code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      throw new Error('Failed to obtain access token from Discord');
    }

    const accessToken = tokenData.access_token;

    // 2. Fetch Discord User Profile
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userData = await userResponse.json();

    // Clean username (supports modern Discord handles without discriminator numbers)
    const rawUsername = userData.global_name || userData.username;
    const cleanUsername = rawUsername.split('#')[0].trim();

    // 3. Fetch User Guild Member Data to verify roles inside your server
    let hasLeakerRole = false;
    if (targetGuildId) {
      const memberResponse = await fetch(
        `https://discord.com/api/users/@me/guilds/${targetGuildId}/member`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (memberResponse.ok) {
        const memberData = await memberResponse.json();
        // Check if the user's roles array includes the Leaker Role ID
        if (memberData.roles && memberData.roles.includes(requiredRoleId)) {
          hasLeakerRole = true;
        }
      }
    }

    // 4. Redirect back to frontend dashboard with state parameters
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('auth', 'success');
    redirectUrl.searchParams.set('username', cleanUsername);
    redirectUrl.searchParams.set(
      'hasLeakerRole',
      hasLeakerRole ? 'true' : 'false'
    );

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Discord OAuth Error:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
