import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getPostBySlug } from '@/lib/posts'

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const session = await verifySession()

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const isDraft = request.nextUrl.searchParams.get('draft') === 'true'
        const post = await getPostBySlug(params.slug, isDraft)

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }

        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to load post' },
            { status: 500 }
        )
    }
}
