'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'home' },
  { href: '/archive', label: 'archive' },
  { href: '/about', label: 'about' }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="border-b border-overlay bg-base/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-8">
        <Link href="/" className="font-bold text-xl text-iris hover:text-foam transition">
          <span className="text-muted">~/</span>blog
        </Link>

        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? 'text-foam font-semibold'
                  : 'text-subtle hover:text-text transition'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}