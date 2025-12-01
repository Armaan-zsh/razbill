import type { Metadata } from 'next'
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <VimNavigation />
        <Navigation />
        <main className="container mx-auto px-8 py-16">
          {children}
        </main>
      </body>
    </html>
  )
}