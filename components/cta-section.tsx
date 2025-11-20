import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial-1 opacity-20"></div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="relative mx-auto max-w-4xl rounded-2xl bg-gradient-1 px-8 py-16 text-center md:px-16 md:py-24 shadow-2xl shadow-primary/40 overflow-hidden">
          {/* Additional gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-2 opacity-30 mix-blend-overlay"></div>

          <div className="relative z-10">
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Ready to <span className="text-gradient-3">streamline</span> your workflow?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-white/95">
              Join thousands of teams who have already transformed their productivity with StreamLine. Start your free
              trial today—no credit card required.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="group gap-2 bg-white text-foreground hover:bg-white/90 hover:scale-105 transition-all shadow-lg"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/20 hover:scale-105 transition-all backdrop-blur"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
