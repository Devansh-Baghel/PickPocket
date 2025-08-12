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
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import {
  DownloadIcon,
  UploadIcon,
  CheckCircleIcon,
  DatabaseBackupIcon,
  BookOpenIcon,
  // LockClosedIcon,
} from "lucide-react";
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated background */}
      <motion.div className="absolute inset-0 -z-10" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <motion.div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
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
          className="absolute top-3/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
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
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="mb-6 inline-flex items-center gap-3">
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
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-6xl font-black text-transparent md:text-8xl"
            >
              PickPocket
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/20 px-4 py-2"
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
          className="mx-auto mb-12 max-w-4xl"
        >
          <h2 className="mb-6 text-3xl leading-tight font-bold md:text-5xl">
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
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            Built for developers and avid readers who deserve a clean, modern,
            and lightning-fast read-it-later experience. No clutter, no
            distractions—just pure reading bliss.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="px-8 py-4 text-lg font-semibold"
            >
              <Link to="/app">
                Start Reading Now
                <ArrowRightIcon className="ml-2 size-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              <EyeIcon className="mr-2 size-5" />
              See Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3"
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
              <stat.icon className="mx-auto mb-2 size-8 text-primary" />
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-10 w-6 rounded-full border-2 border-foreground/30">
          <motion.div
            className="mx-auto mt-2 h-3 w-1 rounded-full bg-primary"
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
    <section ref={ref} className="bg-accent/5 py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            Everything you need for a{" "}
            <span className="text-primary">perfect</span> reading experience
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            We've thought of everything so you can focus on what matters
            most—reading and learning.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
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
              <Card className="h-full border-2 border-transparent transition-all duration-300 hover:border-primary/20">
                <CardContent className="p-8">
                  <motion.div
                    className={`inline-flex h-16 w-16 items-center justify-center ${feature.bgColor} mb-6 rounded-2xl`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 },
                    }}
                  >
                    <feature.icon className={`size-8 ${feature.color}`} />
                  </motion.div>
                  <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">
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
          className="mb-20 text-center"
        >
          <Badge variant="outline" className="mb-4">
            How It Works
          </Badge>
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            Three steps to reading bliss
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            It's so simple, you'll wonder why other read-it-later apps make it
            complicated.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
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
              className="mb-20 flex flex-col items-center gap-8 last:mb-0 md:flex-row"
            >
              <motion.div
                className={`flex-shrink-0 ${index % 2 === 1 ? "md:order-2" : ""}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-primary/10">
                    <step.icon className="size-16 text-primary" />
                  </div>
                  <div className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <span className="font-bold text-primary-foreground">
                      {step.number}
                    </span>
                  </div>
                </div>
              </motion.div>

              <div
                className={`flex-1 text-center md:text-left ${index % 2 === 1 ? "md:order-1" : ""}`}
              >
                <h3 className="mb-4 text-3xl font-bold">{step.title}</h3>
                <p className="text-xl leading-relaxed text-muted-foreground">
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
    <section ref={ref} className="bg-accent/5 py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <Badge variant="outline" className="mb-4">
            Beautiful Interface
          </Badge>
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            Designed for <span className="text-primary">focus</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
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
          className="relative mx-auto max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-foreground/5 to-foreground/10 p-1">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl" />
            <div className="relative rounded-3xl bg-background p-8 shadow-2xl">
              {/* Mock app interface */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border pb-6">
                  <div className="flex items-center gap-3">
                    <PocketIcon className="size-8 text-primary" />
                    <span className="text-2xl font-bold">PickPocket</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>42 articles</Badge>
                    <div className="h-8 w-8 rounded-full bg-primary" />
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
                      className="flex items-start gap-4 rounded-xl bg-accent/30 p-4 transition-colors hover:bg-accent/50"
                    >
                      <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-primary/20" />
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-semibold">{title}</h4>
                        <p className="text-sm text-muted-foreground">
                          dev.to • 5 min read
                        </p>
                        <div className="mt-2 flex items-center gap-2">
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
    <section ref={ref} className="relative overflow-hidden py-32">
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

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mb-8 inline-block"
          >
            <SparklesIcon className="size-20 text-primary" />
          </motion.div>

          <h2 className="mb-8 text-4xl leading-tight font-bold md:text-7xl">
            Ready to transform your{" "}
            <span className="text-primary">reading experience</span>?
          </h2>

          <p className="mx-auto mb-12 max-w-3xl text-xl text-muted-foreground">
            Join thousands of readers who've already discovered the joy of
            distraction-free reading with PickPocket.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="px-12 py-6 text-xl font-bold"
              >
                <Link to="/app">
                  Start Your Reading Journey
                  <ArrowRightIcon className="ml-3 size-6" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground"
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
    <footer className="border-t border-border bg-foreground/5 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <PocketIcon className="size-8 text-primary" />
              <span className="text-2xl font-bold">PickPocket</span>
            </div>
            <p className="mb-6 max-w-md text-muted-foreground">
              A read-it-later application that doesn't suck. Save articles and
              read them distraction-free, anytime.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline">Open Source</Badge>
              <Badge variant="outline">Privacy First</Badge>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  to="/app"
                  className="transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-foreground"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="transition-colors hover:text-foreground"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  className="transition-colors hover:text-foreground"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="#about"
                  className="transition-colors hover:text-foreground"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="transition-colors hover:text-foreground"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="transition-colors hover:text-foreground"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="transition-colors hover:text-foreground"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-muted-foreground">
            © {currentYear} PickPocket. Built with ❤️ for readers everywhere.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
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
          className="mb-20 text-center"
        >
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            Loved by <span className="text-primary">readers</span> worldwide
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Don't just take our word for it. Here's what our users have to say
            about their reading experience.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full border-2 border-transparent p-8 transition-all duration-300 hover:border-primary/20">
                <CardContent className="p-0">
                  <div className="mb-4 flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="size-5 fill-current text-yellow-500"
                      />
                    ))}
                  </div>
                  <blockquote className="mb-6 text-lg leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
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

function PocketMigration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const migrationSteps = [
    {
      step: "01",
      title: "Export from Pocket",
      description:
        "Export your data from Pocket as a CSV file - it takes just one click in your Pocket settings.",
      icon: DownloadIcon,
      detail: "Go to Settings → Export → Download CSV",
    },
    {
      step: "02",
      title: "Upload to PickPocket", 
      description:
        "Drag and drop your CSV file into PickPocket's import wizard - no manual data entry required.",
      icon: UploadIcon,
      detail: "Automatic parsing and validation",
    },
    {
      step: "03",
      title: "Enjoy Your Library",
      description:
        "All your articles, tags, and reading status are preserved exactly as they were in Pocket.",
      icon: CheckCircleIcon,
      detail: "Zero data loss, instant access",
    },
  ];

  const safetyFeatures = [
    {
      icon: ShieldCheckIcon,
      title: "100% Data Integrity",
      description:
        "Every article, tag, and reading status is preserved during migration",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: LockClosedIcon,
      title: "Private & Secure",
      description:
        "Your data never leaves your device during the import process",
      color: "text-blue-500", 
      bgColor: "bg-blue-500/10",
    },
    {
      icon: ClockIcon,
      title: "Instant Migration",
      description: "Import thousands of articles in under 60 seconds",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: DatabaseBackupIcon,
      title: "Keep Your Backup",
      description: "Your original Pocket data remains untouched and accessible",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <section ref={ref} className="py-32 bg-accent/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <PocketIcon className="size-12 text-orange-500" />
            </motion.div>
            <ArrowRightIcon className="size-6 text-muted-foreground" />
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="flex size-12 items-center justify-center rounded-2xl bg-primary/20"
            >
              <BookmarkIcon className="size-6 text-primary" />
            </motion.div>
          </motion.div>

          <Badge variant="outline" className="mb-4">
            <ShieldCheckIcon className="size-3 mr-1" />
            Seamless Migration
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Bring your <span className="text-primary">entire library</span> from Pocket
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Worried about losing your carefully curated reading list? Don't be.
            PickPocket makes it effortless to migrate all your Pocket saves—no data loss, no hassle.
          </p>
        </motion.div>

        {/* Safety Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {safetyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-2xl mb-4`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 },
                    }}
                  >
                    <feature.icon className={`size-8 ${feature.color}`} />
                  </motion.div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Migration Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Migration Process
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Three steps to reading bliss
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bring your entire Pocket library to PickPocket in minutes, not hours
          </p>
        </motion.div>

        {/* Vertical Timeline Layout */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-primary/20 rounded-full hidden md:block" />
            
            {migrationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.3 }}
                className="relative mb-16 last:mb-0"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background z-10 hidden md:block"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Content card */}
                <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Icon side */}
                  <motion.div
                    className="flex-1 flex justify-center md:justify-end"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="w-full max-w-md border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                      <CardContent className="p-8 text-center">
                        <motion.div
                          className="relative inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-6"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <step.icon className="size-10 text-primary" />
                          <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">
                              {step.step}
                            </span>
                          </div>
                        </motion.div>
                        <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {step.description}
                        </p>
                        <Badge variant="outline" className="bg-primary/5">
                          <CheckIcon className="size-3 mr-1" />
                          {step.detail}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  {/* Spacer for the other side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { label: "Articles Migrated", value: "10K+", icon: BookmarkIcon },
            { label: "Success Rate", value: "99.9%", icon: ShieldCheckIcon },
            { label: "Avg. Migration Time", value: "<60s", icon: ClockIcon },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + index * 0.2, duration: 0.5 }}
              className="text-center"
            >
              <stat.icon className="size-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">
                <AnimatedCounter end={parseInt(stat.value.replace(/[^0-9]/g, '') || '0')} />
                {stat.value.replace(/[0-9]/g, "")}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-20"
        >
          <Card className="max-w-4xl mx-auto border-2 border-primary/10 bg-primary/5">
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.4 }}
              >
                <blockquote className="text-lg mb-6 leading-relaxed italic">
                  "I was hesitant to switch from Pocket, but PickPocket's import
                  feature made it incredibly easy. All 2,847 of my saved articles
                  transferred perfectly with tags intact!"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-semibold text-primary">
                    SK
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Sarah K.</div>
                    <div className="text-sm text-muted-foreground">
                      Former Pocket User
                    </div>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="px-8 py-4 text-lg font-semibold">
              <Link to="/app" className="flex items-center gap-2">
                Start Your Migration Today
                <ArrowRightIcon className="size-5" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckIcon className="size-4 text-green-500" />
              <span>Free migration</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="size-4 text-green-500" />
              <span>No data loss</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="size-4 text-green-500" />
              <span>Complete in 5 minutes</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


function AIFeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const aiFeatures = [
    {
      icon: TagIcon,
      title: "Smart Auto-Tagging",
      description:
        "AI automatically categorizes and tags your articles for effortless organization and discovery.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: BookOpenIcon,
      title: "Article TL;DR",
      description:
        "Get instant AI-generated summaries of long articles to quickly decide what's worth your time.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: SparklesIcon,
      title: "AI Reading Voice",
      description:
        "Natural AI narration lets you listen to articles while commuting, exercising, or multitasking.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: MagnifyingGlassIcon,
      title: "Intelligent Search",
      description:
        "AI-powered search understands context and finds articles even when you can't remember exact keywords.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 py-32"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 left-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-10 bottom-20 h-40 w-40 rounded-full bg-secondary/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 text-primary"
          >
            ✨ AI-Powered (But Optional)
          </Badge>
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            <span className="text-primary">Smart</span> features when you want
            them, <span className="text-secondary">invisible</span> when you
            don't
          </h2>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-muted-foreground">
            PickPocket includes powerful AI features to supercharge your reading
            experience. But we respect your choice—disable all AI with{" "}
            <span className="font-semibold text-foreground">one click</span> for
            a completely minimal, distraction-free experience.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="h-full border-2 border-transparent bg-background/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/20">
                <CardContent className="p-8">
                  <motion.div
                    className={`inline-flex h-16 w-16 items-center justify-center ${feature.bgColor} mb-6 rounded-2xl`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 },
                    }}
                  >
                    <feature.icon className={`size-8 ${feature.color}`} />
                  </motion.div>
                  <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Privacy-First Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto max-w-4xl"
        >
          <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
              animate={{
                x: [-100, 100, -100],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <CardContent className="relative z-10 p-8 text-center md:p-12">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-6 inline-block"
              >
                <ShieldCheckIcon className="size-16 text-primary" />
              </motion.div>

              <h3 className="mb-4 text-3xl font-bold">
                Your Choice, Your Experience
              </h3>

              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                Love AI features? Great! Want a completely AI-free experience?
                Even better! Toggle <strong>"Disable All AI Features"</strong>{" "}
                in settings and PickPocket becomes a purely manual, minimal
                read-it-later app with zero AI processing.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex items-start gap-3 text-left">
                  <CheckIcon className="mt-1 size-5 flex-shrink-0 text-green-600" />
                  <div>
                    <h4 className="mb-1 font-semibold">Privacy Guaranteed</h4>
                    <p className="text-sm text-muted-foreground">
                      When AI is disabled, zero data is sent to AI services.
                      Period.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <CheckIcon className="mt-1 size-5 flex-shrink-0 text-green-600" />
                  <div>
                    <h4 className="mb-1 font-semibold">Clean Interface</h4>
                    <p className="text-sm text-muted-foreground">
                      AI buttons, suggestions, and features completely disappear
                      from the UI.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <CheckIcon className="mt-1 size-5 flex-shrink-0 text-green-600" />
                  <div>
                    <h4 className="mb-1 font-semibold">Instant Toggle</h4>
                    <p className="text-sm text-muted-foreground">
                      Switch between AI-powered and minimal modes anytime,
                      instantly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <CheckIcon className="mt-1 size-5 flex-shrink-0 text-green-600" />
                  <div>
                    <h4 className="mb-1 font-semibold">Full Functionality</h4>
                    <p className="text-sm text-muted-foreground">
                      All core features work perfectly without any AI
                      assistance.
                    </p>
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} className="mt-8">
                <Badge className="px-4 py-2 text-sm">
                  🎯 Perfect for minimalists who want zero AI interference
                </Badge>
              </motion.div>
            </CardContent>
          </Card>
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
      <PocketMigration />
      <AIFeaturesSection />
      {/* <ThemeSelector /> */}
      <Features />
      <HowItWorks />
      <AppScreenshot />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
