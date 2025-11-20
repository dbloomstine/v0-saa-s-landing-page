import { Zap, Shield, BarChart3, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Automation",
    description: "Automate repetitive tasks in seconds with our intuitive workflow builder. No coding required.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "Your data is protected with SOC 2 Type II compliance, end-to-end encryption, and regular security audits.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Get actionable insights with powerful analytics and reporting tools. Track performance in real-time.",
  },
  {
    icon: Users,
    title: "Seamless Collaboration",
    description: "Work together effortlessly with shared workspaces, comments, and real-time updates for your team.",
  },
]

export function Features() {
  const gradients = ["bg-gradient-1", "bg-gradient-2", "bg-gradient-3", "bg-gradient-4"]
  const borderGradients = ["border-gradient-1", "border-gradient-2", "border-gradient-1", "border-gradient-2"]

  return (
    <section id="features" className="relative py-24 md:py-32">
      {/* Background gradient accents */}
      <div className="absolute inset-0 bg-gradient-radial-2 opacity-10"></div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-gradient-1">Everything you need</span> to succeed
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Powerful features designed to help teams work smarter, not harder.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`${borderGradients[index]} bg-card/80 backdrop-blur hover:shadow-2xl hover:shadow-primary/20 transition-all hover:scale-105 group`}>
              <CardContent className="p-8">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${gradients[index]} shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
