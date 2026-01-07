import { getPoemBySlugSync, getAllPoemsSync } from '@/lib/poetry'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { FadeIn } from '@/components/ui/fade-in'
import Plum from '@/components/plum'

export function generateStaticParams() {
    const poems = getAllPoemsSync()
    return poems.map((poem) => ({
        slug: poem.slug,
    }))
}

export default function PoemPage({ params }: { params: { slug: string } }) {
    const poem = getPoemBySlugSync(params.slug)

    if (!poem) {
        notFound()
    }

    return (
        <>
            <Plum />
            <FadeIn>
                <article className="space-y-8 relative z-10">
                    <header className="space-y-4">
                        <h1 className="text-3xl font-bold text-foreground font-sans tracking-tight">
                            {poem.frontmatter.title}
                        </h1>
                        <div className="text-sm text-muted font-sans">
                            {new Date(poem.frontmatter.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </div>
                    </header>

                    <div className="prose prose-invert prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed max-w-none font-serif italic text-lg text-foreground/90 whitespace-pre-wrap">
                        <MDXRemote source={poem.content} />
                    </div>

                    <div className="pt-8 mt-8 border-t border-subtle">
                        <p className="text-sm font-sans not-italic text-muted">— Armaan</p>
                    </div>
                </article>
            </FadeIn>
        </>
    )
}
