import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import { Navigation } from '@/components/navigation'
import { VimNavigation } from '@/components/vim-navigation'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://armaan-zsh.github.io/razbill'),
  title: {
    default: '~/blog',
    template: '%s | ~/blog'
  },
  description: 'thoughts, code, and caffeine-fueled rants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-foreground">
        <VimNavigation />
        <div className="mx-auto max-w-2xl px-6 py-12 sm:py-24">
          <header className="mb-20">
            <Navigation />
          </header>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}