'use client'

import { Share2, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'

interface SocialShareProps {
  url: string
  title: string
}

export function SocialShare({ url, title }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks]
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer,width=600,height=400')
    }
  }

  return (
    <div className="flex items-center gap-4 pt-8 border-t">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Share2 className="h-4 w-4" />
        <span>Share:</span>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => handleShare('twitter')}
          className="inline-flex items-center justify-center w-10 h-10 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => handleShare('linkedin')}
          className="inline-flex items-center justify-center w-10 h-10 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </button>
        
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center justify-center w-10 h-10 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors relative"
          aria-label="Copy link"
        >
          <LinkIcon className="h-4 w-4" />
          {copied && (
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-background border px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  )
}