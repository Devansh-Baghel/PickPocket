import { createFileRoute, Link } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookmarkIcon, CheckIcon, LoaderIcon } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { getSaves } from "@/utils/server-functions";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  const session = useAuthStore((state) => state.session);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["saves", session?.user?.id],
    queryFn: ({ pageParam = 1 }) => 
      getSaves({ 
        data: { 
          userId: session.user.id, 
          page: pageParam,
          limit: 10 
        } 
      }),
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer items than the limit, there are no more pages
      if (!lastPage.hasMore) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
    enabled: !!session?.user?.id,
  });

  // Flatten all pages into a single array
  const saves = data?.pages.flatMap(page => page.data) || [];

  // Simple search filtering (client-side for now)
  const filteredSaves = saves.filter(
    (save: any) =>
      save.article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      save.article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 1000 // Load when 1000px from bottom
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (status === 'pending') {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SaveItemSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center text-red-500">
          Error loading saves: {error?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-6 px-4 py-6">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search your saves..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">All Saves</h2>
          <p className="text-sm text-muted-foreground">
            {filteredSaves.length}{" "}
            {filteredSaves.length === 1 ? "article" : "articles"}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      </div>

      {/* Saves List */}
      <div className="space-y-4">
        {filteredSaves.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookmarkIcon className="mx-auto mb-4 size-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No articles found</h3>
              <p className="mb-4 text-muted-foreground">
                {searchQuery
                  ? `No articles match your search "${searchQuery}"`
                  : "Start by saving your first article!"}
              </p>
              {searchQuery && (
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {filteredSaves.map((save: any) => (
              <SaveItem key={save.save.id} save={save} />
            ))}
            
            {/* Loading indicator for next page */}
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <div className="flex items-center gap-2">
                  <LoaderIcon className="size-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Loading more articles...
                  </span>
                </div>
              </div>
            )}
            
            {/* Load more button (fallback for manual loading) */}
            {hasNextPage && !isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Button 
                  variant="outline" 
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  Load More Articles
                </Button>
              </div>
            )}
            
            {/* End of results indicator */}
            {!hasNextPage && saves.length > 0 && (
              <div className="text-center py-4 text-sm text-muted-foreground">
                You've reached the end of your saves
              </div>
            )}
          </>
        )}
      </div>

      {/* Background loading indicator */}
      {isFetching && !isFetchingNextPage && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-3 py-2 rounded-md shadow-lg">
          <div className="flex items-center gap-2">
            <LoaderIcon className="size-4 animate-spin" />
            <span className="text-sm">Updating...</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Skeleton component for loading state
function SaveItemSkeleton() {
  return (
    <Card className="border-l-4 border-l-transparent">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-20 bg-accent rounded animate-pulse" />
              <div className="h-4 w-16 bg-accent rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-full bg-accent rounded animate-pulse" />
              <div className="h-5 w-4/5 bg-accent rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-accent rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-accent rounded animate-pulse" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SaveItem({ save }: { save: any }) {
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - then.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                {save.article.siteName}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(save.save.timestamp)}
              </span>
              {save.save.isread && (
                <CheckIcon className="size-3 text-green-600" />
              )}
            </div>
            <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
              <Link to="/app/saves/$saveId" params={{ saveId: save.save.id }}>
                {save.article.title}
              </Link>
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {save.article.excerpt}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
