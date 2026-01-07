import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PoemFrontmatter {
    title: string
    date: string
    summary: string
}

export interface Poem {
    slug: string
    frontmatter: PoemFrontmatter
    content: string
}

export function getAllPoemsSync(): Poem[] {
    const directory = path.join(process.cwd(), 'poetry')

    try {
        fs.accessSync(directory)
    } catch {
        return []
    }

    const files = fs.readdirSync(directory).filter(file => file.endsWith('.mdx'))

    const poems = files.map(file => {
        const filePath = path.join(directory, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data: frontmatter, content } = matter(fileContents)

        return {
            slug: file.replace('.mdx', ''),
            frontmatter: frontmatter as PoemFrontmatter,
            content
        }
    })

    return poems.sort((a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
}

export function getPoemBySlugSync(slug: string): Poem | null {
    try {
        const filePath = path.join(process.cwd(), 'poetry', `${slug}.mdx`)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data: frontmatter, content } = matter(fileContents)

        return {
            slug,
            frontmatter: frontmatter as PoemFrontmatter,
            content
        }
    } catch (error) {
        return null
    }
}
