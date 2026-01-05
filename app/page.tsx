import Link from 'next/link'
import { getAllPostsSync } from '@/lib/posts'
import { FadeIn } from '@/components/ui/fade-in'

export default function HomePage() {
  const posts = getAllPostsSync()

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <FadeIn className="flex flex-col gap-8">
        <h1 className="font-bold text-3xl tracking-tight animate-fade-in">
          armaan
        </h1>
        <p className="text-muted max-w-lg leading-relaxed">
          i break things and sometimes fix them. currently learning about
          systems, distributed computing, and life.
        </p>
      </FadeIn>

      <FadeIn delay={0.2} className="flex flex-col gap-8">
        <h2 className="font-semibold text-lg tracking-tight">writing</h2>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 group hover:opacity-80 transition-opacity"
            >
              <span className="font-medium text-foreground tracking-tight underline decoration-muted/40 underline-offset-4 group-hover:decoration-foreground/60 transition-all">
                {post.frontmatter.title}
              </span>
              <span className="text-sm text-muted shrink-0 tabular-nums">
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
        <h2 className="font-semibold text-lg tracking-tight">connect</h2>
        <div className="flex gap-4 text-muted text-sm">
          <a href="https://github.com/armaan-zsh" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">github</a>
          <a href="https://x.com/armaan_zsh" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">twitter</a>
          <a href="mailto:armaan.zsh@gmail.com" className="hover:text-foreground transition-colors">email</a>
        </div>
      </FadeIn>
    </div>
  )
}