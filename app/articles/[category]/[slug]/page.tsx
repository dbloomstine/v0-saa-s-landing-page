import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug } from '@/content/articles/utils'
import { categoryInfo } from '@/content/articles/types'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map(article => ({
    category: article.category,
    slug: article.slug,
  }))
}

export default function ArticlePage({ params }: { params: { category: string; slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article || article.category !== params.category) {
    notFound()
  }

  const categoryName = categoryInfo[article.category].name

  return (
    <main className="min-h-screen">
      <Header />

      <article className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/articles/${article.category}`}
            className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block"
          >
            ← Back to {categoryName}
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href={`/articles/${article.category}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {categoryName}
              </Link>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{article.readTime}</span>
            </div>

            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span>{article.author}</span>
              <span>•</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>

            <p className="text-lg text-muted-foreground">{article.excerpt}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            {article.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.replace('# ', '')}</h1>
              }
              if (paragraph.trim().startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>
              }
              if (paragraph.trim().startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{paragraph.replace('### ', '')}</h3>
              }
              if (paragraph.trim().startsWith('- ')) {
                return <li key={index} className="ml-6 mb-1">{paragraph.replace('- ', '')}</li>
              }
              if (paragraph.trim() === '') {
                return <br key={index} />
              }
              if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                const text = paragraph.trim().slice(2, -2)
                return <p key={index} className="mb-4"><strong>{text}</strong></p>
              }
              return <p key={index} className="mb-4 text-foreground/90">{paragraph}</p>
            })}
          </div>

          <div className="mt-12 pt-8 border-t">
            <Link
              href={`/articles/${article.category}`}
              className="text-primary hover:underline font-medium"
            >
              ← More {categoryName} articles
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
