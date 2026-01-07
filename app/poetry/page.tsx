import { FadeIn } from '@/components/ui/fade-in'

export default function PoetryPage() {
    return (
        <FadeIn>
            <div className="space-y-8 font-serif italic text-lg pr-4">
                <h1 className="text-3xl font-bold text-foreground mb-8 not-italic font-sans tracking-tight">
                    poetry
                </h1>
                <div className="space-y-6 leading-relaxed text-foreground/90">
                    <p>
                        coming soon...
                    </p>
                </div>
            </div>
        </FadeIn>
    )
}
