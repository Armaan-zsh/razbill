import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navigation } from '@/components/navigation'
import { VimNavigation } from '@/components/vim-navigation'
import './globals.css'

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased selection:bg-accent selection:text-foreground">
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