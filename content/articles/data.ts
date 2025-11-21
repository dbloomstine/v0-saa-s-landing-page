import { Article } from './types'

export const articles: Article[] = [
  // VC Articles
  {
    slug: 'vc-fund-admin-basics',
    title: 'Fund Administration Basics for Venture Capital',
    category: 'vc',
    excerpt: 'Understanding the essential fund administration requirements for VC firms, from capital calls to portfolio company tracking.',
    content: `
# Fund Administration Basics for Venture Capital

Managing fund administration for venture capital requires specialized knowledge and systems. Here's what you need to know.

## Capital Call Management

Efficiently managing capital calls is crucial for maintaining LP relationships. Best practices include:

- Clear communication timelines
- Automated tracking systems
- Transparent fee calculations

## Portfolio Company Tracking

Tracking your portfolio companies' performance and valuations is critical for accurate NAV calculations and investor reporting.

## Compliance Requirements

VC funds must maintain strict compliance with SEC regulations, including Form PF filings and annual audits.
    `,
    publishedAt: '2024-01-15',
    author: 'FundOps Team',
    readTime: '5 min read',
  },
  {
    slug: 'vc-compliance-checklist',
    title: 'Annual Compliance Checklist for VC Funds',
    category: 'vc',
    excerpt: 'A comprehensive checklist to ensure your venture capital fund stays compliant throughout the year.',
    content: `
# Annual Compliance Checklist for VC Funds

Stay on top of your compliance obligations with this essential checklist.

## Q1 Requirements
- Form PF filing (if applicable)
- K-1 distribution to LPs
- Annual audit completion

## Q2 Requirements
- Mid-year LP reporting
- Portfolio company valuations
- Compliance policy review

## Q3 Requirements
- Third quarter reporting
- Due diligence updates

## Q4 Requirements
- Year-end planning
- Tax preparation
- Annual meeting preparation
    `,
    publishedAt: '2024-02-20',
    author: 'FundOps Team',
    readTime: '4 min read',
  },

  // PE Articles
  {
    slug: 'pe-waterfall-calculations',
    title: 'Understanding Waterfall Calculations in Private Equity',
    category: 'pe',
    excerpt: 'A deep dive into carried interest and waterfall calculations for PE funds.',
    content: `
# Understanding Waterfall Calculations in Private Equity

Waterfall calculations determine how profits are distributed between LPs and GPs in private equity funds.

## European vs American Waterfall

Understanding the difference between these two methods is crucial:

- **European waterfall**: Carried interest calculated on entire fund performance
- **American waterfall**: Carried interest calculated on deal-by-deal basis

## Preferred Return (Hurdle Rate)

Most PE funds include an 8% preferred return before GPs can participate in carried interest.

## Catch-Up Provisions

Understanding how catch-up provisions work ensures proper distribution modeling.
    `,
    publishedAt: '2024-01-28',
    author: 'FundOps Team',
    readTime: '6 min read',
  },
  {
    slug: 'pe-fund-administration',
    title: 'Private Equity Fund Administration Best Practices',
    category: 'pe',
    excerpt: 'Key considerations for managing PE fund operations efficiently and accurately.',
    content: `
# Private Equity Fund Administration Best Practices

Effective fund administration is the backbone of successful PE operations.

## Capital Account Maintenance

Accurate capital account tracking is essential for:
- Distribution calculations
- Carried interest determinations
- Tax reporting

## Deal Pipeline Management

Integrate your deal flow with your fund administration system for seamless operations.

## Investor Reporting

PE investors expect detailed quarterly reports including:
- Portfolio company updates
- Valuation methodologies
- Cash flow projections
    `,
    publishedAt: '2024-02-10',
    author: 'FundOps Team',
    readTime: '5 min read',
  },

  // Hedge Fund Articles
  {
    slug: 'hedge-daily-nav-process',
    title: 'Streamlining Daily NAV Calculations for Hedge Funds',
    category: 'hedge',
    excerpt: 'Best practices for efficient and accurate daily NAV calculations in hedge fund operations.',
    content: `
# Streamlining Daily NAV Calculations for Hedge Funds

Daily NAV calculations are the cornerstone of hedge fund operations.

## Pricing Sources

Establishing reliable pricing sources is critical:
- Bloomberg/Reuters for liquid securities
- Third-party pricing services for OTC instruments
- Broker quotes for illiquid positions

## Reconciliation Process

Daily reconciliation between administrators and prime brokers prevents discrepancies.

## Automation Opportunities

Modern fund administrators leverage automation to:
- Reduce manual errors
- Speed up NAV delivery
- Improve investor confidence
    `,
    publishedAt: '2024-01-18',
    author: 'FundOps Team',
    readTime: '4 min read',
  },
  {
    slug: 'hedge-compliance-monitoring',
    title: 'Real-Time Compliance Monitoring for Hedge Funds',
    category: 'hedge',
    excerpt: 'Implementing systems and processes for continuous compliance monitoring.',
    content: `
# Real-Time Compliance Monitoring for Hedge Funds

In today's regulatory environment, real-time compliance monitoring is no longer optional.

## Position Limits

Automated monitoring of:
- Sector exposure limits
- Single position concentration
- Leverage constraints

## Regulatory Requirements

Hedge funds must comply with:
- Form PF quarterly/annual filings
- Volcker Rule restrictions (if applicable)
- AIFMD requirements (EU managers)

## Risk Management Integration

Integrate compliance monitoring with risk management systems for comprehensive oversight.
    `,
    publishedAt: '2024-02-05',
    author: 'FundOps Team',
    readTime: '5 min read',
  },

  // Credit Fund Articles
  {
    slug: 'credit-fund-administration',
    title: 'Fund Administration for Credit Funds: Key Considerations',
    category: 'credit',
    excerpt: 'Understanding the unique operational requirements of credit fund administration.',
    content: `
# Fund Administration for Credit Funds: Key Considerations

Credit funds have unique administration needs compared to other fund types.

## Loan Tracking

Managing loan portfolios requires:
- Principal and interest tracking
- Amortization schedules
- Default monitoring

## Covenant Compliance

Credit funds must monitor:
- Borrower covenant compliance
- Fund-level investment restrictions
- Concentration limits

## Valuation Challenges

Credit instruments often require:
- Mark-to-model valuations
- Third-party valuation services
- Fair value determinations
    `,
    publishedAt: '2024-01-25',
    author: 'FundOps Team',
    readTime: '5 min read',
  },
  {
    slug: 'credit-risk-reporting',
    title: 'Risk Reporting Best Practices for Credit Funds',
    category: 'credit',
    excerpt: 'Essential metrics and reporting frameworks for credit fund risk management.',
    content: `
# Risk Reporting Best Practices for Credit Funds

Effective risk reporting is crucial for credit fund managers and their investors.

## Key Risk Metrics

Credit funds should track:
- Default rates and recovery rates
- Credit spread movements
- Portfolio duration and DV01

## Stress Testing

Regular stress testing scenarios:
- Interest rate shocks
- Credit spread widening
- Default cascades

## Investor Communication

Transparent risk reporting builds trust:
- Monthly risk reports
- Quarterly strategy updates
- Annual risk assessments
    `,
    publishedAt: '2024-02-15',
    author: 'FundOps Team',
    readTime: '6 min read',
  },
]
