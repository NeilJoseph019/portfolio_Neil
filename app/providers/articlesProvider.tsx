"use client"

import { createContext, useContext, useState } from "react"

type ArticleMeta = {
  slug: string
  frontmatter: {
    Title: string
    Created: string
    Tags: string[]
    Description: string
    Image: string
  }
}

type ArticlesContextType = {
  sortedData: ArticleMeta[]
}

interface providerProps{
    children: React.ReactNode
    initialSortedData: ArticleMeta[]
}

const ArticlesContext = createContext<ArticlesContextType | null>(null)

export function ArticlesProvider({ children, initialSortedData }: providerProps) {

  const [sortedData] = useState(initialSortedData)

  return (
    <ArticlesContext.Provider value={{ sortedData }}>
      {children}
    </ArticlesContext.Provider>
  )
}

export function useArticles() {
  const ctx = useContext(ArticlesContext)
  if (!ctx) throw new Error("useArticles must be used inside ArticlesProvider")
  return ctx
}
