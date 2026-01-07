import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'

export default function AboutPage() {
  return (
    <FadeIn>
      <div className="space-y-8 font-serif italic text-lg pr-4">
        <h1 className="text-3xl font-bold text-foreground mb-8 not-italic font-sans tracking-tight">
          about
        </h1>

        <div className="space-y-6 leading-relaxed text-foreground/90">
          <p>
            just a <span className="text-foreground font-semibold">20-year-old nerd</span> with too many browser tabs open
            and an unhealthy relationship with vim.
          </p>

          <p>
            this is where i dump my thoughts—half-baked ideas, debugging journeys,
            and the occasional epiphany that strikes at 3am.
            <span className="text-foreground font-medium"> what i write here is what makes sense to me</span>,
            which may or may not align with reality. proceed with caution.
          </p>

          <p>
            i write about code, tech, and whatever else crosses my mind.
            sometimes it's insightful. mostly it's just me trying to sound smart.
          </p>
        </div>

        <div className="pt-8 border-t border-subtle font-sans not-italic">
          <p className="text-muted text-sm">
            find me elsewhere:{' '}
            <a
              href="https://github.com/armaan-zsh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:opacity-80 underline underline-offset-4 transition-opacity"
            >
              github.com/armaan-zsh
            </a>
          </p>
        </div>
      </div>
    </FadeIn>
  )
}

export const metadata = {
  title: 'About',
  description: 'About me and this blog',
}