import { NextResponse } from 'next/server';

// ============================================================================
// DEBUG ENDPOINT - Check if RESEND_API_KEY is available
// DELETE THIS FILE after confirming environment variables are working
// ============================================================================

export async function GET() {
  const hasApiKey = !!process.env.RESEND_API_KEY;
  const keyPrefix = process.env.RESEND_API_KEY?.substring(0, 5) || 'NOT_SET';

  return NextResponse.json({
    hasApiKey,
    keyPrefix, // Should show "re_xx" if set correctly
    allEnvVars: Object.keys(process.env).filter(key => key.includes('RESEND')),
    timestamp: new Date().toISOString(),
  });
}
