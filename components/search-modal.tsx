'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Post } from '@/lib/posts'

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
    posts: Post[]
}

export function SearchModal({ isOpen, onClose, posts }: SearchModalProps) {
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const filteredPosts = posts.filter((post) =>
        post.frontmatter.title.toLowerCase().includes(query.toLowerCase()) ||
        post.frontmatter.summary.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50)
            setQuery('')
            setSelectedIndex(0)
        }
    }, [isOpen])

    useEffect(() => {
        setSelectedIndex(0)
    }, [query])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex((prev) => (prev + 1) % filteredPosts.length)
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex((prev) => (prev - 1 + filteredPosts.length) % filteredPosts.length)
            } else if (e.key === 'Enter') {
                e.preventDefault()
                if (filteredPosts[selectedIndex]) {
                    router.push(`/posts/${filteredPosts[selectedIndex].slug}`)
                    onClose()
                }
            } else if (e.key === 'Escape') {
                e.preventDefault()
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, filteredPosts, selectedIndex, router, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-background/80 backdrop-blur-sm" onClick={onClose}>
            <div className="w-full max-w-lg bg-card border border-border rounded-lg shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-border flex items-center gap-2">
                    <span className="text-muted-foreground font-mono">/</span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/50"
                        placeholder="Search posts..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        ESC
                    </kbd>
                </div>

                {filteredPosts.length > 0 ? (
                    <div className="p-2">
                        {filteredPosts.map((post, index) => (
                            <div
                                key={post.slug}
                                className={`flex flex-col gap-1 p-3 rounded-md cursor-pointer transition-colors ${index === selectedIndex ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/50'
                                    }`}
                                onClick={() => {
                                    router.push(`/posts/${post.slug}`)
                                    onClose()
                                }}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <span className="font-medium text-sm">{post.frontmatter.title}</span>
                                <span className="text-xs text-muted-foreground line-clamp-1">{post.frontmatter.summary}</span>
                            </div>
                        ))}
                    </div>
                ) : query ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                        No results found.
                    </div>
                ) : null}

                <div className="p-2 border-t border-border bg-muted/30 text-[10px] text-muted-foreground flex justify-between px-4">
                    <span>Select with ↑↓</span>
                    <span>Open with Enter</span>
                </div>
            </div>
        </div>
    )
}
