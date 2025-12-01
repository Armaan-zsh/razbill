import { redirect } from 'next/navigation'
import { verifySession, deleteSession } from '@/lib/auth'
import { getAllPosts, getAllDrafts } from '@/lib/posts'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const session = await verifySession()

    if (!session) {
        redirect('/admin/login')
    }

    const [posts, drafts] = await Promise.all([getAllPosts(), getAllDrafts()])

    return (
        <div className="max-w-4xl mx-auto px-8 py-16">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-bold text-foam">
                    <span className="text-iris">~/</span>admin
                </h1>

                <form action={async () => {
                    'use server'
                    await deleteSession()
                    redirect('/admin/login')
                }}>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-surface border border-overlay rounded-lg text-muted hover:text-text hover:border-iris transition"
                    >
                        Logout
                    </button>
                </form>
            </div>

            <div className="space-y-12">
                {/* New Post Button */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-text">Dashboard</h2>
                    <Link
                        href="/admin/editor"
                        className="px-6 py-2 bg-iris text-base rounded-lg font-medium hover:bg-foam transition"
                    >
                        New Post
                    </Link>
                </div>

                {/* Drafts Section */}
                {drafts.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gold">Drafts ({drafts.length})</h3>
                        <div className="space-y-3">
                            {drafts.map((draft) => (
                                <div
                                    key={draft.slug}
                                    className="flex items-center justify-between p-4 bg-surface/50 border border-overlay rounded-lg"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-text mb-1">
                                            {draft.frontmatter.title}
                                        </h4>
                                        <p className="text-sm text-muted">
                                            {new Date(draft.frontmatter.date).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/editor?slug=${draft.slug}&draft=true`}
                                            className="px-3 py-1 text-sm bg-overlay border border-muted rounded hover:border-iris transition"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Published Posts Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foam">Published ({posts.length})</h3>
                    {posts.length > 0 ? (
                        <div className="space-y-3">
                            {posts.map((post) => (
                                <div
                                    key={post.slug}
                                    className="flex items-center justify-between p-4 bg-surface border border-overlay rounded-lg"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-text mb-1">
                                            {post.frontmatter.title}
                                        </h4>
                                        <p className="text-sm text-muted">
                                            {new Date(post.frontmatter.date).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/editor?slug=${post.slug}`}
                                            className="px-3 py-1 text-sm bg-overlay border border-muted rounded hover:border-iris transition"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/posts/${post.slug}`}
                                            className="px-3 py-1 text-sm text-muted hover:text-text transition"
                                            target="_blank"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-muted">
                            <p>No published posts yet. Create your first post!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
