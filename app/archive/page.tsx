import { getAllPostsSync } from '@/lib/posts'
import { PostCard } from '@/components/post-card'

export const metadata = {
  title: 'Archive',
  description: 'All blog posts',
}

export default function ArchivePage() {
  const posts = getAllPostsSync()

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Archive</h1>
        <p className="text-gray-600">
          All {posts.length} posts, sorted by most recent
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-16">
          No posts yet. Check back soon!
        </p>
      )}
    </div>
  )
}