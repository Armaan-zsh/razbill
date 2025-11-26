'use client'

import { MDXComponents } from 'mdx/types'
import { ReactNode } from 'react'

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-12 leading-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mb-3 mt-8 leading-tight">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-6 leading-relaxed text-lg">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-6 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-6 space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-muted/50 rounded-lg p-6 overflow-x-auto mb-6">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted text-left">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="transition-colors hover:bg-muted/50">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="p-4 font-medium text-muted-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="p-4 align-middle">
      {children}
    </td>
  )
}

export function MDXContent({ children }: { children: ReactNode }) {
  return (
    <div className="prose-custom max-w-none">
      <div className="prose-custom">
        {children}
      </div>
    </div>
  )
}

export { components }