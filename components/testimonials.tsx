import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechCorp",
    content:
      "StreamLine has transformed how our team operates. We've saved over 20 hours per week on manual tasks and can now focus on innovation.",
    avatar: "/professional-woman-diverse.png",
    initials: "SC",
  },
  {
    name: "Michael Roberts",
    role: "Product Manager",
    company: "InnovateLabs",
    content:
      "The automation capabilities are incredible. Our deployment time decreased by 60% and team productivity has never been higher.",
    avatar: "/professional-man.jpg",
    initials: "MR",
  },
  {
    name: "Emily Thompson",
    role: "CTO",
    company: "DataFlow Systems",
    content:
      "Best investment we made this year. The ROI was clear within the first month, and the support team is outstanding.",
    avatar: "/professional-woman-executive.png",
    initials: "ET",
  },
]

export function Testimonials() {
  const borderGradients = ["border-gradient-1", "border-gradient-2", "border-gradient-1"]

  return (
    <section id="testimonials" className="relative bg-muted/30 py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-10"></div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-gradient-3">Loved by teams</span> worldwide
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Join thousands of companies already streamlining their workflows.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className={`${borderGradients[index]} bg-card/80 backdrop-blur hover:shadow-xl hover:shadow-primary/20 transition-all hover:scale-105 group`}>
              <CardContent className="p-8">
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent transition-all group-hover:fill-primary group-hover:text-primary" />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-card-foreground">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <Avatar className="ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-1 text-white">{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
