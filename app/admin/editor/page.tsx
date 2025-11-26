'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function EditorPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const editSlug = searchParams.get('slug')
    const isDraft = searchParams.get('draft') === 'true'

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (editSlug) {
            const url = `/api/admin/posts/${editSlug}${isDraft ? '?draft=true' : ''}`
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setTitle(data.frontmatter.title)
                    setSummary(data.frontmatter.summary)
                    setTags(data.frontmatter.tags?.join(', ') || '')
                    setContent(data.content)
                })
                .catch(err => setError('Failed to load post'))
        }
    }, [editSlug, isDraft])

    const handleSave = async (publish: boolean) => {
        if (!title || !summary || !content) {
            setError('Title, summary, and content are required')
            return
        }

        setLoading(true)
        setError('')

        try {
            const slug = editSlug || title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')

            const res = await fetch('/api/admin/posts', {
                method: editSlug ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug,
                    frontmatter: {
                        title,
                        summary,
                        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
                        date: new Date().toISOString().split('T')[0],
                    },
                    content,
                    isDraft: !publish,
                    currentIsDraft: isDraft
                }),
            })

            if (res.ok) {
                router.push('/admin')
            } else {
                const data = await res.json()
                setError(data.error || 'Failed to save')
            }
        } catch (err) {
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-foam">
                    {editSlug ? (isDraft ? 'Edit Draft' : 'Edit Post') : 'New Post'}
                </h1>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push('/admin')}
                        className="px-4 py-2 text-muted hover:text-text transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleSave(false)}
                        disabled={loading}
                        className="px-6 py-2 bg-surface border border-overlay text-text rounded-lg font-medium hover:border-iris transition disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Draft'}
                    </button>
                    <button
                        onClick={() => handleSave(true)}
                        disabled={loading}
                        className="px-6 py-2 bg-iris text-base rounded-lg font-medium hover:bg-foam transition disabled:opacity-50"
                    >
                        {loading ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-love/10 border border-love rounded-lg text-love">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-2 gap-8">
                {/* Editor */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-subtle mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 bg-surface border border-overlay rounded-lg text-text focus:outline-none focus:border-iris transition"
                            placeholder="My Awesome Post"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-subtle mb-2">Summary</label>
                        <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="w-full px-4 py-2 bg-surface border border-overlay rounded-lg text-text focus:outline-none focus:border-iris transition resize-none"
                            rows={3}
                            placeholder="A brief description..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-subtle mb-2">Tags (comma separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full px-4 py-2 bg-surface border border-overlay rounded-lg text-text focus:outline-none focus:border-iris transition"
                            placeholder="tech, coding, tutorial"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-subtle mb-2">Content (Markdown)</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-2 bg-surface border border-overlay rounded-lg text-text focus:outline-none focus:border-iris transition font-mono text-sm resize-none"
                            rows={20}
                            placeholder="## Heading

Write your post in markdown..."
                        />
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-4">
                    <div className="text-sm text-subtle">Preview</div>
                    <div className="p-6 bg-surface border border-overlay rounded-lg min-h-[600px]">
                        <h1 className="text-3xl font-bold text-text mb-4">{title || 'Untitled'}</h1>
                        <p className="text-subtle mb-6">{summary || 'No summary'}</p>
                        {tags && (
                            <div className="flex gap-2 mb-8">
                                {tags.split(',').map((tag, i) => (
                                    <span key={i} className="px-2 py-1 bg-overlay text-xs rounded text-muted">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="prose prose-invert max-w-none">
                            <div className="whitespace-pre-wrap text-text leading-relaxed">
                                {content || 'No content yet...'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
