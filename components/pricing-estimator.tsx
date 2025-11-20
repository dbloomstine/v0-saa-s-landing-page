"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Info, Calculator, TrendingUp, Shield, Users, Building2, BarChart3, FileText, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Form validation schema
const formSchema = z.object({
  fundType: z.string().min(1, "Please select a fund type"),
  aum: z.number().min(1).max(50000),
  investors: z.number().min(1).max(10000),
  funds: z.number().min(1).max(100),
  tradingFrequency: z.string().min(1, "Please select trading frequency"),
  regulatory: z.array(z.string()),
  reportingFrequency: z.string().min(1, "Please select reporting frequency"),
  additionalServices: z.array(z.string()),
  email: z.string().email().optional().or(z.literal("")),
})

type FormData = z.infer<typeof formSchema>

interface PricingResult {
  low: number
  medium: number
  high: number
  recommended: "low" | "medium" | "high"
}

export function PricingEstimator() {
  const [result, setResult] = useState<PricingResult | null>(null)
  const [aumValue, setAumValue] = useState(100)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aum: 100,
      investors: 50,
      funds: 1,
      regulatory: [],
      additionalServices: [],
      email: "",
    },
  })

  const watchedFundType = watch("fundType")
  const watchedTradingFrequency = watch("tradingFrequency")
  const watchedReportingFrequency = watch("reportingFrequency")
  const watchedRegulatory = watch("regulatory") || []
  const watchedAdditionalServices = watch("additionalServices") || []

  // AUM tiers and base pricing
  const getAumTier = (aum: number) => {
    if (aum < 10) return { tier: 1, base: 25000 }
    if (aum < 50) return { tier: 2, base: 50000 }
    if (aum < 100) return { tier: 3, base: 75000 }
    if (aum < 250) return { tier: 4, base: 100000 }
    if (aum < 500) return { tier: 5, base: 150000 }
    if (aum < 1000) return { tier: 6, base: 200000 }
    if (aum < 5000) return { tier: 7, base: 350000 }
    return { tier: 8, base: 500000 }
  }

  const calculatePricing = (data: FormData): PricingResult => {
    // Base pricing from AUM
    const aumTier = getAumTier(data.aum)
    let basePrice = aumTier.base

    // Fund type multiplier
    const fundTypeMultipliers: Record<string, number> = {
      hedge: 1.0,
      privateEquity: 0.9,
      ventureCapital: 0.85,
      realEstate: 0.8,
      fundOfFunds: 1.1,
    }
    const fundTypeMultiplier = fundTypeMultipliers[data.fundType] || 1.0

    // Investor complexity
    const investorMultiplier = 1 + (Math.min(data.investors, 500) / 1000)

    // Multiple funds
    const fundsMultiplier = 1 + ((data.funds - 1) * 0.15)

    // Trading frequency
    const tradingMultipliers: Record<string, number> = {
      low: 0.9,
      medium: 1.0,
      high: 1.2,
      veryHigh: 1.4,
    }
    const tradingMultiplier = tradingMultipliers[data.tradingFrequency] || 1.0

    // Regulatory complexity
    const regulatoryMultiplier = 1 + (data.regulatory.length * 0.1)

    // Reporting frequency
    const reportingMultipliers: Record<string, number> = {
      monthly: 1.2,
      quarterly: 1.0,
      annual: 0.85,
    }
    const reportingMultiplier = reportingMultipliers[data.reportingFrequency] || 1.0

    // Additional services
    const additionalServicesAdd = data.additionalServices.length * 15000

    // Calculate base medium price
    const mediumPrice = Math.round(
      basePrice *
        fundTypeMultiplier *
        investorMultiplier *
        fundsMultiplier *
        tradingMultiplier *
        regulatoryMultiplier *
        reportingMultiplier +
        additionalServicesAdd
    )

    // Calculate low and high ranges
    const lowPrice = Math.round(mediumPrice * 0.75)
    const highPrice = Math.round(mediumPrice * 1.35)

    // Determine recommended tier based on complexity
    const complexityScore =
      (data.investors > 100 ? 1 : 0) +
      (data.funds > 2 ? 1 : 0) +
      (data.tradingFrequency === "high" || data.tradingFrequency === "veryHigh" ? 1 : 0) +
      (data.regulatory.length > 2 ? 1 : 0) +
      (data.additionalServices.length > 2 ? 1 : 0)

    let recommended: "low" | "medium" | "high" = "medium"
    if (complexityScore <= 1) recommended = "low"
    if (complexityScore >= 4) recommended = "high"

    return {
      low: lowPrice,
      medium: mediumPrice,
      high: highPrice,
      recommended,
    }
  }

  const onSubmit = (data: FormData) => {
    const pricing = calculatePricing(data)
    setResult(pricing)

    // Scroll to results
    setTimeout(() => {
      document.getElementById("pricing-results")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatAumLabel = (value: number) => {
    if (value < 10) return `$${value}M`
    if (value < 1000) return `$${value}M`
    return `$${(value / 1000).toFixed(1)}B`
  }

  const InfoTooltip = ({ content }: { content: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="ml-2 h-4 w-4 inline-block cursor-help text-muted-foreground hover:text-foreground transition-colors" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  )

  return (
    <TooltipProvider delayDuration={200}>
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-1 bg-opacity-10 border border-gradient-1">
            <Calculator className="h-5 w-5" />
            <span className="text-sm font-medium">Pricing Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-1 bg-clip-text text-transparent">
            Fund Administration Pricing Estimator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get an instant estimate for your fund administration costs. Answer a few questions about your fund to receive customized pricing.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Fund Information
              </CardTitle>
              <CardDescription>
                Tell us about your fund structure and assets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Fund Type */}
              <div className="space-y-2">
                <Label htmlFor="fundType" className="flex items-center">
                  Fund Type
                  <InfoTooltip content="Select the primary type of investment fund you manage. This affects the complexity and regulatory requirements of administration." />
                </Label>
                <Select
                  value={watchedFundType}
                  onValueChange={(value) => setValue("fundType", value)}
                >
                  <SelectTrigger id="fundType">
                    <SelectValue placeholder="Select fund type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hedge">Hedge Fund</SelectItem>
                    <SelectItem value="privateEquity">Private Equity</SelectItem>
                    <SelectItem value="ventureCapital">Venture Capital</SelectItem>
                    <SelectItem value="realEstate">Real Estate Fund</SelectItem>
                    <SelectItem value="fundOfFunds">Fund of Funds</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fundType && (
                  <p className="text-sm text-destructive">{errors.fundType.message}</p>
                )}
              </div>

              {/* AUM Slider */}
              <div className="space-y-4">
                <Label htmlFor="aum" className="flex items-center">
                  Assets Under Management (AUM)
                  <InfoTooltip content="The total market value of assets that your fund manages on behalf of investors. This is typically the primary factor in administration pricing." />
                </Label>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">
                    {formatAumLabel(aumValue)}
                  </div>
                  <Slider
                    id="aum"
                    min={1}
                    max={10000}
                    step={1}
                    value={[aumValue]}
                    onValueChange={(values) => {
                      setAumValue(values[0])
                      setValue("aum", values[0])
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$1M</span>
                    <span>$500M</span>
                    <span>$1B</span>
                    <span>$5B</span>
                    <span>$10B+</span>
                  </div>
                </div>
              </div>

              {/* Number of Investors */}
              <div className="space-y-2">
                <Label htmlFor="investors" className="flex items-center">
                  Number of Investors
                  <InfoTooltip content="The total number of limited partners or investors in your fund. More investors typically require more investor relations work and reporting." />
                </Label>
                <Input
                  id="investors"
                  type="number"
                  min={1}
                  {...register("investors", { valueAsNumber: true })}
                  placeholder="e.g., 50"
                />
                {errors.investors && (
                  <p className="text-sm text-destructive">{errors.investors.message}</p>
                )}
              </div>

              {/* Number of Funds */}
              <div className="space-y-2">
                <Label htmlFor="funds" className="flex items-center">
                  Number of Funds
                  <InfoTooltip content="How many separate funds does your firm manage? Each fund requires separate accounting, reporting, and administration." />
                </Label>
                <Input
                  id="funds"
                  type="number"
                  min={1}
                  {...register("funds", { valueAsNumber: true })}
                  placeholder="e.g., 1"
                />
                {errors.funds && (
                  <p className="text-sm text-destructive">{errors.funds.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Operations & Complexity
              </CardTitle>
              <CardDescription>
                Help us understand your fund's operational requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Trading Frequency */}
              <div className="space-y-2">
                <Label htmlFor="tradingFrequency" className="flex items-center">
                  Trading Frequency
                  <InfoTooltip content="How often does your fund execute trades? Higher trading frequency requires more frequent reconciliation and position tracking." />
                </Label>
                <Select
                  value={watchedTradingFrequency}
                  onValueChange={(value) => setValue("tradingFrequency", value)}
                >
                  <SelectTrigger id="tradingFrequency">
                    <SelectValue placeholder="Select trading frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Monthly or less)</SelectItem>
                    <SelectItem value="medium">Medium (Weekly)</SelectItem>
                    <SelectItem value="high">High (Daily)</SelectItem>
                    <SelectItem value="veryHigh">Very High (Intraday/HFT)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tradingFrequency && (
                  <p className="text-sm text-destructive">{errors.tradingFrequency.message}</p>
                )}
              </div>

              {/* Regulatory Oversight */}
              <div className="space-y-3">
                <Label className="flex items-center">
                  Regulatory Oversight
                  <InfoTooltip content="Select all regulatory bodies that oversee your fund. Additional regulatory requirements increase compliance and reporting obligations." />
                </Label>
                <div className="space-y-2">
                  {[
                    { value: "sec", label: "SEC (Securities and Exchange Commission)" },
                    { value: "cftc", label: "CFTC (Commodity Futures Trading Commission)" },
                    { value: "finra", label: "FINRA" },
                    { value: "offshore", label: "Offshore Regulatory Authority" },
                    { value: "erisa", label: "ERISA Compliance" },
                  ].map((item) => (
                    <div key={item.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.value}
                        checked={watchedRegulatory.includes(item.value)}
                        onCheckedChange={(checked) => {
                          const current = watchedRegulatory || []
                          const updated = checked
                            ? [...current, item.value]
                            : current.filter((v) => v !== item.value)
                          setValue("regulatory", updated)
                        }}
                      />
                      <Label htmlFor={item.value} className="font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reporting Frequency */}
              <div className="space-y-2">
                <Label htmlFor="reportingFrequency" className="flex items-center">
                  Investor Reporting Frequency
                  <InfoTooltip content="How often do you provide financial statements and reports to your investors? More frequent reporting increases administrative workload." />
                </Label>
                <Select
                  value={watchedReportingFrequency}
                  onValueChange={(value) => setValue("reportingFrequency", value)}
                >
                  <SelectTrigger id="reportingFrequency">
                    <SelectValue placeholder="Select reporting frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
                {errors.reportingFrequency && (
                  <p className="text-sm text-destructive">{errors.reportingFrequency.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Additional Services
              </CardTitle>
              <CardDescription>
                Select any additional services you require
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { value: "tax", label: "Tax Preparation & Planning", desc: "K-1 preparation and tax planning services" },
                { value: "audit", label: "Audit Coordination", desc: "Coordination with external auditors" },
                { value: "portal", label: "Investor Portal", desc: "Secure online portal for investor access" },
                { value: "custom", label: "Custom Reporting", desc: "Tailored reports beyond standard requirements" },
                { value: "esg", label: "ESG Reporting", desc: "Environmental, Social, and Governance reporting" },
              ].map((item) => (
                <div key={item.value} className="flex items-start space-x-2">
                  <Checkbox
                    id={item.value}
                    checked={watchedAdditionalServices.includes(item.value)}
                    onCheckedChange={(checked) => {
                      const current = watchedAdditionalServices || []
                      const updated = checked
                        ? [...current, item.value]
                        : current.filter((v) => v !== item.value)
                      setValue("additionalServices", updated)
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor={item.value} className="font-medium cursor-pointer">
                      {item.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information (Optional)
              </CardTitle>
              <CardDescription>
                Receive a detailed breakdown via email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="your.email@fund.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  We'll send you a detailed pricing breakdown and service scope document.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button type="submit" size="lg" className="w-full md:w-auto px-12">
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Pricing
            </Button>
          </div>
        </form>

        {/* Results */}
        {result && (
          <div id="pricing-results" className="mt-16 space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Your Estimated Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Based on your inputs, here are three service tiers tailored to your fund's needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Low Tier */}
              <Card className={`relative ${result.recommended === "low" ? "border-2 border-primary shadow-lg" : ""}`}>
                {result.recommended === "low" && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-1 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>Essential</CardTitle>
                  <CardDescription>Core fund administration services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-2">{formatCurrency(result.low)}</div>
                    <div className="text-sm text-muted-foreground">per year</div>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>NAV calculations and financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Investor capital tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Quarterly investor reporting</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Basic compliance support</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant={result.recommended === "low" ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Medium Tier */}
              <Card className={`relative ${result.recommended === "medium" ? "border-2 border-primary shadow-lg" : ""}`}>
                {result.recommended === "medium" && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-2 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                  <CardDescription>Comprehensive administration services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-2">{formatCurrency(result.medium)}</div>
                    <div className="text-sm text-muted-foreground">per year</div>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <TrendingUp className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Everything in Essential, plus:</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Monthly investor reporting</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Enhanced compliance monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Performance analytics</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Phone & email support</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant={result.recommended === "medium" ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* High Tier */}
              <Card className={`relative ${result.recommended === "high" ? "border-2 border-primary shadow-lg" : ""}`}>
                {result.recommended === "high" && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-3 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>White-glove premium services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-2">{formatCurrency(result.high)}</div>
                    <div className="text-sm text-muted-foreground">per year</div>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Everything in Professional, plus:</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Custom reporting & analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Investor portal with self-service</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>CFO advisory services</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Priority 24/7 support</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>Dedicated service team</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant={result.recommended === "high" ? "default" : "outline"}>
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Scope of Services */}
            <Card className="mt-12 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Scope of Services
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of what's included in our fund administration services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Core Administration Services
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>• Net Asset Value (NAV) calculation</li>
                    <li>• Daily reconciliation of positions</li>
                    <li>• Cash management and reconciliation</li>
                    <li>• Capital call and distribution processing</li>
                    <li>• Investor onboarding and AML/KYC</li>
                    <li>• Subscription and redemption processing</li>
                    <li>• Financial statement preparation (GAAP/IFRS)</li>
                    <li>• Shadow accounting and reporting</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Reporting & Analytics
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>• Investor statements (monthly/quarterly)</li>
                    <li>• Performance reporting (returns, attribution)</li>
                    <li>• Management fee calculations</li>
                    <li>• Carry/performance fee calculations</li>
                    <li>• Custom investor reporting</li>
                    <li>• Board reporting packages</li>
                    <li>• Regulatory reporting (Form PF, AIFMD, etc.)</li>
                    <li>• Risk analytics and dashboards</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Compliance & Tax Support
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>• Compliance monitoring and alerts</li>
                    <li>• Regulatory filing coordination</li>
                    <li>• Audit preparation and support</li>
                    <li>• Tax package preparation</li>
                    <li>• K-1 and Schedule K generation</li>
                    <li>• FATCA/CRS compliance</li>
                    <li>• Document management system</li>
                    <li>• Policy and procedure documentation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Investor Services
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>• Investor inquiry response</li>
                    <li>• Secure investor portal access</li>
                    <li>• Document distribution</li>
                    <li>• Quarterly investor calls support</li>
                    <li>• Capital account statements</li>
                    <li>• Transfer agent services</li>
                    <li>• Side letter tracking and compliance</li>
                    <li>• Investor committee coordination</li>
                  </ul>
                </div>

                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> All pricing estimates are indicative and subject to final agreement.
                    Actual pricing may vary based on detailed due diligence and specific service requirements.
                    Contact us for a customized proposal tailored to your fund's unique needs.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">
                Schedule a consultation with our team to discuss your specific needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-1">
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline">
                  Download Detailed Proposal
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
