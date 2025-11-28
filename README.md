# Weekly Blog

A modern, minimal blog built with Next.js, Tailwind CSS, and MDX. Perfect for weekly posts about your development journey, learnings, and insights.

## Features

- **Next.js 14** with App Router
- **MDX Support** for rich content
- **Dark Mode** support with system preference detection
- **Responsive Design** mobile-first approach
- **SEO Optimized** with meta tags, Open Graph, and Twitter Cards
- **Automatic Sitemap** generation
- **RSS Feed** for content syndication
- **Social Sharing** buttons on posts
- **Reading Time** estimation for posts
- **Clean Typography** using Inter font
- **TypeScript** support
- **Vercel Ready** deployment configuration

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Content:** MDX with custom components
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Type Safety:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weekly-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Writing Posts

### Post Structure

Posts are MDX files located in the `/posts` directory. Each post follows this structure:

```mdx
---
title: "Week X — Title"
date: YYYY-MM-DD
week_number: X
summary: "Short 1-line summary."
tags: [weekly, tag2]
cover_image: "/assets/weekX.png"
---

Your content here in MDX format.
```

### Post Content Tips

Follow these guidelines to make your blog engaging:

1. **Always add a "What surprised me" section**
   - Something unexpected you learned
   - A realization or mindset shift
   - Bugs that taught you something

2. **Keep posts under 200 words**
   - Focus on key insights
   - Use bullets for scan-ability
   - Write conversationally

3. **Structure your posts:**
   - What I did
   - What I learned  
   - What surprised me
   - Resources I used
   - Next week plan

4. **Include visuals**
   - Code snippets
   - Screenshots
   - Before/after comparisons

### Example Post

See `/posts/week-12.mdx` for a complete example following the recommended format.

## Customization

### Updating Site Information

1. **Edit metadata** in `app/layout.tsx`:
   - Change site title, description, authors
   - Update Open Graph and Twitter Card settings

2. **Update social links** in `components/social-share.tsx`:
   - Modify share URLs for Twitter, LinkedIn, etc.

3. **Change the site URL** in:
   - `app/sitemap.ts` (baseUrl variable)
   - `app/rss.xml/route.ts` (baseUrl variable)

### Styling Customization

1. **Colors:** Modify `tailwind.config.js` color palette
2. **Typography:** Update font settings in `tailwind.config.js`
3. **Layout:** Adjust spacing and sizing in Tailwind classes

### Adding New Pages

Create new pages by adding files to the `app` directory:

- `app/new-page/page.tsx` → `/new-page`
- `app/docs/guide/page.tsx` → `/docs/guide`

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

3. **Update Environment Variables**
   In Vercel dashboard, add:
   - `NEXT_PUBLIC_SITE_URL` - Your deployed site URL

### Other Platforms

The project can be deployed on:
- **Netlify** - Supports Next.js SSG
- **Railway** - Full-stack deployment
- **DigitalOcean App Platform** - Easy deployment
- **Self-hosted** - Using any Node.js hosting

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## File Structure

```
weekly-blog/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── archive/           # Archive page
│   ├── posts/             # Dynamic post pages
│   │   └── [slug]/        
│   │       └── page.tsx   # Individual post page
│   ├── rss.xml/           # RSS feed endpoint
│   ├── sitemap.ts         # Sitemap generation
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── mdx-content.tsx    # MDX rendering components
│   ├── navigation.tsx     # Site navigation
│   ├── post-card.tsx      # Post preview cards
│   ├── social-share.tsx   # Social sharing buttons
│   └── theme-provider.tsx # Dark mode provider
├── lib/                   # Utility functions
│   ├── posts.ts           # Post reading utilities
│   └── utils.ts           # General utilities
├── posts/                 # Blog posts (MDX)
│   ├── week-10.mdx        # Example posts
│   ├── week-11.mdx        
│   └── week-12.mdx        
├── public/                # Static assets
│   └── assets/            # Post cover images
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have questions or need help:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Join the discussion in existing issues

---

**Happy blogging!** 🚀 
