import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Box,
  Feather,
  Github,
  Palette,
  Sparkles,
  Zap,
  ImportIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ThemeSelector } from "@/components/ThemeToggle";

export const Route = createFileRoute("/landing2")({
  component: LandingPage,
});

const FeatureCard = ({ icon, title, children }) => (
  <motion.div
    className="bg-card border border-border/50 rounded-xl p-6 flex flex-col items-start gap-4"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    <div className="p-3 bg-primary/10 rounded-lg text-primary">{icon}</div>
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm">{children}</p>
  </motion.div>
);

const TestimonialCard = ({ author, role, children }) => (
  <motion.div
    className="bg-card border border-border/50 rounded-xl p-6 space-y-4"
    variants={{
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    }}
  >
    <p className="text-muted-foreground text-sm italic">"{children}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
        <span className="font-bold text-primary">{author.charAt(0)}</span>
      </div>
      <div>
        <p className="font-semibold text-foreground">{author}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
  </motion.div>
);

function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Sparkles className="text-primary" />
            </motion.div>
            <span>PickPocket</span>
          </Link>
          <Button asChild>
            <Link to="/app">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <motion.section
          className="container mx-auto px-6 py-20 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary"
            >
              Your Personal Reading Sanctuary
            </Badge>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-4"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Read what you love, <br /> without the noise.
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-muted-foreground mb-8"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.2 }}
          >
            PickPocket is a modern, open-source read-it-later app that saves
            articles and transforms them into a clean, customizable reading
            experience.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="group">
              <Link to="/app">
                Start Reading for Free
                <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="container mx-auto px-6 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Everything you need to focus</h2>
            <p className="text-muted-foreground mt-2">
              Features designed for the modern reader and developer.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="size-6" />}
              title="Clutter-Free Reading"
            >
              Enjoy articles in a clean, distraction-free interface. We strip
              away ads and other noise, so you can focus on the content.
            </FeatureCard>
            <FeatureCard
              icon={<Palette className="size-6" />}
              title="Fully Customizable"
            >
              Make your reading space your own with customizable themes and a
              selection of beautiful fonts for the UI and the reader.
            </FeatureCard>
            <FeatureCard
              icon={<Zap className="size-6" />}
              title="Blazing Fast & Lightweight"
            >
              Built on Cloudflare Workers, PickPocket is incredibly fast and
              responsive. No more waiting for your articles to load.
            </FeatureCard>
            <FeatureCard
              icon={<ImportIcon className="size-6" />}
              title="Seamless Pocket Import"
            >
              Switching is easy. Import your entire library from Pocket with our
              simple CSV upload and continue where you left off.
            </FeatureCard>
            <FeatureCard
              icon={<Feather className="size-6" />}
              title="Highlight & Annotate"
            >
              Engage with your content by highlighting key passages. Your
              insights are saved and easy to revisit.
            </FeatureCard>
            <FeatureCard
              icon={<Github className="size-6" />}
              title="Open Source & Private"
            >
              Your data is yours. PickPocket is open-source (GPL-3.0) and built
              with privacy in mind. No tracking, no selling your data.
            </FeatureCard>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <section className="bg-card border-y border-border/50">
          <div className="container mx-auto px-6 py-20">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold">Get started in seconds</h2>
              <p className="text-muted-foreground mt-2">
                Three simple steps to a better reading experience.
              </p>
            </motion.div>
            <motion.div
              className="grid md:grid-cols-3 gap-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Save Anything</h3>
                <p className="text-sm text-muted-foreground">
                  Save articles, blog posts, and newsletters from anywhere on
                  the web with a single click.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Read Distraction-Free</h3>
                <p className="text-sm text-muted-foreground">
                  Open your saves in a beautifully formatted, customizable view
                  that puts the content first.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Organize & Revisit</h3>
                <p className="text-sm text-muted-foreground">
                  Use favorites, archives, and highlights to build your personal
                  knowledge base.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold">
              Loved by readers & developers
            </h2>
            <p className="text-muted-foreground mt-2">
              Don't just take our word for it.
            </p>
          </motion.div>
          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <TestimonialCard author="Alex" role="Software Engineer">
              Finally, a read-it-later app that respects my workflow. It's fast,
              customizable, and the fact that it's open-source is a huge plus.
              The import from Pocket was flawless.
            </TestimonialCard>
            <TestimonialCard author="Sarah" role="Avid Reader">
              I love how PickPocket declutters articles. The reading experience
              is so calming, and I can tweak the fonts and themes to my liking.
              It's become my go-to for long reads.
            </TestimonialCard>
            <TestimonialCard author="Mike" role="Indie Hacker">
              As a developer, I appreciate the tech stack. It's a great example
              of a modern web app. The UI is clean, and it does one thing and
              does it exceptionally well.
            </TestimonialCard>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            className="bg-primary/10 rounded-xl p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Ready to Upgrade Your Reading?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join PickPocket today and rediscover the joy of reading online.
              It's free and open-source forever.
            </p>
            <Button asChild size="lg" className="group">
              <Link to="/app">
                Get Started Now
                <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border/50">
        <div className="container mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 PickPocket. An open-source project.</p>
          <p>
            Built with ❤️ by{" "}
            <a
              href="https://github.com/Devansh-Baghel/PickPocket"
              className="underline hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Devansh Baghel
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
