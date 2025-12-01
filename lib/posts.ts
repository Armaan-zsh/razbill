import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface PostFrontmatter {
  title: string
  date: string
  summary: string
  tags: string[]
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readingTime: string
  isDraft?: boolean
}

function getPostsFromDirSync(dir: string, isDraft = false): Post[] {
  const postsDirectory = path.join(process.cwd(), dir)

  try {
    fs.accessSync(postsDirectory)
  } catch {
    return []
  }

  const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'))

  const posts = files.map(file => {
    const filePath = path.join(postsDirectory, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContents)

    const stats = readingTime(content)

    return {
      slug: file.replace('.mdx', ''),
      frontmatter: frontmatter as PostFrontmatter,
      content,
      readingTime: stats.text,
      isDraft
    }
  })

  return posts.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

export function getAllPostsSync(): Post[] {
  return getPostsFromDirSync('posts', false)
}

export function getAllPostsSlugs(): string[] {
  const postsDirectory = path.join(process.cwd(), 'posts')

  try {
    const files = fs.readdirSync(postsDirectory)
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''))
  } catch {
    return []
  }
}

export function getPostBySlugSync(slug: string): Post | null {
  try {
    const filePath = path.join(process.cwd(), 'posts', `${slug}.mdx`)

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContents)

    const stats = readingTime(content)

    return {
      slug,
      frontmatter: frontmatter as PostFrontmatter,
      content,
      readingTime: stats.text,
      isDraft: false
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}