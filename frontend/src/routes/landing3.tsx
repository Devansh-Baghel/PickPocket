import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookmarkIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  TagIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  StarIcon,
  CheckIcon,
  HeartIcon,
  BoltIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { PocketIcon } from "@/utils/icons";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ThemeSelector } from "@/components/ThemeToggle";

export const Route = createFileRoute("/landing3")({
  component: LandingPage,
});

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

function AnimatedCounter({ end, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useTransform(useScroll().scrollYProgress, [0, 1], [0, end]);

  return (
    <motion.span
      ref={ref}
      className="tabular-nums"
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration }}
    >
      {isInView ? end : 0}
    </motion.span>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <motion.div className="absolute inset-0 -z-10" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <PocketIcon className="size-16 text-primary" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl md:text-8xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              PickPocket
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full border border-accent/30 mb-8"
          >
            <SparklesIcon className="size-4 text-primary" />
            <span className="text-sm font-medium">
              A Pocket Alternative That Doesn't Suck
            </span>
            <SparklesIcon className="size-4 text-secondary" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Save articles and read them{" "}
            <motion.span
              className="text-primary"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              distraction-free
            </motion.span>
            , anytime.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Built for developers and avid readers who deserve a clean, modern,
            and lightning-fast read-it-later experience. No clutter, no
            distractions—just pure reading bliss.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="px-8 py-4 text-lg font-semibold"
            >
              <Link to="/app">
                Start Reading Now
                <ArrowRightIcon className="size-5 ml-2" />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              <EyeIcon className="size-5 mr-2" />
              See Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { label: "Articles Saved", value: "10K+", icon: BookmarkIcon },
            { label: "Happy Readers", value: "500+", icon: UserGroupIcon },
            { label: "Reading Time Saved", value: "50K hrs", icon: ClockIcon },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.2, duration: 0.5 }}
              className="text-center"
            >
              <stat.icon className="size-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">
                <AnimatedCounter end={parseInt(stat.value)} />
                {stat.value.replace(/[0-9]/g, "")}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mx-auto mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: BoltIcon,
      title: "Lightning Fast",
      description:
        "Built with modern web technologies for instant article parsing and seamless reading experience.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: ShieldCheckIcon,
      title: "Privacy First",
      description:
        "Your reading data stays yours. No tracking, no ads, no data mining—just pure privacy.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Cross-Platform",
      description:
        "Read seamlessly across all your devices with responsive design and cloud sync.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: TagIcon,
      title: "Smart Organization",
      description:
        "Organize articles with tags, collections, and intelligent search. Find what you need instantly.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: GlobeAltIcon,
      title: "Universal Saving",
      description:
        "Save from any website, any device. Browser extension, mobile app, or direct URL input.",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      icon: HeartIcon,
      title: "Reading Focus",
      description:
        "Clean reader mode eliminates distractions. Customize fonts, themes, and reading experience.",
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
  ];

  return (
    <section ref={ref} className="py-32 bg-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Everything you need for a{" "}
            <span className="text-primary">perfect</span> reading experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've thought of everything so you can focus on what matters
            most—reading and learning.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-8">
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-2xl mb-6`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 },
                    }}
                  >
                    <feature.icon className={`size-8 ${feature.color}`} />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      number: "01",
      title: "Save Articles",
      description:
        "Copy any article URL and paste it into PickPocket. Or use our browser extension for one-click saves.",
      icon: BookmarkIcon,
    },
    {
      number: "02",
      title: "Smart Processing",
      description:
        "Our AI extracts the article content, removes clutter, and formats it for optimal reading.",
      icon: SparklesIcon,
    },
    {
      number: "03",
      title: "Read Beautifully",
      description:
        "Enjoy distraction-free reading with customizable themes, fonts, and reading modes.",
      icon: EyeIcon,
    },
  ];

  return (
    <section ref={ref} className="py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Three steps to reading bliss
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            It's so simple, you'll wonder why other read-it-later apps make it
            complicated.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }
              }
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col md:flex-row items-center gap-8 mb-20 last:mb-0"
            >
              <motion.div
                className={`flex-shrink-0 ${index % 2 === 1 ? "md:order-2" : ""}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <div className="w-32 h-32 bg-primary/10 rounded-3xl flex items-center justify-center">
                    <step.icon className="size-16 text-primary" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">
                      {step.number}
                    </span>
                  </div>
                </div>
              </motion.div>

              <div
                className={`flex-1 text-center md:text-left ${index % 2 === 1 ? "md:order-1" : ""}`}
              >
                <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppScreenshot() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-32 bg-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-4">
            Beautiful Interface
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Designed for <span className="text-primary">focus</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A clean, modern interface that gets out of your way so you can focus
            on reading.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 60 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.8, y: 60 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-3xl p-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl" />
            <div className="relative bg-background rounded-3xl p-8 shadow-2xl">
              {/* Mock app interface */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <PocketIcon className="size-8 text-primary" />
                    <span className="text-2xl font-bold">PickPocket</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>42 articles</Badge>
                    <div className="w-8 h-8 bg-primary rounded-full" />
                  </div>
                </div>

                {/* Article list */}
                <div className="space-y-4">
                  {[
                    "The Future of Web Development: A Deep Dive into Modern Frameworks",
                    "Understanding React Server Components and Their Impact",
                    "Building Scalable Applications with TypeScript and Next.js",
                  ].map((title, index) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: -50 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                      }
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors"
                    >
                      <div className="w-16 h-16 bg-primary/20 rounded-xl flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{title}</h4>
                        <p className="text-sm text-muted-foreground">
                          dev.to • 5 min read
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            JavaScript
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            React
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"
        animate={{
          background: [
            "linear-gradient(to bottom right, var(--primary)/10, var(--secondary)/10, var(--accent)/10)",
            "linear-gradient(to bottom right, var(--secondary)/10, var(--accent)/10, var(--primary)/10)",
            "linear-gradient(to bottom right, var(--accent)/10, var(--primary)/10, var(--secondary)/10)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-8"
          >
            <SparklesIcon className="size-20 text-primary" />
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
            Ready to transform your{" "}
            <span className="text-primary">reading experience</span>?
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Join thousands of readers who've already discovered the joy of
            distraction-free reading with PickPocket.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="px-12 py-6 text-xl font-bold"
              >
                <Link to="/app">
                  Start Your Reading Journey
                  <ArrowRightIcon className="size-6 ml-3" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckIcon className="size-4 text-green-500" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="size-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="size-4 text-green-500" />
              <span>Open source</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 bg-foreground/5 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <PocketIcon className="size-8 text-primary" />
              <span className="text-2xl font-bold">PickPocket</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              A read-it-later application that doesn't suck. Save articles and
              read them distraction-free, anytime.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline">Open Source</Badge>
              <Badge variant="outline">Privacy First</Badge>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  to="/app"
                  className="hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
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
                  href="#support"
                  className="hover:text-foreground transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="#about"
                  className="hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="hover:text-foreground transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">
            © {currentYear} PickPocket. Built with ❤️ for readers everywhere.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Add this section to the landing page
function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      content:
        "PickPocket has completely transformed how I consume technical articles. The clean reader mode is a game-changer.",
      avatar: "SC",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Lead",
      company: "Stripe",
      content:
        "Finally, a read-it-later app that respects my time and attention. No more distractions, just pure reading.",
      avatar: "MR",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Product Designer",
      company: "Figma",
      content:
        "The interface is beautifully crafted. It's clear that the developers understand what readers actually need.",
      avatar: "EJ",
      rating: 5,
    },
  ];

  return (
    <section ref={ref} className="py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Loved by <span className="text-primary">readers</span> worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our users have to say
            about their reading experience.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full p-8 border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="size-5 fill-current text-yellow-500"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-semibold text-primary">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Hero />
      <ThemeSelector />
      <Features />
      <HowItWorks />
      <AppScreenshot />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
