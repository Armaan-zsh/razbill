'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'home' },
  { href: '/poetry', label: 'poetry' },
  { href: '/about', label: 'about' }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
        razbill
      </Link>

      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm transition-colors hover:text-foreground',
              pathname === item.href ? 'text-foreground font-medium' : 'text-muted'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}