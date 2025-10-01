# GLEC AI DTG Website - Deployment Guide

## 📋 Table of Contents

1. [Quick Deploy](#quick-deploy)
2. [Deployment Platforms](#deployment-platforms)
3. [Environment Setup](#environment-setup)
4. [Build & Test](#build--test)
5. [Continuous Deployment](#continuous-deployment)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

## 🚀 Quick Deploy

### GitHub Repository

**Repository URL:** https://github.com/gleccloud/ai-dtg-website

```bash
# Clone the repository
git clone https://github.com/gleccloud/ai-dtg-website.git
cd ai-dtg-website

# Install dependencies
npm install

# Test locally
npm start
# Open http://localhost:8093
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd ai-dtg-premium-website
vercel deploy --prod
```

**Vercel Configuration (`vercel.json`):**

```json
{
  "version": 2,
  "public": true,
  "cleanUrls": true,
  "trailingSlash": false,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/ai-dtg-premium-website/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

## 🌐 Deployment Platforms

### 1. Vercel (Recommended)

**Pros:**
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Instant rollbacks
- ✅ Preview deployments

**Steps:**
1. Connect GitHub repository to Vercel
2. Set root directory to `ai-dtg-premium-website`
3. Deploy automatically on push to `main`

**Live URL Example:** `https://ai-dtg-website.vercel.app`

---

### 2. Netlify

**Pros:**
- ✅ Drag & drop deployment
- ✅ Form handling
- ✅ Split testing
- ✅ Free SSL

**Steps:**
1. Go to [Netlify](https://netlify.com)
2. Drag `ai-dtg-premium-website/` folder to deploy
3. Configure custom domain (optional)

**Build Settings:**
```
Base directory: ai-dtg-premium-website
Build command: (leave empty - static site)
Publish directory: .
```

---

### 3. GitHub Pages

**Pros:**
- ✅ Free hosting
- ✅ GitHub integration
- ✅ Easy setup

**Steps:**

```bash
# Create gh-pages branch
git checkout --orphan gh-pages

# Copy premium website files
cp -r ai-dtg-premium-website/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# Enable GitHub Pages in repository settings
# Set source to gh-pages branch
```

**Live URL:** `https://gleccloud.github.io/ai-dtg-website/`

---

### 4. AWS S3 + CloudFront

**Pros:**
- ✅ Scalable
- ✅ Custom CDN
- ✅ Full control

**Steps:**

```bash
# Install AWS CLI
brew install awscli
aws configure

# Create S3 bucket
aws s3 mb s3://ai-dtg-website

# Enable static website hosting
aws s3 website s3://ai-dtg-website \
  --index-document index.html \
  --error-document index.html

# Upload files
cd ai-dtg-premium-website
aws s3 sync . s3://ai-dtg-website \
  --acl public-read \
  --cache-control "max-age=31536000,public"

# Upload index.html separately with no-cache
aws s3 cp index.html s3://ai-dtg-website/index.html \
  --acl public-read \
  --cache-control "no-cache"
```

**CloudFront Setup:**
1. Create CloudFront distribution
2. Set origin to S3 bucket
3. Configure custom domain with SSL certificate
4. Set cache behaviors

---

## 🔧 Environment Setup

### Required Files

```
ai-dtg-premium-website/
├── index.html          # Main website file
└── assets/
    ├── videos/         # Video assets (6 files)
    │   ├── GLEC_AI_video.mov
    │   ├── GLEC_API_video.mov
    │   ├── dtg1.mp4
    │   ├── dtg2.mp4
    │   └── ...
    └── hardware/       # Image assets
        ├── og-thumbnail.png
        ├── beetle_x31_1080.jpg
        └── beetle_x31_B_1080.jpg
```

### Environment Variables

No environment variables required! This is a static website.

### Domain Configuration

**Custom Domain Setup:**

1. **DNS Records (for `dtg.glec.io`):**

```
Type    Name    Value                   TTL
A       @       76.76.21.21            Auto
CNAME   www     cname.vercel-dns.com   Auto
```

2. **SSL Certificate:**
   - Automatically provided by Vercel/Netlify
   - Or use AWS Certificate Manager for CloudFront

3. **Verify Setup:**
```bash
dig dtg.glec.io
curl -I https://dtg.glec.io
```

---

## 🧪 Build & Test

### Pre-Deployment Testing

```bash
# 1. Install dependencies
npm install

# 2. Run local server
npm start
# Visit http://localhost:8093

# 3. Run automated tests
npm test
# Verifies all 14 sections

# 4. Test language switching
npm run test:language
# Tests EN/KO/ZH translations

# 5. Manual checklist
# [ ] All sections visible
# [ ] Videos autoplay
# [ ] Language selector works
# [ ] CES form submits
# [ ] Mobile responsive
# [ ] No console errors
```

### Performance Testing

```bash
# Lighthouse audit
npx lighthouse http://localhost:8093 \
  --view \
  --output html \
  --output-path ./lighthouse-report.html

# Expected scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 90+
# SEO: 100
```

### Browser Testing

Test in these browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS)
- ✅ Chrome Android

---

## 🔄 Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./ai-dtg-premium-website
```

### Required Secrets

Add to GitHub repository settings:
- `VERCEL_TOKEN` - Vercel authentication token
- `VERCEL_ORG_ID` - Organization ID
- `VERCEL_PROJECT_ID` - Project ID

---

## 📊 Post-Deployment

### Verification Checklist

After deployment, verify:

- [ ] Website loads at production URL
- [ ] All 14 sections render correctly
- [ ] Language selector switches (EN/KO/ZH)
- [ ] All 6 videos play
- [ ] CES invitation form works
- [ ] Navigation scrolls smoothly
- [ ] Mobile version displays correctly
- [ ] HTTPS/SSL certificate valid
- [ ] No 404 errors for assets
- [ ] Meta tags display correctly (social sharing)

### Monitoring Setup

**1. Vercel Analytics:**
```bash
# Already included in deployment
# View at: https://vercel.com/[team]/ai-dtg-website/analytics
```

**2. Google Analytics (Optional):**

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**3. Uptime Monitoring:**
- [UptimeRobot](https://uptimerobot.com) - Free monitoring
- [Pingdom](https://pingdom.com) - Advanced monitoring

### Performance Optimization

**Asset Optimization:**
```bash
# Compress videos (if needed)
ffmpeg -i GLEC_AI_video.mov -vcodec h264 -acodec aac GLEC_AI_video.mp4

# Optimize images
npm install -g imagemin-cli
imagemin assets/hardware/*.png --out-dir=assets/hardware/optimized
```

**CDN Caching:**
- Videos: Cache for 1 year (immutable)
- Images: Cache for 1 year (immutable)
- HTML: No cache (always fresh)
- Fonts: Cache for 1 year (immutable)

---

## 🛠️ Troubleshooting

### Issue: Videos Not Playing

**Solution:**
1. Check video file paths in HTML
2. Ensure videos are in `assets/videos/` directory
3. Check browser console for errors
4. Verify video formats (MP4, MOV supported)
5. Test with muted autoplay enabled

### Issue: Language Selector Not Working

**Solution:**
1. Check for JavaScript errors in console
2. Verify `videoObserver` variable is unique (not duplicated)
3. Test language selector click events
4. Ensure translations object is loaded

### Issue: 404 Errors for Assets

**Solution:**
1. Verify asset paths are relative (not absolute)
2. Check file names match exactly (case-sensitive)
3. Ensure assets are deployed with HTML file
4. Review deployment platform's base path settings

### Issue: Mobile Layout Broken

**Solution:**
1. Test with responsive design tools
2. Verify CSS media queries
3. Check viewport meta tag in HTML
4. Test on actual mobile devices

### Issue: Slow Load Times

**Solution:**
1. Enable CDN caching
2. Compress video files
3. Lazy load videos with intersection observer
4. Optimize image sizes
5. Use WebP format for images (if supported)

---

## 📞 Support

For deployment issues:

**GLEC Inc. DevOps Team**
- Email: devops@glec.io
- Documentation: https://github.com/gleccloud/ai-dtg-website

**Platform Support:**
- Vercel: https://vercel.com/support
- Netlify: https://netlify.com/support
- AWS: https://aws.amazon.com/support

---

## 🎉 Success!

Your GLEC AI DTG website is now live!

**Next Steps:**
1. ✅ Share URL with team
2. ✅ Test all features in production
3. ✅ Set up monitoring alerts
4. ✅ Schedule regular backups
5. ✅ Plan future updates

**Live Site:** https://ai-dtg-website.vercel.app (or your custom domain)

---

**Deployed with ❤️ by GLEC Inc.**

*Last updated: 2025-10-01*
