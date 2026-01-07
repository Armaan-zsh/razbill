import { notFound } from 'next/navigation'
import { getPostBySlugSync, getAllPostsSlugs } from '@/lib/posts'
import { MDXContent } from '@/components/mdx-content'
import { SocialShare } from '@/components/social-share'
import { format } from 'date-fns'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { FadeIn } from '@/components/ui/fade-in'

interface PostPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  const slugs = getAllPostsSlugs()

  return slugs.map((slug) => ({
    slug,
  }))
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlugSync(params.slug)

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
  const post = getPostBySlugSync(params.slug)

  if (!post) {
    notFound()
  }

  const { frontmatter, slug, content } = post
  const { title, date } = frontmatter
  const url = `https://armaan-zsh.github.io/razbill/posts/${slug}`

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
    }
  })

  return (
    <article className="max-w-none">
      <FadeIn>
        <header className="mb-10 flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted">
            <time dateTime={date}>
              {format(new Date(date), 'MMMM d, yyyy')}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="prose prose-invert prose-neutral max-w-none font-serif italic text-lg prose-headings:font-sans prose-headings:not-italic prose-headings:font-bold prose-headings:tracking-tight prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:text-muted transition-colors prose-code:font-mono prose-code:text-sm prose-code:not-italic prose-code:bg-subtle/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-subtle/30 prose-pre:border prose-pre:border-subtle">
          <MDXContent>
            {mdxContent}
          </MDXContent>
        </div>

        <footer className="mt-16 pt-8 border-t border-subtle">
          <SocialShare url={url} title={title} />
        </footer>
      </FadeIn>
    </article>
  )
}