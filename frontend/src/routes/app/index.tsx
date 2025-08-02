import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookmarkIcon, CheckIcon } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { getSaves } from "@/utils/server-functions";
import { AddArticle } from "@/components/AddArticle";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  const session = useAuthStore((state) => state.session);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: savesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["saves", session?.user?.id],
    queryFn: () => getSaves({ data: session.user.id }),
    enabled: !!session?.user?.id,
  });

  const saves = savesData?.data || [];

  // Simple search without complex filtering
  const filteredSaves = saves.filter(
    (save: any) =>
      save.article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      save.article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center">Loading your saves...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center text-red-500">Error loading saves</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
      <AddArticle />

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
              <BookmarkIcon className="size-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
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
          filteredSaves.map((save: any) => (
            <SaveItem key={save.save.id} save={save} />
          ))
        )}
      </div>
    </div>
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
              <Link to={`/app/saves/${save.save.id}`}>
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
