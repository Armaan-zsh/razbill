import Link from 'next/link'
import { getAllPoemsSync } from '@/lib/poetry'
import { FadeIn } from '@/components/ui/fade-in'
import Plum from '@/components/plum'

export default function PoetryPage() {
    const poems = getAllPoemsSync()

    return (
        <>
            <Plum />
            <FadeIn>
                <div className="space-y-16 font-serif italic text-lg pr-4 relative z-10">
                    <h1 className="text-3xl font-bold text-foreground mb-8 not-italic font-sans tracking-tight">
                        poetry
                    </h1>

                    <div className="space-y-10">
                        {poems.map((poem) => (
                            <div key={poem.slug} className="flex flex-col gap-2">
                                <Link
                                    href={`/poetry/${poem.slug}`}
                                    className="text-xl font-bold not-italic font-sans text-foreground hover:opacity-80 transition-opacity w-fit"
                                >
                                    {poem.frontmatter.title}
                                </Link>
                                <div className="text-foreground/90 leading-relaxed line-clamp-3">
                                    {poem.frontmatter.summary}
                                </div>
                                <div className="text-sm font-sans not-italic text-muted">
                                    {new Date(poem.frontmatter.date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeIn>
        </>
    )
}
