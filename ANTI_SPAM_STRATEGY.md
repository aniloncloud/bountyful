# Bountyful Email Anti-Spam Strategy

## Required Email Addresses

### Tier 1: Essential (Must Create)
1. **support@bountyful.app** - Customer support, order issues
2. **privacy@bountyful.app** - GDPR/CCPA requests, legally required
3. **legal@bountyful.app** - Legal matters, terms questions
4. **partners@bountyful.app** - Restaurant partnerships

### Tier 2: Important (Recommended)
5. **dpo@bountyful.app** - Data Protection Officer (can alias to privacy@)

### Tier 3: Optional
6. **dev@bountyful.app** - Technical inquiries (can alias to support@)
7. **urgent@bountyful.app** - Emergency issues (can alias to support@)
8. **reviewer@bountyful.app** - App store reviewers (temporary, delete after approval)

---

## Anti-Spam Protection Strategies

### 1. Contact Forms (Recommended)

Replace `mailto:` links with protected contact forms.

**Benefits:**
- No email exposed to scrapers
- Built-in CAPTCHA/rate limiting
- Better user experience
- Automatic categorization

**Implementation:**
```tsx
// src/components/ContactForm.tsx
'use client';

import { useState } from 'react';

export function ContactForm({ type = 'support' }: { type?: 'support' | 'privacy' | 'legal' | 'partners' }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full px-4 py-2 border rounded-lg"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="w-full px-4 py-2 border rounded-lg"
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        rows={5}
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && <p className="text-green-600">Message sent successfully!</p>}
      {status === 'error' && <p className="text-red-600">Failed to send. Please try again.</p>}
    </form>
  );
}
```

**API Route with Rate Limiting:**
```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend'; // or nodemailer, sendgrid, etc.

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }

  if (limit.count >= 5) { // Max 5 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  // Rate limiting
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { name, email, message, type } = await request.json();

  // Validation
  if (!name || !email || !message || !type) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // Spam detection (basic)
  const spamKeywords = ['viagra', 'casino', 'lottery', 'click here', 'buy now'];
  const messageText = message.toLowerCase();
  if (spamKeywords.some(keyword => messageText.includes(keyword))) {
    return NextResponse.json({ error: 'Message rejected' }, { status: 400 });
  }

  // Route to appropriate email
  const emailMap = {
    support: 'support@bountyful.app',
    privacy: 'privacy@bountyful.app',
    legal: 'legal@bountyful.app',
    partners: 'partners@bountyful.app',
  };

  const toEmail = emailMap[type as keyof typeof emailMap] || 'support@bountyful.app';

  try {
    await resend.emails.send({
      from: 'noreply@bountyful.app',
      to: toEmail,
      replyTo: email,
      subject: `[${type.toUpperCase()}] Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
```

---

### 2. Email Obfuscation (Backup Strategy)

For pages that must show emails, use obfuscation:

#### A. React Component Obfuscation
```tsx
// src/components/ObfuscatedEmail.tsx
'use client';

export function ObfuscatedEmail({
  user,
  domain = 'bountyful.app',
  subject = '',
  className = ''
}: {
  user: string;
  domain?: string;
  subject?: string;
  className?: string;
}) {
  const email = `${user}@${domain}`;
  const href = subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        // Optional: Log click for analytics
        console.log('Email clicked:', user);
      }}
    >
      <span>{user}</span>
      <span>@</span>
      <span>{domain}</span>
    </a>
  );
}

// Usage:
<ObfuscatedEmail user="support" />
```

#### B. SVG/Image Email (Best Obfuscation)
```tsx
// src/components/EmailImage.tsx
export function EmailImage({ email }: { email: string }) {
  return (
    <svg width="200" height="24" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="18" fill="currentColor" fontSize="14" fontFamily="system-ui">
        {email}
      </text>
    </svg>
  );
}

// Usage:
<EmailImage email="support@bountyful.app" />
```

#### C. CSS-Hidden Email
```tsx
<a href="mailto:support@bountyful.app" className="email-link">
  support
  <span style={{ display: 'none' }}>REMOVE_THIS</span>
  @bountyful.app
</a>
```

#### D. Base64 Encoding
```tsx
'use client';

export function SecureEmail({ encoded }: { encoded: string }) {
  const [email, setEmail] = useState('Click to reveal');

  const reveal = () => {
    setEmail(atob(encoded)); // Decode base64
  };

  return (
    <button onClick={reveal} className="text-blue-600 hover:underline">
      {email}
    </button>
  );
}

// Usage (pre-encode: btoa('support@bountyful.app') = 'c3VwcG9ydEBib3VudHlmdWwuYXBw')
<SecureEmail encoded="c3VwcG9ydEBib3VudHlmdWwuYXBw" />
```

---

### 3. Email Server Protection

#### A. SPF Record
Add to DNS:
```
v=spf1 include:_spf.google.com ~all
```

#### B. DKIM Setup
Configure with your email provider (Google Workspace, Microsoft 365, etc.)

#### C. DMARC Policy
```
v=DMARC1; p=quarantine; rua=mailto:dmarc@bountyful.app
```

#### D. MX Record Priority
Set high priority for legitimate servers, low for catch-all

---

### 4. Email Forwarding Strategy

Use aliases that forward to a central inbox:

**Setup:**
1. Main inbox: `inbox@bountyful.app` (never public)
2. Public aliases forward to main:
   - `support@bountyful.app` → `inbox@bountyful.app`
   - `privacy@bountyful.app` → `inbox@bountyful.app`
   - `legal@bountyful.app` → `inbox@bountyful.app`
   - `partners@bountyful.app` → `inbox@bountyful.app`

**Benefits:**
- Easy to change routing
- Can disable individual aliases if compromised
- Single inbox to monitor
- Auto-tagging by recipient address

---

### 5. Spam Filters

#### A. Server-Side (Email Provider)
- Enable aggressive spam filtering
- Greylist unknown senders
- Require sender authentication

#### B. Application-Level
```typescript
// Honeypot field (hidden from users, catches bots)
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>

// Server-side check:
if (formData.website) {
  // Bot detected, reject silently
  return NextResponse.json({ success: true }); // Fake success
}
```

#### C. Time-Based Detection
```typescript
// Track form load time
const formLoadTime = Date.now();

// On submit:
const submitTime = Date.now();
const timeTaken = submitTime - formLoadTime;

if (timeTaken < 3000) {
  // Submitted too fast, likely a bot
  return NextResponse.json({ error: 'Please wait' }, { status: 429 });
}
```

---

### 6. CAPTCHA Integration

#### Google reCAPTCHA v3 (Invisible)
```tsx
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export function ContactFormWithCaptcha() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get reCAPTCHA token
    const token = await window.grecaptcha.execute(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      { action: 'contact' }
    );

    // Send to API with token
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, captchaToken: token }),
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**Server-side verification:**
```typescript
// Verify reCAPTCHA token
const verifyResponse = await fetch(
  `https://www.google.com/recaptcha/api/siteverify`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
  }
);

const { success, score } = await verifyResponse.json();

if (!success || score < 0.5) {
  return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
}
```

---

## Recommended Implementation Priority

### Phase 1: Immediate (Before Launch)
1. ✅ Create essential email addresses
2. ✅ Set up email forwarding to central inbox
3. ✅ Configure SPF/DKIM/DMARC records
4. ✅ Replace all `mailto:` with contact forms on public pages

### Phase 2: Short-term (First Month)
1. Add reCAPTCHA v3 to contact forms
2. Implement rate limiting on API routes
3. Add honeypot fields
4. Monitor spam levels

### Phase 3: Long-term (Ongoing)
1. Use ML-based spam detection (if needed)
2. Regularly review and update email filters
3. Consider dedicated support ticket system (Zendesk, Intercom)
4. Add email verification for new users

---

## Email Service Providers

### Recommended:
1. **Google Workspace** ($6/user/month)
   - Best spam protection
   - Professional appearance
   - Aliases included
   - Calendar, Drive integration

2. **Microsoft 365** ($6/user/month)
   - Similar to Google
   - Good spam filtering
   - Office apps included

3. **Zoho Mail** ($1/user/month)
   - Budget-friendly
   - Good spam protection
   - Unlimited aliases

### For Transactional Emails:
1. **Resend** (API-first, modern)
2. **SendGrid** (Established, reliable)
3. **Postmark** (Great deliverability)

---

## Monitoring & Maintenance

### Daily:
- Check spam folder for false positives
- Review contact form submissions

### Weekly:
- Review spam patterns
- Update filters as needed
- Check deliverability rates

### Monthly:
- Audit email aliases
- Review rate limit logs
- Update security measures

---

## Emergency Procedures

### If Email Gets Compromised:
1. Disable the alias immediately
2. Create new forwarding address
3. Update app with new email
4. Deploy update to Vercel
5. Notify users if necessary

### If Spam Overwhelms:
1. Increase CAPTCHA threshold
2. Tighten rate limits
3. Add temporary submission delays
4. Consider requiring account login

---

## Cost Estimate

**Basic Setup:**
- Google Workspace: $6/month (1 user with aliases)
- Resend (contact forms): $0-20/month
- **Total: ~$6-26/month**

**Advanced Setup:**
- Google Workspace: $12/month (2 users)
- Transactional email: $20/month
- Spam filtering service: $10/month
- **Total: ~$42/month**

---

## Legal Compliance

### Email Addresses Required by Law:
- ✅ Privacy email (GDPR/CCPA)
- ✅ Legal/compliance email
- ✅ Support email (consumer protection)
- ✅ DPO email (GDPR - EU)

### Must Be Publicly Accessible:
- Privacy Policy
- Terms of Service
- Contact page
- App Store listings

### Can Use Contact Forms:
- General inquiries
- Partnership requests
- Non-legal support

---

This strategy balances accessibility for legitimate users while minimizing spam exposure.
