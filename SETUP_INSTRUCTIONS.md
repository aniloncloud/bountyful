# Bountyful Setup Instructions

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Resend API key:

```env
RESEND_API_KEY=re_your_actual_key_here
```

**Get your Resend API key:**
1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Go to API Keys: https://resend.com/api-keys
3. Create a new API key
4. Copy the key to your `.env.local` file

**Important:** The contact form will work without the API key in development (messages will log to console), but you need it for production.

### 3. Configure Email Domain (Resend)

**For production emails to work:**
1. Add your domain in Resend dashboard
2. Add DNS records (they'll provide the records)
3. Wait for verification (~15 minutes)

**For development/testing:**
- Use the default `onboarding@resend.dev` sender
- Or verify a single email address

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 5. Test Contact Forms

Go to: http://localhost:3000/legal/contact

Test each form:
- ✅ General Support → support@bountyful.app
- ✅ Privacy & Data → privacy@bountyful.app  
- ✅ Legal → legal@bountyful.app
- ✅ Partners → partners@bountyful.app

## Google Workspace Email Setup

You've created these alias emails:
- support@bountyful.app
- dev@bountyful.app
- privacy@bountyful.app
- legal@bountyful.app
- partners@bountyful.app
- dpo@bountyful.app
- reviewer@bountyful.app

**Email Routing:**
All contact form submissions will route to the appropriate alias based on form type.

## Documentation Files

These files are tracked in git but **NOT deployed** to the website:

- `ANTI_SPAM_STRATEGY.md` - Email protection guide
- `LEGAL_POLICY_REVIEW.md` - Legal policy enhancements
- `APP_STORE_METADATA.md` - App store submission guide
- All other .md files (except README.md)

Protected by `.vercelignore` - they won't be accessible on the live site.

## Deployment to Vercel

### Automatic Deployment (Current Setup)

Every push to `main` branch automatically deploys to:
- https://bountyful-app.vercel.app

### Environment Variables in Vercel

Add your `RESEND_API_KEY` to Vercel:

1. Go to: https://vercel.com/dashboard
2. Select "bountyful-app" project
3. Go to Settings → Environment Variables
4. Add: `RESEND_API_KEY` = `re_your_key_here`
5. Select "Production", "Preview", "Development"
6. Click "Save"

**After adding:** Redeploy for changes to take effect.

## Testing Contact Forms

### Development (without API key):
- Forms will submit successfully
- Messages log to console
- No emails sent

### Production (with API key):
- Forms send real emails
- Rate limited: 5 requests/minute per IP
- Basic spam filtering enabled

## Rate Limiting

Current limits:
- 5 submissions per minute per IP address
- Resets after 1 minute
- Returns 429 error if exceeded

To adjust: Edit `src/app/api/contact/route.ts`

## Security Features

✅ **Implemented:**
- Rate limiting (5/min per IP)
- Email validation
- Spam keyword detection
- TLS/HTTPS encryption in transit
- No email addresses exposed to scrapers
- Honeypot fields (ready to add)

✅ **Email Protection:**
- No mailto: links on public pages
- All contact via protected forms
- Emails only visible in legal docs (required by law)

## Monitoring

### Check Contact Form Submissions:

In development:
```bash
# Check console logs
npm run dev
# Submit a form, check terminal output
```

In production:
```bash
# Check Vercel logs
vercel logs bountyful-app
```

### Email Deliverability:

Check Resend dashboard:
- https://resend.com/emails
- View sent, delivered, bounced emails
- Monitor spam complaints

## Troubleshooting

### Forms not sending emails:

1. Check `.env.local` has `RESEND_API_KEY`
2. Restart dev server after adding env vars
3. Check console for error messages
4. Verify Resend API key is valid
5. Check Resend dashboard for errors

### 429 Rate Limit Errors:

- Wait 1 minute between submissions
- Clear rate limit: restart server (dev)
- In production: wait for timeout

### Spam Detection Triggering:

If legitimate messages are blocked:
1. Edit spam keywords in `src/app/api/contact/route.ts`
2. Adjust `isSpam()` function
3. Redeploy

## Cost Estimate

**Monthly Operating Costs:**

- Google Workspace: $6/month (unlimited aliases)
- Resend Free Tier: $0 (100 emails/day)
- Resend Paid: $20/month (50,000 emails/month)
- Vercel: $0 (Hobby) or $20/month (Pro)

**Total: $6-46/month** depending on scale

## Next Steps

1. ✅ Emails created in Google Workspace
2. ✅ Contact forms implemented
3. ✅ Documentation protected from deployment
4. ⏳ Get Resend API key
5. ⏳ Add to `.env.local` and Vercel
6. ⏳ Test contact forms
7. ⏳ Deploy to production

## Support

For questions about setup:
- Check `ANTI_SPAM_STRATEGY.md` for email details
- Check `LEGAL_POLICY_REVIEW.md` for legal enhancements
- Check `APP_STORE_METADATA.md` for app store prep
