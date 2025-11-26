import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { VimNavigation } from '@/components/vim-navigation'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
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
    <html lang="en">
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