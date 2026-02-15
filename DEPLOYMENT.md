# Deployment Guide

## Quick Deploy to Netlify (Recommended)

### Option 1: Netlify Drop (Fastest)

1. Build the project:
   ```bash
   npm install
   npm run build
   ```

2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag and drop the `dist` folder

4. Done! Netlify will give you a live URL

### Option 2: Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod
   ```

3. Follow the prompts and select the `dist` folder

### Option 3: GitHub Integration

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

## Deploy to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts (defaults work great)

### Option 2: GitHub Integration

1. Push code to GitHub (see steps above)
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Vite settings
5. Click "Deploy"

## Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/repo-name/',  // Add your repo name
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Important Notes

### API Considerations

Since JSON Server runs locally, for the deployed version you have two options:

#### Option 1: Deploy JSON Server Separately

1. Create a new repo for the API
2. Deploy to Render, Railway, or Heroku (free tiers available)
3. Update `src/services/api.ts` with the deployed API URL:
   ```typescript
   const API_BASE_URL = 'https://your-api-url.com';
   ```

#### Option 2: Use a Real Backend

For production, replace JSON Server with:
- Firebase
- Supabase
- Custom Node.js/Express API
- Any REST API

### Environment Variables

Create a `.env` file:
```
VITE_API_URL=http://localhost:3001
```

Update `src/services/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

For deployment, add environment variables in your platform:
- Netlify: Site settings → Environment variables
- Vercel: Project settings → Environment Variables

## Troubleshooting

### Build Errors
- Clear cache: `rm -rf node_modules dist && npm install`
- Check Node version: `node --version` (should be v16+)

### CORS Issues
- If using a separate API, ensure CORS is enabled on the backend

### 404 on Refresh
Add a `_redirects` file in the `public` folder:
```
/*    /index.html   200
```

## After Deployment Checklist

- ✅ Test all CRUD operations
- ✅ Check mobile responsiveness
- ✅ Verify form validation
- ✅ Test error states
- ✅ Update README with live URL
- ✅ Add screenshots if needed

## Support

If you encounter issues:
1. Check the console for errors
2. Verify build completes successfully locally
3. Check deployment platform logs
4. Review environment variables

---

Good luck with your deployment! 🚀
