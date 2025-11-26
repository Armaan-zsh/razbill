import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
    const session = await verifySession()

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { slug, frontmatter, content, isDraft } = await request.json()

        if (!slug || !frontmatter || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const dir = isDraft ? 'drafts' : 'posts'
        const targetDir = path.join(process.cwd(), dir)

        // Create directory if it doesn't exist
        try {
            await fs.access(targetDir)
        } catch {
            await fs.mkdir(targetDir, { recursive: true })
        }

        const filePath = path.join(targetDir, `${slug}.mdx`)

        // Check if file already exists in EITHER directory
        const postsPath = path.join(process.cwd(), 'posts', `${slug}.mdx`)
        const draftsPath = path.join(process.cwd(), 'drafts', `${slug}.mdx`)

        try {
            await fs.access(filePath)
            return NextResponse.json(
                { error: 'Post with this slug already exists' },
                { status: 409 }
            )
        } catch {
            // File doesn't exist in target dir, check other dir
            const otherPath = isDraft ? postsPath : draftsPath
            try {
                await fs.access(otherPath)
                return NextResponse.json(
                    { error: 'Post with this slug already exists' },
                    { status: 409 }
                )
            } catch {
                // Good to create
            }
        }

        const mdxContent = `---
title: "${frontmatter.title}"
date: ${frontmatter.date}
summary: "${frontmatter.summary}"
tags: [${frontmatter.tags.map((t: string) => `${t}`).join(', ')}]
---

${content}
`

        await fs.writeFile(filePath, mdxContent, 'utf-8')

        return NextResponse.json({ success: true, slug, isDraft })
    } catch (error) {
        console.error('Error creating post:', error)
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    const session = await verifySession()

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { slug, frontmatter, content, isDraft, currentIsDraft } = await request.json()

        if (!slug || !frontmatter || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const oldDir = currentIsDraft ? 'drafts' : 'posts'
        const newDir = isDraft ? 'drafts' : 'posts'

        const oldPath = path.join(process.cwd(), oldDir, `${slug}.mdx`)
        const newPath = path.join(process.cwd(), newDir, `${slug}.mdx`)

        const mdxContent = `---
title: "${frontmatter.title}"
date: ${frontmatter.date}
summary: "${frontmatter.summary}"
tags: [${frontmatter.tags.map((t: string) => `${t}`).join(', ')}]
---

${content}
`

        // Create new directory if needed
        const targetDir = path.join(process.cwd(), newDir)
        try {
            await fs.access(targetDir)
        } catch {
            await fs.mkdir(targetDir, { recursive: true })
        }

        // Write to new location
        await fs.writeFile(newPath, mdxContent, 'utf-8')

        // Delete from old location if different
        if (oldDir !== newDir) {
            try {
                await fs.unlink(oldPath)
            } catch (err) {
                console.error('Error deleting old file:', err)
            }
        }

        return NextResponse.json({ success: true, slug, isDraft })
    } catch (error) {
        console.error('Error updating post:', error)
        return NextResponse.json(
            { error: 'Failed to update post' },
            { status: 500 }
        )
    }
}
