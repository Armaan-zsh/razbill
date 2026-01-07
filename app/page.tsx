import Link from 'next/link'
import { getAllPostsSync } from '@/lib/posts'
import { FadeIn } from '@/components/ui/fade-in'

export default function HomePage() {
  const posts = getAllPostsSync()

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <FadeIn className="flex flex-col gap-8">
        <h1 className="font-bold text-3xl tracking-tight animate-fade-in text-foreground">
          armaan
        </h1>
      </FadeIn>

      <FadeIn delay={0.2} className="flex flex-col gap-8">
        <h2 className="font-bold text-lg tracking-tight text-foreground">writing</h2>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 group hover:opacity-80 transition-opacity"
            >
              <span className="font-serif italic text-lg text-foreground tracking-tight underline decoration-muted/40 underline-offset-4 group-hover:decoration-foreground/60 transition-all">
                {post.frontmatter.title}
              </span>
              <span className="text-sm text-muted shrink-0 tabular-nums font-sans">
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </Link>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.3} className="flex flex-col gap-8">
        <h2 className="font-semibold text-lg tracking-tight text-foreground">connect</h2>
        <div className="flex gap-4 text-muted text-sm font-sans">
          <a href="https://github.com/armaan-zsh" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">github</a>
          <a href="https://cadettapes.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">music blog</a>
        </div>
      </FadeIn>
    </div>
  )
}