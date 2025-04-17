import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight, Play, ExternalLink, Upload, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95">
      <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-wrapper">
            <div className="container flex h-16 items-center gap-2 md:gap-4">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 65" fill="currentColor" className="h-5 w-5">
                        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                    </svg>
                    <span className="font-bold text-xl">Vercel</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Products
                    </Link>
                    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Solutions
                    </Link>
                    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Resources
                    </Link>
                    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Enterprise
                    </Link>
                    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Docs
                    </Link>
                    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Pricing
                    </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center gap-2">
                    <Link href="https://vercel.com/contact/sales" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-3 text-sm rounded-md border border-muted-foreground/20">
                        Contact
                    </Link>
                    <Link href="/builder" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-3 text-sm rounded-md border border-muted-foreground/20">
                        Start Building
                    </Link>
                    </nav>
                </div>
            </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-28 lg:py-36 bg-gradient-to-b from-black to-black/95 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
          <div className="absolute h-full w-full bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5"></div>
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-md">
                <span className="text-white/80">Introducing</span>
                <span className="ml-1 rounded-full bg-gradient-to-r from-teal-600 to-blue-900 px-2 py-0.5 text-xs font-semibold text-white">
                  NEW
                </span>
              </div>
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  Prompt Builder
                </h1>
                <p className="mx-auto max-w-[700px] text-white/80 text-xl md:text-2xl font-light">
                  Create AI-powered workflows visually, without code
                </p>
              </div>
              <p className="mx-auto max-w-[600px] text-white/60 text-lg">
                Design, test, and deploy AI solutions in minutes. Perfect for developers and business teams alike.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/builder">
                    <Button  className="h-12 px-8 rounded-full bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <svg width="76" height="65" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#000"/></svg>
                        Start Building
                    </Button>
                </Link>
                <Link target="_blank" href="https://x.com/rbadillap/status/1912516240708448537" className="h-12 px-8 rounded-full flex items-center justify-center bg-black text-white hover:bg-black/90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  Watch Demo in X
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        <section className="w-full py-20 md:py-28 lg:py-32 border-b border-border/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center py-1 text-md">
                  <span className="text-foreground/80">Workflow Generators</span>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                    Compose powerful AI workflows
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground text-lg">
                    Create complex automations with a variety of generators including text, images, speech, and more.
                    Chain them together with our intuitive visual interface.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Button className="h-11 px-8 rounded-md group">
                    Explore Generators
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[550px] overflow-hidden rounded-xl border border-border/40 bg-card/30 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center justify-between border-b border-border/40 bg-muted/30 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-muted-foreground">Prompt Builder</div>
                  </div>

                  <Image src="/demo.png" width={550} height={300} alt="Prompt Builder Demo" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-28 lg:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
          <div className="container relative px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <div className="inline-flex items-center rounded-full border border-border/40 bg-background/50 px-3 py-1 text-sm backdrop-blur-sm">
                <span className="text-foreground/80">Seamless Integration</span>
              </div>
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Run, Open, Deploy
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground text-lg">
                Seamlessly transition from building to deploying with our integrated toolchain
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-10 mt-16">
              <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/30 p-8 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:border-border/60 group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/50 relative">
                  <Play className="h-6 w-6" />
                </div>
                <div className="mt-6 space-y-4 relative">
                  <h3 className="text-xl font-bold">Run Workflow</h3>
                  <p className="text-muted-foreground">
                    Execute your workflow in real-time to see immediate results and make adjustments on the fly.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/30 p-8 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:border-border/60 group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/50 relative">
                  <ExternalLink className="h-6 w-6" />
                </div>
                <div className="mt-6 space-y-4 relative">
                  <h3 className="text-xl font-bold">Open in v0</h3>
                  <p className="text-muted-foreground">
                    Seamlessly open your workflow in v0 for advanced editing, collaboration, and fine-tuning.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/30 p-8 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:border-border/60 group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/50 relative">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="mt-6 space-y-4 relative">
                  <h3 className="text-xl font-bold">Deploy to Vercel</h3>
                  <p className="text-muted-foreground">
                    Deploy your workflow as an independent app in seconds using the Vercel Deployments API.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-28 lg:py-32 border-t border-border/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:grid-cols-2 items-center">
              <div className="flex items-center justify-center order-2 lg:order-1">
                <div className="relative w-full max-w-[550px] overflow-hidden rounded-xl border border-border/40 bg-card/30 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center justify-between border-b border-border/40 bg-muted/30 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-muted-foreground">Component Preview</div>
                  </div>
                  <Image src="/deploy.png" width={550} height={300} alt="Prompt Builder Deploy" />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center rounded-full border border-border/40 bg-muted/30 px-3 py-1 text-sm">
                  <span className="text-foreground/80">Automatic Generation</span>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                    Components & APIs on-the-fly
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground text-lg">
                    Prompt Builder automatically generates the necessary components and APIs for each node in your
                    workflow using React Server Components, ensuring optimal performance and seamless integration.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Button className="h-11 px-8 rounded-md group">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-b from-black to-black/95 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
          <div className="absolute h-full w-full bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5"></div>
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-md">
                <span className="text-white/80">Deployment</span>
              </div>
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  Deploy in Seconds
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 text-lg">
                  Prompt Builder uses the Vercel Deployments API to deploy and claim a Next.js app in seconds, with zero
                  configuration required.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-4 mt-4">
                <Link href="/builder">
                    <Button className="w-full h-12 rounded-md bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    Start Building Now
                    </Button>
                </Link>
                <p className="text-sm text-white/60">No credit card required.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 65" fill="currentColor" className="h-4 w-4">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vercel Inc. All rights reserved.
            </p>
          </div>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
