import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticlesByCategory, getCategories } from '@/content/articles/utils'
import { categoryInfo, type FundCategory } from '@/content/articles/types'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function generateStaticParams() {
  return getCategories().map(category => ({
    category,
  }))
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category as FundCategory

  if (!getCategories().includes(category)) {
    notFound()
  }

  const articles = getArticlesByCategory(category)
  const info = categoryInfo[category]

  return (
    <main className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/articles"
            className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block"
          >
            ← Back to all articles
          </Link>

          <h1 className="text-4xl font-bold mb-4">{info.name}</h1>
          <p className="text-lg text-muted-foreground mb-12">{info.description}</p>

          <div className="space-y-6">
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/articles/${category}/${article.slug}`}
                className="block border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                </div>
                <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
                <p className="text-muted-foreground mb-3">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </Link>
            ))}
          </div>

          {articles.length === 0 && (
            <p className="text-muted-foreground text-center py-12">
              No articles yet in this category. Check back soon!
            </p>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
