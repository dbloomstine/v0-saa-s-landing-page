import { articles } from './data'
import { Article, FundCategory } from './types'

export function getAllArticles(): Article[] {
  return articles.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getArticlesByCategory(category: FundCategory): Article[] {
  return articles
    .filter(article => article.category === category)
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug)
}

export function getCategories(): FundCategory[] {
  return ['vc', 'pe', 'hedge', 'credit']
}
