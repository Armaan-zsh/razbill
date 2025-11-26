import fs from 'fs/promises'
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

async function getPostsFromDir(dir: string, isDraft = false): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), dir)

  try {
    await fs.access(postsDirectory)
  } catch {
    return []
  }

  const files = (await fs.readdir(postsDirectory)).filter(file => file.endsWith('.mdx'))

  const posts = await Promise.all(files.map(async (file) => {
    const filePath = path.join(postsDirectory, file)
    const fileContents = await fs.readFile(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContents)

    const stats = readingTime(content)

    return {
      slug: file.replace('.mdx', ''),
      frontmatter: frontmatter as PostFrontmatter,
      content,
      readingTime: stats.text,
      isDraft
    }
  }))

  return posts.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

export function getAllPosts(): Promise<Post[]> {
  return getPostsFromDir('posts', false)
}

export function getAllDrafts(): Promise<Post[]> {
  return getPostsFromDir('drafts', true)
}

export async function getPostBySlug(slug: string, isDraft = false): Promise<Post | null> {
  try {
    const dir = isDraft ? 'drafts' : 'posts'
    const filePath = path.join(process.cwd(), dir, `${slug}.mdx`)

    const fileContents = await fs.readFile(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContents)

    const stats = readingTime(content)

    return {
      slug,
      frontmatter: frontmatter as PostFrontmatter,
      content,
      readingTime: stats.text,
      isDraft
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const postsDirectory = path.join(process.cwd(), 'posts')

  try {
    const files = await fs.readdir(postsDirectory)
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''))
  } catch {
    return []
  }
}