weekly-blog/
├── 📁 app/                    # Next.js App Router pages
│   ├── 📁 about/             # About page
│   │   └── page.tsx
│   ├── 📁 archive/           # Archive page
│   │   └── page.tsx
│   ├── 📁 posts/             # Dynamic post pages
│   │   └── 📁 [slug]/
│   │       └── page.tsx      # Individual post page
│   ├── 📁 rss.xml/           # RSS feed endpoint
│   │   └── route.ts
│   ├── sitemap.ts            # Sitemap generation
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── 📁 components/            # React components
│   ├── mdx-content.tsx       # MDX rendering components
│   ├── navigation.tsx        # Site navigation
│   ├── post-card.tsx         # Post preview cards
│   ├── social-share.tsx      # Social sharing buttons
│   └── theme-provider.tsx    # Dark mode provider
├── 📁 lib/                   # Utility functions
│   ├── posts.ts              # Post reading utilities
│   └── utils.ts              # General utilities
├── 📁 posts/                 # Blog posts (MDX)
│   ├── week-10.mdx           # Example posts
│   ├── week-11.mdx
│   └── week-12.mdx
├── 📁 public/                # Static assets
│   └── 📁 assets/            # Post cover images
│       └── README.md
├── .env.example              # Environment variables template
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Git ignore rules
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Documentation
