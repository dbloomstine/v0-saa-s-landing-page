export type FundCategory = 'vc' | 'pe' | 'hedge' | 'credit'

export interface Article {
  slug: string
  title: string
  category: FundCategory
  excerpt: string
  content: string
  publishedAt: string
  author: string
  readTime: string
}

export const categoryInfo: Record<FundCategory, { name: string; description: string }> = {
  vc: {
    name: 'Venture Capital',
    description: 'Fund operations insights for venture capital firms',
  },
  pe: {
    name: 'Private Equity',
    description: 'Fund operations insights for private equity firms',
  },
  hedge: {
    name: 'Hedge Funds',
    description: 'Fund operations insights for hedge fund managers',
  },
  credit: {
    name: 'Credit Funds',
    description: 'Fund operations insights for credit fund managers',
  },
}
