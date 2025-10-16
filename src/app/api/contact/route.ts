import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Lazy initialize Resend to avoid build-time errors when env var is not available
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// Simple in-memory rate limiting (use Redis in production for multiple servers)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit: 5 requests per minute per IP
function rateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

// Basic spam detection
function isSpam(message: string, subject: string): boolean {
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'click here', 'buy now',
    'make money fast', 'work from home', 'lose weight',
    'crypto', 'bitcoin investment', 'forex', 'mlm'
  ];

  const text = (message + ' ' + subject).toLowerCase();
  return spamKeywords.some(keyword => text.includes(keyword));
}

// Email routing based on type
const emailRouting = {
  support: 'support@bountyful.app',
  privacy: 'privacy@bountyful.app',
  legal: 'legal@bountyful.app',
  partners: 'partners@bountyful.app',
} as const;

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
                request.headers.get('x-real-ip') ||
                'unknown';

    // Check rate limit
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute and try again.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, subject, message, type } = body;

    // Validation
    if (!name || !email || !subject || !message || !type) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Spam detection
    if (isSpam(message, subject)) {
      // Silently reject (don't tell spammer)
      return NextResponse.json({ success: true });
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      // Fallback: log to console in development
      console.log('Contact Form Submission:', { name, email, subject, message, type });
      return NextResponse.json({
        success: true,
        dev_mode: true,
        message: 'Email sending not configured. Check console logs.'
      });
    }

    // Get recipient email based on type
    const toEmail = emailRouting[type as keyof typeof emailRouting] || emailRouting.support;

    // Get Resend client
    const resend = getResendClient();
    if (!resend) {
      console.error('Failed to initialize Resend client');
      return NextResponse.json(
        { error: 'Email service unavailable. Please try again later.' },
        { status: 500 }
      );
    }

    // Send email via Resend
    await resend.emails.send({
      from: 'Bountyful Contact Form <noreply@updates.bountyful.app>',
      to: toEmail,
      replyTo: email,
      subject: `[${type.toUpperCase()}] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(to right, #059669, #10b981); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
              .label { font-weight: bold; color: #059669; }
              .message-box { background: white; padding: 20px; border-left: 4px solid #059669; margin-top: 20px; }
              .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🍴 New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="info-row">
                  <span class="label">Type:</span> ${type.toUpperCase()}
                </div>
                <div class="info-row">
                  <span class="label">From:</span> ${name}
                </div>
                <div class="info-row">
                  <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                </div>
                <div class="info-row">
                  <span class="label">Subject:</span> ${subject}
                </div>
                <div class="message-box">
                  <p class="label">Message:</p>
                  <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
                <div class="footer">
                  <p>Sent from Bountyful Contact Form</p>
                  <p>Reply directly to this email to respond to ${name}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS if needed
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
