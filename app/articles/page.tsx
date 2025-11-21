import Link from 'next/link'
import { getAllArticles } from '@/content/articles/utils'
import { categoryInfo } from '@/content/articles/types'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function ArticlesPage() {
  const articles = getAllArticles()
  const categories = Object.entries(categoryInfo)

  return (
    <main className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Fund Operations Insights</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Expert guidance on fund administration, compliance, and operations across different fund types.
          </p>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {categories.map(([key, info]) => {
              const categoryArticles = articles.filter(a => a.category === key)
              return (
                <Link
                  key={key}
                  href={`/articles/${key}`}
                  className="border rounded-lg p-6 hover:border-primary transition-colors"
                >
                  <h2 className="text-2xl font-semibold mb-2">{info.name}</h2>
                  <p className="text-muted-foreground mb-4">{info.description}</p>
                  <p className="text-sm text-primary font-medium">
                    {categoryArticles.length} {categoryArticles.length === 1 ? 'article' : 'articles'}
                  </p>
                </Link>
              )
            })}
          </div>

          {/* Recent Articles */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Recent Articles</h2>
            <div className="space-y-6">
              {articles.map(article => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.category}/${article.slug}`}
                  className="block border rounded-lg p-6 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-primary">
                      {categoryInfo[article.category].name}
                    </span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
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
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
