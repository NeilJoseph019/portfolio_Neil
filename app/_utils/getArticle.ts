import fs from "fs"
import path from "path"
import matter from 'gray-matter'

import { remark } from "remark"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import rehypeHighlight from "rehype-highlight"
import rehypeStringify from "rehype-stringify"

interface ArticleMeta {
  slug: string
  frontmatter: {
    Title: string
    Created: string
    Tags: string[]
    Description: string
    Image: string
  }
}


// Get file path + Return the metadata.
export function getMetaData() : ArticleMeta[] {
    const articlesDir = path.join(process.cwd(), "articles")
    const files = fs.readdirSync(articlesDir)
    const mdFiles = files.filter((file) => file.endsWith(".md")).map((file) => {
        const filePath = path.join(articlesDir, file)
        const fileContent = fs.readFileSync(filePath, "utf8")
        const { data , content } = matter(fileContent)
        return {
            slug: file.replace(/\.md$/, ""),                               // e.g. "my-post" from "my-post.md"
            frontmatter: data as ArticleMeta['frontmatter']                // { title: "...", date: "...", etc. }
        }
    })
    return mdFiles
}


function getAllDatesLatestToOldest(articles: ArticleMeta[]): ArticleMeta[] {
  return [...articles].sort((a, b) => {
    return new Date(b.frontmatter.Created).getTime() - new Date(a.frontmatter.Created).getTime()
  })
}

export function getSortedArticles(limit = 3) {
  const mkData = getMetaData()
  return getAllDatesLatestToOldest(mkData).slice(0, limit)
}

// File conversion - returns string
export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}





