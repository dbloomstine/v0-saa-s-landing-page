import Link from "next/link"
import { Facebook, Twitter, Linkedin, Github } from "lucide-react"

export function Footer() {
  const socialGradients = ["bg-gradient-1", "bg-gradient-2", "bg-gradient-3", "bg-gradient-4"]

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-1 shadow-md shadow-primary/20 transition-all group-hover:shadow-lg group-hover:shadow-primary/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-white"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gradient-1">StreamLine</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Empowering teams to work smarter with intelligent automation and seamless collaboration tools.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-1 text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-110"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-2 text-white shadow-md shadow-accent/20 transition-all hover:shadow-lg hover:shadow-accent/30 hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-3 text-white shadow-md shadow-secondary/20 transition-all hover:shadow-lg hover:shadow-secondary/30 hover:scale-110"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-4 text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-110"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gradient-1">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-1">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-1">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-1">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-1">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gradient-2">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-2">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-2">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-2">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-2">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gradient-3">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-3">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-3">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-3">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-gradient-3">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground md:flex md:items-center md:justify-between md:text-left">
          <p>© 2025 StreamLine. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6 md:mt-0">
            <Link href="#" className="transition-colors hover:text-gradient-1">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-gradient-2">
              Terms of Service
            </Link>
            <Link href="#" className="transition-colors hover:text-gradient-3">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
