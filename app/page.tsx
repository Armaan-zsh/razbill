import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-8">
      <div className="max-w-3xl w-full space-y-12 text-center">
        {/* Main title */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            <span className="text-iris">~/</span>
            <span className="text-text">blog</span>
          </h1>
        </div>

        {/* Navigation hint */}
        <div className="flex items-center justify-center gap-6 text-sm text-muted">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-surface border border-overlay rounded">j</kbd>
            <span>scroll down</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-surface border border-overlay rounded">k</kbd>
            <span>scroll up</span>
          </div>
        </div>

        {/* Posts section */}
        {posts.length > 0 ? (
          <div className="space-y-6 pt-12">
            <h2 className="text-2xl font-semibold text-foam">recent posts</h2>
            <div className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="block group"
                >
                  <div className="flex items-baseline justify-between p-4 rounded-lg hover:bg-surface">
                    <span className="text-text group-hover:text-rose font-medium">
                      {post.frontmatter.title}
                    </span>
                    <span className="text-muted text-sm">
                      {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            {posts.length > 5 && (
              <Link
                href="/archive"
                className="inline-block text-iris hover:text-foam"
              >
                view all posts →
              </Link>
            )}
          </div>
        ) : (
          <div className="pt-12">
            <p className="text-muted italic">no posts yet. stay tuned.</p>
          </div>
        )}
      </div>
    </div>
  )
}