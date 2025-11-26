import Link from 'next/link'
import { format } from 'date-fns'
import { Post } from '@/lib/posts'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { frontmatter, slug, readingTime } = post
  const { title, date, summary } = frontmatter

  return (
    <Link href={`/posts/${slug}`} className="block group">
      <article className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all">
        <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition">
          {title}
        </h3>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <time dateTime={date}>
            {format(new Date(date), 'MMMM dd, yyyy')}
          </time>
          <span>•</span>
          <span>{readingTime}</span>
        </div>

        <p className="text-gray-700 leading-relaxed">
          {summary}
        </p>
      </article>
    </Link>
  )
}