// frontend/src/components/AppSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

// Simple skeleton item wrapper
function SkeletonItem({ className = "" }: { className?: string }) {
  return <Skeleton className={className} />;
}

// Sidebar skeleton for desktop
function SidebarSkeleton() {
  return (
    <aside className="hidden min-h-screen w-64 flex-col border-r border-border bg-card md:flex">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <SkeletonItem className="size-6 rounded" />
          <SkeletonItem className="h-5 w-24" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 p-4">
        {/* Main section */}
        <div className="space-y-2">
          <SkeletonItem className="mb-3 h-3 w-12" />
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2">
                <SkeletonItem className="size-4 rounded" />
                <SkeletonItem className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Filters section */}
        <div className="space-y-2">
          <SkeletonItem className="mb-3 h-3 w-16" />
          <div className="space-y-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2">
                <SkeletonItem className="size-4 rounded" />
                <SkeletonItem className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Tools section */}
        <div className="space-y-2">
          <SkeletonItem className="mb-3 h-3 w-12" />
          <div className="flex items-center gap-3 px-3 py-2">
            <SkeletonItem className="size-4 rounded" />
            <SkeletonItem className="h-4 flex-1" />
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <SkeletonItem className="size-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <SkeletonItem className="h-4 w-20" />
            <SkeletonItem className="h-3 w-32" />
          </div>
        </div>
      </div>
    </aside>
  );
}

// Top bar skeleton for mobile
function TopBarSkeleton() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm md:hidden">
      <SkeletonItem className="size-8 rounded" />
      <div className="flex items-center gap-2">
        <SkeletonItem className="size-6 rounded" />
        <SkeletonItem className="h-6 w-24" />
      </div>
      <SkeletonItem className="size-8 rounded-full" />
    </nav>
  );
}

// Article card skeleton
function ArticleCardSkeleton() {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-4">
      {/* Header with metadata */}
      <div className="mb-2 flex items-center gap-2">
        <SkeletonItem className="h-4 w-20" />
        <SkeletonItem className="h-4 w-16" />
        <SkeletonItem className="size-3 rounded-full" />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <SkeletonItem className="h-5 w-full" />
        <SkeletonItem className="h-5 w-4/5" />
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <SkeletonItem className="h-4 w-full" />
        <SkeletonItem className="h-4 w-3/4" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <SkeletonItem className="h-6 w-16 rounded-full" />
          <SkeletonItem className="h-6 w-12 rounded-full" />
        </div>
        <SkeletonItem className="size-6 rounded" />
      </div>
    </div>
  );
}

// Main content skeleton
function MainContentSkeleton() {
  return (
    <div className="min-h-screen flex-1 bg-background">
      <div className="container mx-auto max-w-4xl space-y-6 px-4 py-6">
        {/* Search bar */}
        <div className="relative">
          <SkeletonItem className="h-10 w-full rounded-md" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <SkeletonItem className="h-6 w-32" />
            <SkeletonItem className="h-4 w-48" />
          </div>
          <SkeletonItem className="h-8 w-20 rounded" />
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <SkeletonItem className="h-8 w-20 rounded" />
            <SkeletonItem className="size-8 rounded" />
            <SkeletonItem className="size-8 rounded" />
            <SkeletonItem className="h-8 w-16 rounded" />
          </div>
        </div>

        {/* Articles list */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>

        {/* Bottom pagination */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <SkeletonItem className="h-8 w-20 rounded" />
            <SkeletonItem className="size-8 rounded" />
            <SkeletonItem className="size-8 rounded" />
            <SkeletonItem className="h-8 w-16 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main app skeleton component
export function AppSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen pt-14 md:pt-0">
        {/* Mobile TopBar */}
        <TopBarSkeleton />

        <div className="flex">
          {/* Desktop Sidebar */}
          <SidebarSkeleton />

          {/* Main Content */}
          <MainContentSkeleton />
        </div>
      </main>
    </div>
  );
}

// Compact skeleton for quick loading states
export function CompactAppSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-4 text-center">
        <SkeletonItem className="mx-auto size-12 rounded-full" />
        <div className="space-y-2">
          <SkeletonItem className="mx-auto h-4 w-32" />
          <SkeletonItem className="mx-auto h-3 w-48" />
        </div>
      </div>
    </div>
  );
}
