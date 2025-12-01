# GitHub Pages Deployment

Follow these steps to deploy your blog to GitHub Pages:

## 1. Push the Changes

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push
```

## 2. Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/Armaan-zsh/razbill`
2. Click **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - Source: **GitHub Actions**
5. Click **Save**

That's it! Your site will be available at:
**https://armaan-zsh.github.io/razbill**

## How It Works

Every time you push to `main`:
1. GitHub Actions runs automatically
2. Builds your Next.js site
3. Deploys to GitHub Pages
4. Live in ~30 seconds!

## Your Workflow

1. **Run locally**: `npm run dev`
2. **Login**: `http://localhost:3000/admin/login`
3. **Write post** and click "Publish"
4. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "New post: Your Title"
   git push
   ```
5. **Done!** Auto-deploys to GitHub Pages

## Testing Locally

To test the production build locally:
```bash
npm run build
npx serve out
```

Your blog will be at `http://localhost:3000/razbill`

## Important Notes

- Your blog URL will be `https://armaan-zsh.github.io/razbill`
- All links include `/razbill` prefix (configured in `next.config.mjs`)
- Admin panel only works locally (not on live site)
- GitHub Pages is 100% free and reliable!
