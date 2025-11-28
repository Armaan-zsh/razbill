# 📷 How to Set Up Image Uploads (Cloudinary)

Your blog now has image upload! But you need to get **FREE** API keys from Cloudinary first.

## Step 1: Sign Up for Cloudinary (FREE)

1. Go to [cloudinary.com/users/register_free](https://cloudinary.com/users/register_free)
2. Sign up with your email (it's 100% free, no credit card needed)
3. Verify your email

## Step 2: Get Your API Credentials

After signing in:

1. You'll see your dashboard
2. Look for these 3 values (they're right on the main page):
   - **Cloud Name** (looks like: `dj12abc34ef`)
   - **API Key** (looks like: `123456789012345`)
   - **API Secret** (looks like: `AaBbCcDdEeFf1234567890`)

## Step 3: Add to Vercel

1. Go to [vercel.com](https://vercel.com) → Your **razbill** project
2. **Settings** → **Environment Variables**
3. Add these **3 new variables**:

**Variable 1:**
- Key: `CLOUDINARY_CLOUD_NAME`
- Value: (paste your Cloud Name)

**Variable 2:**
- Key: `CLOUDINARY_API_KEY`
- Value: (paste your API Key)

**Variable 3:**
- Key: `CLOUDINARY_API_SECRET`
- Value: (paste your API Secret)

4. Click **Save**

## Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **3 dots (⋮)** on latest deployment
3. Click **Redeploy**

## Step 5: ✅ Done!

Once redeployed:

1. Go to `/admin/editor` (create new post)
2. Click **📷 Upload Image** button
3. Select an image
4. It automatically inserts the markdown: `![image.jpg](https://cloudinary-url.jpg)`
5. Publish!

Your images are now hosted on Cloudinary's fast CDN! 🚀

---

**Note:** Free tier gives you 25GB storage/month. That's enough for thousands of images for a blog!
