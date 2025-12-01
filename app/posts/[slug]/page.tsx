import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts'
import { MDXContent } from '@/components/mdx-content'
import { SocialShare } from '@/components/social-share'
import { format } from 'date-fns'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components as baseComponents } from '@/components/mdx-content'
import Image from 'next/image'
import type { Metadata } from 'next'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()

  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  const { frontmatter } = post
  const { title, summary } = frontmatter

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      url: `https://armaan-zsh.github.io/razbill/posts/${post.slug}`,
      type: 'article',
      publishedTime: frontmatter.date,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const { frontmatter, slug, content } = post
  const { title, date } = frontmatter
  const url = `https://your-domain.vercel.app/posts/${slug}`

  const { content: mdxContent } = await compileMDX({
    source: content,

    options: {
      parseFrontmatter: false,

    }
  })

  return (
    <article className="max-w-content mx-auto">
      <header className="text-center mb-16 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <time dateTime={date}>
              {format(new Date(date), 'MMMM dd, yyyy')}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {title}
          </h1>
        </div>
      </header>

      <div className="prose-custom">
        <MDXContent>
          {mdxContent}
        </MDXContent>
      </div>

      <footer className="mt-16">
        <SocialShare url={url} title={title} />
      </footer>
    </article>
  )
}