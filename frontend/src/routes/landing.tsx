// frontend/src/routes/index.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookmarkIcon,
  StarIcon,
  ArchiveIcon,
  SearchIcon,
  PaletteIcon,
  TypeIcon,
  HighlighterIcon,
  ImportIcon,
  ShieldIcon,
  ZapIcon,
  HeartIcon,
  TrendingUpIcon,
  CheckIcon,
  ArrowRightIcon,
  PlayIcon,
  GithubIcon,
  TwitterIcon,
  DownloadIcon,
  ExternalLinkIcon,
  UserIcon,
  ClockIcon,
  TabletIcon,
} from "lucide-react";
import { IoIosDesktop as DesktopIcon } from "react-icons/io";
import { CiMobile3 as MobileIcon } from "react-icons/ci";
import { PocketIcon } from "@/utils/icons";
import { ThemeSelector } from "@/components/ThemeToggle";

export const Route = createFileRoute("/landing")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Screenshots */}
      <ScreenshotsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Pricing */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PocketIcon className="size-8 text-primary" />
            <span className="text-2xl font-bold">PickPocket</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="https://github.com/username/pickpocket"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/app/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/app">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            🚀 Open Source & Self-Hostable
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Save. Read. Remember.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            The read-it-later app that doesn't suck. Save articles from
            anywhere, read in a beautiful interface, and never lose track of
            great content again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/app" className="flex items-center gap-2">
                Get Started Free
                <ArrowRightIcon className="size-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 flex items-center gap-2"
            >
              <PlayIcon className="size-5" />
              Watch Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckIcon className="size-4 text-green-500" />
              Import from Pocket
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="size-4 text-green-500" />
              Beautiful Themes
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="size-4 text-green-500" />
              Highlights & Notes
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="size-4 text-green-500" />
              Privacy First
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: BookmarkIcon,
      title: "Save Anything",
      description:
        "One-click saving from any website. Browser extension, mobile app, or just paste the URL.",
      color: "text-blue-500",
    },
    {
      icon: PaletteIcon,
      title: "Beautiful Themes",
      description:
        "15+ carefully crafted themes including Nord, Dracula, and Catppuccin. Dark mode, light mode, everything.",
      color: "text-purple-500",
    },
    {
      icon: TypeIcon,
      title: "Reading Experience",
      description:
        "Distraction-free reading with customizable fonts, spacing, and reader modes for maximum focus.",
      color: "text-green-500",
    },
    {
      icon: HighlighterIcon,
      title: "Highlights & Notes",
      description:
        "Highlight important parts and add notes. All searchable and organized for easy reference.",
      color: "text-yellow-500",
    },
    {
      icon: ImportIcon,
      title: "Import from Pocket",
      description:
        "Seamlessly migrate your entire Pocket library with one CSV upload. No data left behind.",
      color: "text-orange-500",
    },
    {
      icon: SearchIcon,
      title: "Powerful Search",
      description:
        "Find anything instantly with full-text search across titles, content, highlights, and tags.",
      color: "text-red-500",
    },
    {
      icon: TrendingUpIcon,
      title: "Reading Stats",
      description:
        "Track your reading habits, streaks, and discover patterns in your consumption.",
      color: "text-indigo-500",
    },
    {
      icon: ShieldIcon,
      title: "Privacy First",
      description:
        "Your data stays yours. Self-host or use our secure cloud. No tracking, no ads, no nonsense.",
      color: "text-cyan-500",
    },
  ];

  return (
    <section id="features" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to read better
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            PickPocket combines the best features of modern read-it-later apps
            with a focus on design and user experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50 hover:border-border"
            >
              <CardContent className="p-6">
                <div
                  className={`${feature.color} mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="size-8" />
                </div>
                <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      title: "Save Articles",
      description:
        "Add articles from any website using our browser extension, mobile app, or by pasting URLs directly.",
      icon: BookmarkIcon,
    },
    {
      step: "2",
      title: "Organize & Tag",
      description:
        "Automatically categorize articles or create custom tags. Import your existing Pocket library instantly.",
      icon: ArchiveIcon,
    },
    {
      step: "3",
      title: "Read & Highlight",
      description:
        "Enjoy distraction-free reading with customizable themes and fonts. Highlight important passages.",
      icon: HighlighterIcon,
    },
    {
      step: "4",
      title: "Search & Discover",
      description:
        "Find any article instantly with powerful search. Track your reading stats and build better habits.",
      icon: TrendingUpIcon,
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How PickPocket Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Four simple steps to transform your reading experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <step.icon className="size-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 size-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-lg">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScreenshotsSection() {
  return (
    <section className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Beautiful on Every Device
          </h2>
          <p className="text-xl text-muted-foreground">
            Responsive design that works perfectly on desktop, tablet, and
            mobile
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-background rounded-xl p-8 shadow-lg mb-4 aspect-[4/3] flex items-center justify-center border">
              <DesktopIcon className="size-24 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Desktop Experience</h3>
            <p className="text-muted-foreground text-sm">
              Full-featured interface with sidebar navigation and powerful
              keyboard shortcuts
            </p>
          </div>

          <div className="text-center">
            <div className="bg-background rounded-xl p-8 shadow-lg mb-4 aspect-[4/3] flex items-center justify-center border">
              <TabletIcon className="size-24 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Tablet Optimized</h3>
            <p className="text-muted-foreground text-sm">
              Touch-friendly interface that adapts beautifully to tablet screens
            </p>
          </div>

          <div className="text-center">
            <div className="bg-background rounded-xl p-8 shadow-lg mb-4 aspect-[4/3] flex items-center justify-center border">
              <MobileIcon className="size-24 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Mobile First</h3>
            <p className="text-muted-foreground text-sm">
              Native mobile experience with gestures and offline reading support
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2 mx-auto"
          >
            <ExternalLinkIcon className="size-5" />
            View Live Demo
          </Button>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      avatar: "SC",
      content:
        "Finally, a read-it-later app that actually makes me want to read. The themes are gorgeous and the reading experience is unmatched.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Software Engineer",
      avatar: "MR",
      content:
        "Migrated from Pocket in minutes. The import feature worked flawlessly and I love having control over my data with self-hosting.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Content Writer",
      avatar: "EW",
      content:
        "The highlighting and search features have transformed how I research. I can find any article or quote instantly.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Readers Everywhere
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of people who've transformed their reading habits
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="size-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Free</h3>
                <div className="text-3xl font-bold mb-4">
                  $0
                  <span className="text-lg font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Perfect for getting started
                </p>

                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    Up to 100 saved articles
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    All themes & fonts
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    Highlights & notes
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    Mobile apps
                  </li>
                </ul>

                <Button className="w-full" asChild>
                  <Link to="/app">Get Started</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-primary shadow-lg relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            </div>
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <div className="text-3xl font-bold mb-4">
                  $5
                  <span className="text-lg font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground mb-6">
                  For serious readers
                </p>

                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    Unlimited saved articles
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    Advanced search & filters
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    Reading analytics
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    Export to PDF/EPUB
                  </li>
                </ul>

                <Button className="w-full" asChild>
                  <Link to="/app">Start Free Trial</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Self-Hosted */}
          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Self-Hosted</h3>
                <div className="text-3xl font-bold mb-4">
                  Free
                  <span className="text-lg font-normal text-muted-foreground">
                    {" "}
                    forever
                  </span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Complete control & privacy
                </p>

                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    All Pro features
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    Your own server
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    Complete data ownership
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckIcon className="size-4 text-green-500" />
                    Custom modifications
                  </li>
                </ul>

                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  asChild
                >
                  <a href="https://github.com/username/pickpocket">
                    <GithubIcon className="size-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "How do I import my articles from Pocket?",
      answer:
        "Simply export your data from Pocket as a CSV file and upload it to PickPocket. We'll import all your articles, tags, and reading status automatically.",
    },
    {
      question: "Can I use PickPocket offline?",
      answer:
        "Yes! PickPocket works offline on mobile devices. Your saved articles are cached locally and sync when you're back online.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use industry-standard encryption, and you can even self-host PickPocket for complete control over your data.",
    },
    {
      question: "Do you have browser extensions?",
      answer:
        "Yes, we have extensions for Chrome, Firefox, Safari, and Edge that let you save articles with a single click.",
    },
    {
      question: "Can I customize the reading experience?",
      answer:
        "Definitely! Choose from 15+ themes, multiple font options, adjust text size, line spacing, and more to create your perfect reading environment.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about PickPocket
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Reading?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of readers who've made the switch to PickPocket.
            Start your free trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/app" className="flex items-center gap-2">
                Start Free Trial
                <ArrowRightIcon className="size-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 flex items-center gap-2"
              asChild
            >
              <a href="https://github.com/username/pickpocket">
                <GithubIcon className="size-5" />
                View Source Code
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <PocketIcon className="size-6 text-primary" />
              <span className="text-xl font-bold">PickPocket</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The read-it-later app that doesn't suck. Save, organize, and enjoy
              your articles with the best reading experience.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-foreground transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/app"
                  className="hover:text-foreground transition-colors"
                >
                  Get Started
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Browser Extensions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Self-Hosting Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/username/pickpocket"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/pickpocket"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <TwitterIcon className="size-4" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 PickPocket. Open source and made with ❤️
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
