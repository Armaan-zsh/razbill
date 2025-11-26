# Deploy to Vercel 🚀

Your blog is ready to deploy! Follow these steps:

## Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push
```

## Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "**Add New Project**"
4. **Import** your `razbill` repository
5. Click "**Deploy**" (don't change any settings yet)

## Step 3: Add Environment Variables

After deployment, in Vercel dashboard:

1. Go to your project → **Settings** → **Environment Variables**
2. Add these 3 variables:

**Variable 1:**
- **Name**: `ADMIN_PASSWORD_HASH_B64`
- **Value**: (copy from your local `.env.local` file)

**Variable 2:**
- **Name**: `JWT_SECRET`  
- **Value**: (copy from your local `.env.local` file)

**Variable 3:**
- **Name**: `NEXT_PUBLIC_BASE_URL`
- **Value**: `https://YOUR-PROJECT-NAME.vercel.app` (use your actual Vercel URL)

3. Click "**Deploy**" to rebuild with environment variables

## Step 4: Test Your Admin Panel

1. Visit `https://YOUR-PROJECT-NAME.vercel.app/admin`
2. Login with your password
3. Create a post!

## Important Notes

✅ Your `.env.local` is protected (not in Git)  
✅ Your drafts are protected (not in Git)  
✅ Redeploy required after adding env vars  

## Troubleshooting

**Can't login?** Make sure you added the environment variables in Vercel and redeployed.

**404 on admin?** The site needs environment variables to work properly.

That's it! Your blog is live! 🎉
