# Deployment Guide

This guide covers deploying your NextJS Storyblok template to various platforms.

## 🚀 Deployment Platforms

### Vercel (Recommended)

Vercel offers the best integration with Next.js and provides automatic deployments from Git.

#### Steps:

1. **Connect to Git**:
   - Push your code to GitHub, GitLab, or Bitbucket
   - Import your repository in Vercel dashboard

2. **Environment Variables**:

   ```
   NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_public_token
   STORYBLOK_PREVIEW_TOKEN=your_preview_token
   STORYBLOK_WEBHOOK_SECRET=your_webhook_secret
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

3. **Build Settings**:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy**: Vercel will automatically build and deploy your application

#### Webhook Configuration:

- Go to your Storyblok space > Settings > Webhooks
- Add webhook URL: `https://your-domain.vercel.app/api/revalidate`
- Set secret from your environment variables

### Netlify

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Environment Variables**: Add the same variables as above
4. **Deploy**: Netlify will build and deploy automatically

### Self-Hosted

For self-hosted deployments:

1. **Build the Application**:

   ```bash
   npm run build
   ```

2. **Start Production Server**:

   ```bash
   npm start
   ```

3. **Environment Setup**:
   - Set all required environment variables
   - Use a process manager like PM2 for production
   - Set up SSL certificate for HTTPS

4. **Reverse Proxy** (Nginx example):

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

## 🔧 Pre-Deployment Checklist

- [ ] Set all required environment variables
- [ ] Update `NEXT_PUBLIC_SITE_URL` to your production URL
- [ ] Configure Storyblok webhooks with production URL
- [ ] Test build locally: `npm run build`
- [ ] Verify all pages render correctly
- [ ] Test Storyblok Visual Editor with production domain
- [ ] Set up monitoring and error tracking

## 🌍 CDN and Performance

### Image Optimization

- Next.js automatically optimizes images from Storyblok
- Configure custom domains for Storyblok assets if needed

### Caching Strategy

- Static pages are cached automatically
- API routes use ISR (Incremental Static Regeneration)
- Webhook revalidation ensures content freshness

### Performance Monitoring

Consider adding:

- Web Vitals monitoring
- Error tracking (Sentry, LogRocket)
- Performance monitoring (New Relic, DataDog)

## 🔒 Security Considerations

- Never expose preview tokens in client-side code
- Use webhook secrets for API route security
- Enable HTTPS for production
- Regularly update dependencies
- Use Content Security Policy headers

## 🚨 Troubleshooting

### Build Errors

- Check all environment variables are set
- Verify Storyblok API connectivity
- Review build logs for specific errors

### Visual Editor Issues

- Ensure HTTPS is enabled in production
- Check CORS settings in Storyblok
- Verify preview URL configuration

### Content Not Updating

- Check webhook configuration
- Verify revalidation API endpoint
- Clear CDN cache if applicable

## 📊 Analytics Setup

### Google Analytics

Add to `app/layout.tsx`:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

// In the <body> tag:
;<GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
```

### Other Analytics

- Vercel Analytics
- Plausible
- Mixpanel
- Custom analytics solutions

## 🔄 CI/CD Pipeline

Example GitHub Actions workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN: ${{ secrets.STORYBLOK_TOKEN }}

      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
```

Remember to:

- Set up environment variables in your deployment platform
- Configure webhooks for automatic content updates
- Monitor your application after deployment
- Set up proper error tracking and monitoring
