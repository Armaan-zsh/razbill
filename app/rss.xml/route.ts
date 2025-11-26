import { NextRequest } from 'next/server'
import { getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'

export async function GET(request: NextRequest) {
  const baseUrl = 'https://your-domain.vercel.app'
  const posts = await getAllPosts()

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Weekly Blog</title>
    <description>A weekly blog documenting development journey, learnings, and insights</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${posts.length > 0 ? new Date(posts[0].frontmatter.date).toUTCString() : new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    
    ${posts.slice(0, 20).map(post => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <description><![CDATA[${post.frontmatter.summary}]]></description>
      <link>${baseUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <source url="${baseUrl}/rss.xml">Weekly Blog</source>
    </item>
    `).join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=600, stale-while-revalidate=3600',
    },
  })
}