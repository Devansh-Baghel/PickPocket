// src/routes/landing3.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  PlayIcon,
  CodeBracketIcon,
  ChartBarIcon,
  CpuChipIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import { PocketIcon } from "@/utils/icons";

export const Route = createFileRoute("/landing4")({
  component: LandingPage,
});

// Custom hooks for advanced animations
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Interactive Background Component
function InteractiveBackground() {
  const mousePosition = useMousePosition();
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs that follow mouse */}
      <motion.div
        className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x / 50,
          y: mousePosition.y / 50,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        style={{
          left: "20%",
          top: "20%",
        }}
      />

      <motion.div
        className="absolute w-64 h-64 bg-secondary/20 rounded-full blur-2xl"
        animate={{
          x: -mousePosition.x / 30,
          y: -mousePosition.y / 30,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 40 }}
        style={{
          right: "20%",
          bottom: "20%",
        }}
      />

      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 4 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
    </div>
  );
}

// Enhanced Hero Section
function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const [currentWord, setCurrentWord] = useState(0);
  const words = ["developers", "readers", "researchers", "writers", "students"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity, scale }}>
        <InteractiveBackground />
      </motion.div>

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8"
        >
          {/* Floating badges */}
          <div className="relative inline-block mb-8">
            <motion.div
              className="absolute -top-8 -right-8 z-10"
              variants={floatingVariants}
              animate="animate"
            >
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-4 py-2">
                ⚡ Lightning Fast
              </Badge>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-8 z-10"
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 0.5 }}
            >
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-4 py-2">
                🔒 Privacy First
              </Badge>
            </motion.div>

            {/* Main logo with advanced animations */}
            <div className="inline-flex items-center gap-4 mb-8">
              <motion.div
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <PocketIcon className="size-20 text-primary drop-shadow-2xl" />
                <motion.div
                  className="absolute inset-0 size-20"
                  animate={{
                    background: [
                      "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)",
                      "radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)",
                      "radial-gradient(circle, rgba(249,115,22,0.5) 0%, transparent 70%)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-7xl md:text-9xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              >
                PickPocket
              </motion.h1>
            </div>

            {/* Animated tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20 mb-12 backdrop-blur-sm"
            >
              <SparklesIcon className="size-5 text-primary animate-pulse" />
              <span className="text-lg font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                The read-it-later app that doesn't suck
              </span>
              <SparklesIcon className="size-5 text-secondary animate-pulse" />
            </motion.div>
          </div>
        </motion.div>

        {/* Dynamic headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-bold leading-tight mb-8">
            Save articles and read them{" "}
            <span className="relative">
              <motion.span
                className="text-primary"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                distraction-free
              </motion.span>
              <motion.div
                className="absolute -inset-2 bg-primary/20 rounded-lg -z-10"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
            , anytime.
          </h2>

          <div className="text-2xl text-muted-foreground mb-4">
            Built for{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-primary font-semibold"
              >
                {words[currentWord]}
              </motion.span>
            </AnimatePresence>{" "}
            who deserve better than basic bookmarking.
          </div>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Lightning-fast article parsing, beautiful reading experience,
            powerful organization tools, and complete privacy control. This is
            how read-it-later should work.
          </p>
        </motion.div>

        {/* Enhanced CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"
              animate={{
                background: [
                  "linear-gradient(45deg, var(--primary), var(--secondary))",
                  "linear-gradient(225deg, var(--primary), var(--secondary))",
                  "linear-gradient(45deg, var(--primary), var(--secondary))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Button
              asChild
              size="lg"
              className="relative px-12 py-6 text-xl font-bold bg-gradient-to-r from-primary to-secondary text-white border-0"
            >
              <Link to="/app">
                <RocketLaunchIcon className="size-6 mr-3" />
                Launch PickPocket
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-lg"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="px-12 py-6 text-xl backdrop-blur-sm"
            >
              <PlayIcon className="size-6 mr-3" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated stats */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              label: "Articles Parsed",
              value: "50K+",
              icon: BookmarkIcon,
              color: "text-blue-500",
            },
            {
              label: "Active Users",
              value: "2.5K+",
              icon: UserGroupIcon,
              color: "text-green-500",
            },
            {
              label: "Time Saved",
              value: "100K hrs",
              icon: ClockIcon,
              color: "text-purple-500",
            },
            {
              label: "Themes Available",
              value: "15+",
              icon: SparklesIcon,
              color: "text-orange-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-3">
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
                <stat.icon className={`size-8 ${stat.color} relative z-10`} />
              </div>
              <div className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full relative">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mx-auto mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Scroll to explore</p>
      </motion.div>
    </section>
  );
}

// Enhanced Features Section with Interactive Cards
function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    {
      icon: BoltIcon,
      title: "Lightning Fast Parsing",
      description:
        "Extract clean article content from any website in milliseconds. Our advanced parsing engine handles complex layouts, removes ads, and preserves formatting perfectly.",
      color: "from-yellow-400 to-orange-500",
      bgColor:
        "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
      stats: "< 200ms average",
      demo: "99.9% success rate",
    },
    {
      icon: ShieldCheckIcon,
      title: "Privacy by Design",
      description:
        "Your reading data stays completely private. No tracking, no analytics, no data mining. Self-host or use our encrypted cloud with zero-knowledge architecture.",
      color: "from-green-400 to-emerald-500",
      bgColor:
        "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      stats: "Zero tracking",
      demo: "End-to-end encrypted",
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Universal Sync",
      description:
        "Read seamlessly across all your devices. Real-time sync, offline reading, progressive web app, and native mobile experience that feels buttery smooth.",
      color: "from-blue-400 to-cyan-500",
      bgColor:
        "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      stats: "5 platforms",
      demo: "Instant sync",
    },
    {
      icon: LightBulbIcon,
      title: "Smart Organization",
      description:
        "AI-powered tagging, collections, full-text search, and intelligent recommendations. Find any article instantly with our advanced search algorithms.",
      color: "from-purple-400 to-pink-500",
      bgColor:
        "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      stats: "ML-powered",
      demo: "Sub-second search",
    },
    {
      icon: GlobeAltIcon,
      title: "Universal Capture",
      description:
        "Save from anywhere with our browser extension, mobile apps, email forwarding, API integration, and even voice commands. Never miss great content again.",
      color: "from-indigo-400 to-purple-500",
      bgColor:
        "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
      stats: "10+ methods",
      demo: "One-click save",
    },
    {
      icon: HeartIcon,
      title: "Reading Bliss",
      description:
        "Distraction-free reader with customizable fonts, themes, reading progress, highlights, notes, and focus mode. Reading the way it should be.",
      color: "from-rose-400 to-pink-500",
      bgColor:
        "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20",
      stats: "15+ themes",
      demo: "Perfect typography",
    },
  ];

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-6 text-lg px-4 py-2">
            ✨ Features That Matter
          </Badge>

          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Everything you need for{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              perfect reading
            </span>
          </h2>

          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We've obsessed over every detail so you can focus on what matters
            most—reading and learning from the world's best content.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              <Card
                className={`h-full border-2 border-transparent hover:border-primary/20 transition-all duration-500 ${feature.bgColor} backdrop-blur-sm`}
              >
                <CardContent className="p-8 relative overflow-hidden">
                  {/* Gradient background that moves on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    whileHover={{
                      background: `linear-gradient(45deg, ${feature.color})`,
                    }}
                  />

                  {/* Icon with advanced animations */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-0.5`}
                    >
                      <div className="flex items-center justify-center w-full h-full bg-white dark:bg-gray-900 rounded-2xl">
                        <feature.icon
                          className={`size-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                        />
                      </div>
                    </div>

                    {/* Floating badge */}
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Badge
                        className={`bg-gradient-to-r ${feature.color} text-white text-xs px-2 py-1`}
                      >
                        {feature.stats}
                      </Badge>
                    </motion.div>
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {feature.demo}
                    </Badge>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRightIcon className="size-5" />
                    </motion.div>
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

// New Interactive Demo Section
function InteractiveDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTheme, setActiveTheme] = useState("solar");

  const themes = [
    { name: "Solar", key: "solar", colors: ["#f59e0b", "#f97316"] },
    { name: "Midnight", key: "midnight", colors: ["#3b82f6", "#6366f1"] },
    { name: "Forest", key: "forest", colors: ["#10b981", "#059669"] },
    { name: "Rose", key: "rose", colors: ["#f43f5e", "#ec4899"] },
  ];

  return (
    <section
      ref={ref}
      className="py-32 bg-gradient-to-b from-background to-accent/10"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            Experience the <span className="text-primary">magic</span> yourself
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Try our theme system and see how beautiful reading can be
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Theme Selector */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-muted rounded-xl">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.key}
                    onClick={() => setActiveTheme(theme.key)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTheme === theme.key
                        ? "bg-background shadow-lg text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: `linear-gradient(45deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                        }}
                      />
                      {theme.name}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Interactive Demo */}
            <motion.div
              key={activeTheme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-card to-muted/50 rounded-3xl p-8 border shadow-2xl backdrop-blur-sm"
            >
              <div className="space-y-6">
                {/* Mock Article Header */}
                <div className="flex items-center justify-between pb-6 border-b">
                  <div className="flex items-center gap-3">
                    <PocketIcon className="size-8 text-primary" />
                    <span className="text-xl font-bold">Article Reader</span>
                  </div>
                  <div className="flex gap-2">
                    {themes
                      .find((t) => t.key === activeTheme)
                      ?.colors.map((color, i) => (
                        <motion.div
                          key={i}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                  </div>
                </div>

                {/* Mock Article Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">
                    The Future of Reading is Here
                  </h3>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-xl animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-primary/20 rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-primary/10 rounded w-1/2 animate-pulse" />
                      <div className="h-4 bg-primary/20 rounded w-2/3 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Statistics Section
function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    {
      number: "50,000+",
      label: "Articles Parsed",
      icon: BookmarkIcon,
      description: "Lightning-fast extraction",
    },
    {
      number: "2,500+",
      label: "Happy Users",
      icon: UserGroupIcon,
      description: "Across 50+ countries",
    },
    {
      number: "100K+",
      label: "Hours Saved",
      icon: ClockIcon,
      description: "From distraction-free reading",
    },
    {
      number: "99.9%",
      label: "Success Rate",
      icon: ChartBarIcon,
      description: "Parse accuracy",
    },
    {
      number: "15+",
      label: "Beautiful Themes",
      icon: SparklesIcon,
      description: "Crafted by designers",
    },
    {
      number: "<200ms",
      label: "Parse Time",
      icon: BoltIcon,
      description: "Average extraction speed",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-32 bg-gradient-to-b from-primary/5 via-background to-secondary/5"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">
            Trusted by thousands of{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              power readers
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join a community that's already transformed their reading habits
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="text-center group"
            >
              <Card className="p-6 h-full border-2 border-transparent hover:border-primary/20 transition-all duration-500 bg-gradient-to-b from-card to-card/50 backdrop-blur-sm">
                <CardContent className="p-0 space-y-4">
                  <motion.div
                    className="relative inline-block"
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                    <stat.icon className="size-8 text-primary relative z-10" />
                  </motion.div>

                  <div>
                    <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {stat.number}
                    </div>
                    <div className="font-medium text-sm mb-1">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {stat.description}
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

// Comparison Section
function Comparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const comparisons = [
    {
      feature: "Parse Speed",
      pickpocket: "< 200ms",
      competitors: "2-5 seconds",
      advantage: true,
    },
    {
      feature: "Privacy",
      pickpocket: "Zero tracking",
      competitors: "Extensive analytics",
      advantage: true,
    },
    {
      feature: "Themes",
      pickpocket: "15+ premium",
      competitors: "2-3 basic",
      advantage: true,
    },
    {
      feature: "Offline Reading",
      pickpocket: "Full support",
      competitors: "Limited",
      advantage: true,
    },
    {
      feature: "API Access",
      pickpocket: "Full REST API",
      competitors: "None/Limited",
      advantage: true,
    },
    {
      feature: "Open Source",
      pickpocket: "Yes",
      competitors: "No",
      advantage: true,
    },
  ];

  return (
    <section ref={ref} className="py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            Why choose <span className="text-primary">PickPocket</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            See how we compare to other read-it-later apps
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden border-2">
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b">
                <div className="font-bold text-lg">Feature</div>
                <div className="font-bold text-lg text-center">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    PickPocket
                  </span>
                </div>
                <div className="font-bold text-lg text-center text-muted-foreground">
                  Others
                </div>
              </div>

              {/* Comparison Rows */}
              {comparisons.map((item, index) => (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: -50 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="grid grid-cols-3 p-6 border-b last:border-b-0 hover:bg-accent/5 transition-colors"
                >
                  <div className="font-medium">{item.feature}</div>

                  <div className="text-center">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                      {item.pickpocket}
                    </Badge>
                  </div>

                  <div className="text-center">
                    <Badge variant="outline" className="text-muted-foreground">
                      {item.competitors}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Enhanced Testimonials
function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      company: "Google",
      content:
        "PickPocket has completely transformed how I consume technical articles. The parsing is incredibly fast, and the reading experience is simply unmatched. I can focus on learning instead of fighting with cluttered interfaces.",
      avatar: "SC",
      rating: 5,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Lead",
      company: "Stripe",
      content:
        "Finally, a read-it-later app that respects my time and attention. The privacy-first approach and lightning-fast sync across devices makes this indispensable for my daily workflow.",
      avatar: "MR",
      rating: 5,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "Emily Johnson",
      role: "Product Designer",
      company: "Figma",
      content:
        "The attention to design detail is extraordinary. Every theme is carefully crafted, the typography is perfect, and the reading experience feels luxurious. This is how software should be built.",
      avatar: "EJ",
      rating: 5,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Alex Thompson",
      role: "Research Scientist",
      company: "DeepMind",
      content:
        "I read 50+ research papers weekly, and PickPocket's organization features and search capabilities are game-changing. The highlighting and note system helps me connect ideas across papers effortlessly.",
      avatar: "AT",
      rating: 5,
      gradient: "from-orange-500 to-red-500",
    },
    {
      name: "Lisa Park",
      role: "Content Strategist",
      company: "Notion",
      content:
        "The seamless import from Pocket saved me hours of manual work. Now I have all my articles in a beautiful, fast interface that actually makes me want to read more.",
      avatar: "LP",
      rating: 5,
      gradient: "from-teal-500 to-blue-500",
    },
    {
      name: "David Kim",
      role: "Developer Advocate",
      company: "Vercel",
      content:
        "Open source, privacy-focused, and incredibly well-executed. The API integration options make it perfect for power users who want to build custom workflows around their reading habits.",
      avatar: "DK",
      rating: 5,
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-32 bg-gradient-to-b from-background via-accent/5 to-background overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-6 text-lg px-4 py-2">
            💬 What Users Say
          </Badge>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              power readers
            </span>{" "}
            worldwide
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands who've transformed their reading experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="h-full p-8 border-2 border-transparent hover:border-primary/20 transition-all duration-500 bg-gradient-to-b from-card to-card/80 backdrop-blur-sm relative overflow-hidden">
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <CardContent className="p-0 relative z-10">
                  {/* Rating stars */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={
                          isInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0 }
                        }
                        transition={{
                          duration: 0.3,
                          delay: 0.5 + index * 0.1 + i * 0.1,
                        }}
                      >
                        <StarIcon className="size-5 fill-current text-yellow-500" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial content */}
                  <blockquote className="text-lg mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center font-semibold text-white`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {testimonial.avatar}
                    </motion.div>

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

// Enhanced FAQ Section
function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How fast is PickPocket compared to other read-it-later apps?",
      answer:
        "PickPocket parses articles in under 200ms on average, which is 10-25x faster than competitors. Our advanced parsing engine is built from the ground up for speed and accuracy.",
    },
    {
      question: "Is my reading data truly private?",
      answer:
        "Absolutely. We use zero-knowledge architecture, which means even we can't see your reading data. No tracking, no analytics, no data mining. You can also self-host for complete control.",
    },
    {
      question: "Can I import my existing Pocket library?",
      answer:
        "Yes! Our one-click import tool can migrate your entire Pocket library in minutes, preserving your tags, reading status, and favorites. The process is seamless and reliable.",
    },
    {
      question: "What makes the reading experience better?",
      answer:
        "15+ carefully crafted themes, customizable typography, distraction-free reader mode, highlights, notes, reading progress tracking, and focus mode. Every detail is designed for reading bliss.",
    },
    {
      question: "Do you have mobile apps?",
      answer:
        "Yes! We have native iOS and Android apps, plus a PWA that works offline. Real-time sync ensures your articles are always available across all your devices.",
    },
    {
      question: "Is PickPocket open source?",
      answer:
        "Yes! PickPocket is fully open source under GPL-3.0 license. You can self-host, contribute, or build custom integrations using our comprehensive API.",
    },
  ];

  return (
    <section ref={ref} className="py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            Got questions? We have <span className="text-primary">answers</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about PickPocket
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-0">
                  <motion.button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full p-6 text-left hover:bg-accent/5 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold pr-8">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRightIcon className="size-5 text-primary" />
                      </motion.div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t"
                      >
                        <div className="p-6 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Enhanced CTA Section
function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const mousePosition = useMousePosition();

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Interactive background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"
        animate={{
          background: [
            "linear-gradient(to bottom right, var(--primary)/10, var(--secondary)/10, var(--accent)/10)",
            "linear-gradient(to bottom right, var(--secondary)/10, var(--accent)/10, var(--primary)/10)",
            "linear-gradient(to bottom right, var(--accent)/10, var(--primary)/10, var(--secondary)/10)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Mouse-following gradient */}
      <motion.div
        className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x / 20,
          y: mousePosition.y / 20,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 30 }}
        style={{ left: "10%", top: "10%" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Floating elements */}
          <div className="relative">
            <motion.div
              animate={{
                rotate: 360,
                y: [0, -20, 0],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute -top-16 -left-16 z-10"
            >
              <SparklesIcon className="size-16 text-primary/50" />
            </motion.div>

            <motion.div
              animate={{
                rotate: -360,
                y: [0, -30, 0],
              }}
              transition={{
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute -top-8 -right-8 z-10"
            >
              <RocketLaunchIcon className="size-12 text-secondary/50" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Ready to transform your{" "}
              <span className="relative">
                <motion.span
                  className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  animate={{
                    background: [
                      "linear-gradient(to right, var(--primary), var(--secondary))",
                      "linear-gradient(to right, var(--secondary), var(--primary))",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  reading experience
                </motion.span>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl -z-10"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
              ?
            </h2>
          </div>

          <p className="text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of readers who've already discovered the joy of
            distraction-free reading with PickPocket. Start your journey today.
          </p>

          {/* Enhanced CTA buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-75 group-hover:opacity-100"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              <Button
                asChild
                size="lg"
                className="relative px-16 py-8 text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-2xl"
              >
                <Link to="/app">
                  <RocketLaunchIcon className="size-8 mr-4" />
                  Start Reading Better
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="px-16 py-8 text-2xl backdrop-blur-sm border-2 hover:bg-accent/20"
              >
                <PlayIcon className="size-8 mr-4" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            {[
              { icon: CheckIcon, text: "Free forever" },
              { icon: ShieldCheckIcon, text: "Privacy guaranteed" },
              { icon: CodeBracketIcon, text: "Open source" },
              { icon: BoltIcon, text: "Lightning fast" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1, color: "var(--primary)" }}
              >
                <item.icon className="size-5 text-green-500" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Enhanced Footer
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 bg-gradient-to-t from-card/50 to-background border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 mb-6"
            >
              <PocketIcon className="size-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PickPocket
              </span>
            </motion.div>

            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              The read-it-later application that doesn't suck. Save articles and
              read them distraction-free, anytime, anywhere, on any device.
            </p>

            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                🚀 Open Source
              </Badge>
              <Badge variant="outline">🔒 Privacy First</Badge>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Product</h4>
            <ul className="space-y-3 text-muted-foreground">
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "Get Started", href: "/app" },
                { label: "Browser Extension", href: "#" },
                { label: "Mobile Apps", href: "#" },
                { label: "API Docs", href: "#" },
              ].map((item) => (
                <motion.li key={item.label} whileHover={{ x: 5 }}>
                  <Link
                    to={item.href}
                    className="hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    {item.label}
                    <ArrowRightIcon className="size-3 opacity-0 group-hover:opacity-100" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              {[
                { label: "About", href: "#about" },
                { label: "Blog", href: "#blog" },
                { label: "Careers", href: "#careers" },
                { label: "Contact", href: "#contact" },
                { label: "Privacy", href: "#privacy" },
                { label: "Terms", href: "#terms" },
              ].map((item) => (
                <motion.li key={item.label} whileHover={{ x: 5 }}>
                  <a
                    href={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">
            © {currentYear} PickPocket. Built with ❤️ for readers everywhere.
          </p>

          <div className="flex items-center gap-6">
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
            <a
              href="https://discord.gg"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Landing Page Component
function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero />
      <Features />
      <InteractiveDemo />
      <Statistics />
      <Comparison />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
