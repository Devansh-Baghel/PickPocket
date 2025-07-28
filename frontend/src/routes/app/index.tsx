import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArchiveIcon,
  BookmarkIcon,
  ClockIcon,
  ExternalLinkIcon,
  HeartIcon,
  HighlighterIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  EyeIcon,
  CheckIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for development
const mockSaves = [
  {
    id: "1",
    article: {
      id: "a1",
      title: "Building Scalable React Applications with TypeScript",
      excerpt:
        "Learn how to structure large React applications using TypeScript, exploring advanced patterns, type safety, and maintainable code architecture...",
      url: "https://example.com/react-typescript",
      siteName: "TechBlog",
      publishedTime: "2024-01-15T10:30:00Z",
      lang: "en",
    },
    save: {
      id: "1",
      made_by: "user1",
      is_archived: false,
      is_favorite: true,
      is_read: false,
      read_at: null,
      article_id: "a1",
      timestamp: "2024-01-16T09:15:00Z",
    },
  },
  {
    id: "2",
    article: {
      id: "a2",
      title: "The Future of Web Development: What's Coming in 2024",
      excerpt:
        "Exploring the latest trends in web development, from new JavaScript frameworks to emerging design patterns that will shape the industry...",
      url: "https://example.com/web-dev-2024",
      siteName: "WebDev Weekly",
      publishedTime: "2024-01-14T14:20:00Z",
      lang: "en",
    },
    save: {
      id: "2",
      made_by: "user1",
      is_archived: false,
      is_favorite: false,
      is_read: true,
      read_at: "2024-01-16T11:30:00Z",
      article_id: "a2",
      timestamp: "2024-01-15T16:45:00Z",
    },
  },
  {
    id: "3",
    article: {
      id: "a3",
      title: "Understanding Database Indexing for Better Performance",
      excerpt:
        "A comprehensive guide to database indexing strategies, covering B-trees, hash indexes, and when to use different types for optimal query performance...",
      url: "https://example.com/database-indexing",
      siteName: "Database Insights",
      publishedTime: "2024-01-13T08:45:00Z",
      lang: "en",
    },
    save: {
      id: "3",
      made_by: "user1",
      is_archived: true,
      is_favorite: false,
      is_read: true,
      read_at: "2024-01-14T20:15:00Z",
      article_id: "a3",
      timestamp: "2024-01-13T19:30:00Z",
    },
  },
  {
    id: "4",
    article: {
      id: "a4",
      title: "CSS Grid vs Flexbox: When to Use Which Layout Method",
      excerpt:
        "Comparing CSS Grid and Flexbox layout systems, with practical examples and guidelines for choosing the right tool for your design needs...",
      url: "https://example.com/css-grid-flexbox",
      siteName: "CSS Tricks",
      publishedTime: "2024-01-12T12:00:00Z",
      lang: "en",
    },
    save: {
      id: "4",
      made_by: "user1",
      is_archived: false,
      is_favorite: true,
      is_read: false,
      read_at: null,
      article_id: "a4",
      timestamp: "2024-01-12T18:20:00Z",
    },
  },
  {
    id: "5",
    article: {
      id: "a5",
      title: "Machine Learning Fundamentals: A Beginner's Guide",
      excerpt:
        "Starting your journey in machine learning with fundamental concepts, algorithms, and practical applications you can implement today...",
      url: "https://example.com/ml-fundamentals",
      siteName: "AI Learning Hub",
      publishedTime: "2024-01-11T16:30:00Z",
      lang: "en",
    },
    save: {
      id: "5",
      made_by: "user1",
      is_archived: false,
      is_favorite: false,
      is_read: false,
      read_at: null,
      article_id: "a5",
      timestamp: "2024-01-11T17:45:00Z",
    },
  },
];

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      filter: (search.filter as string) || "all",
      view: (search.view as string) || "list",
      search: (search.search as string) || "",
    };
  },
});

function SaveItem({
  save,
  onToggleFavorite,
  onToggleArchive,
  onMarkRead,
}: {
  save: (typeof mockSaves)[0];
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onMarkRead: (id: string) => void;
}) {
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
              {save.save.is_read && (
                <CheckIcon className="size-3 text-green-600" />
              )}
            </div>

            <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
              {save.article.title}
            </h3>

            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {save.article.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <ClockIcon className="size-3" />
                {save.article.publishedTime &&
                  formatTimeAgo(save.article.publishedTime)}
              </div>
              <a
                href={save.article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <ExternalLinkIcon className="size-3" />
                Original
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`size-8 ${save.save.is_favorite ? "text-red-500 hover:text-red-600" : "hover:text-red-500"}`}
              onClick={() => onToggleFavorite(save.id)}
            >
              <HeartIcon
                className={`size-4 ${save.save.is_favorite ? "fill-current" : ""}`}
              />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!save.save.is_read && (
                  <DropdownMenuItem onClick={() => onMarkRead(save.id)}>
                    <EyeIcon className="size-4" />
                    Mark as Read
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => onToggleArchive(save.id)}>
                  <ArchiveIcon className="size-4" />
                  {save.save.is_archived ? "Unarchive" : "Archive"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HighlighterIcon className="size-4" />
                  View Highlights
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AddSaveBar({ onAddSave }: { onAddSave: (url: string) => void }) {
  const [url, setUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setIsAdding(true);
      onAddSave(url.trim());
      setUrl("");
      // Simulate API call
      setTimeout(() => setIsAdding(false), 1000);
    }
  };

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="url"
            placeholder="Paste a link to save an article..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            disabled={isAdding}
          />
          <Button type="submit" disabled={!url.trim() || isAdding}>
            <PlusIcon className="size-4" />
            {isAdding ? "Adding..." : "Save"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function FilterBar({
  currentFilter,
  searchQuery,
  viewMode,
  onFilterChange,
  onSearchChange,
  onViewModeChange,
  stats,
}: {
  currentFilter: string;
  searchQuery: string;
  viewMode: string;
  onFilterChange: (filter: string) => void;
  onSearchChange: (query: string) => void;
  onViewModeChange: (mode: string) => void;
  stats: {
    total: number;
    unread: number;
    favorites: number;
    archived: number;
  };
}) {
  const filters = [
    { key: "all", label: "All", count: stats.total },
    { key: "unread", label: "Unread", count: stats.unread },
    { key: "favorites", label: "Favorites", count: stats.favorites },
    { key: "archived", label: "Archived", count: stats.archived },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search your saves..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Tabs and View Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 overflow-x-auto">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={currentFilter === filter.key ? "default" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter.key)}
              className="whitespace-nowrap"
            >
              {filter.label}
              <span className="ml-1 text-xs bg-background/20 px-1.5 py-0.5 rounded">
                {filter.count}
              </span>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewModeChange("list")}
            className="size-8"
          >
            <ListIcon className="size-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewModeChange("grid")}
            className="size-8"
          >
            <GridIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function RouteComponent() {
  const { filter, view, search } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [saves, setSaves] = useState(mockSaves);
  const [searchQuery, setSearchQuery] = useState(search);

  // Calculate stats
  const stats = {
    total: saves.length,
    unread: saves.filter((s) => !s.save.is_read).length,
    favorites: saves.filter((s) => s.save.is_favorite).length,
    archived: saves.filter((s) => s.save.is_archived).length,
  };

  // Filter saves based on current filter and search
  const filteredSaves = saves.filter((save) => {
    // Apply filter
    let matchesFilter = true;
    switch (filter) {
      case "unread":
        matchesFilter = !save.save.is_read;
        break;
      case "favorites":
        matchesFilter = save.save.is_favorite;
        break;
      case "archived":
        matchesFilter = save.save.is_archived;
        break;
      default:
        matchesFilter = true;
    }

    // Apply search
    const matchesSearch =
      searchQuery === "" ||
      save.article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      save.article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      save.article.siteName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleFilterChange = (newFilter: string) => {
    navigate({
      search: { filter: newFilter, view, search: searchQuery },
    });
  };

  const handleViewModeChange = (newView: string) => {
    navigate({
      search: { filter, view: newView, search: searchQuery },
    });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    navigate({
      search: { filter, view, search: query },
    });
  };

  const handleAddSave = (url: string) => {
    console.log("Add save:", url);
    // TODO: Implement add save functionality
  };

  const handleToggleFavorite = (id: string) => {
    setSaves((prev) =>
      prev.map((save) =>
        save.id === id
          ? {
              ...save,
              save: { ...save.save, is_favorite: !save.save.is_favorite },
            }
          : save
      )
    );
  };

  const handleToggleArchive = (id: string) => {
    setSaves((prev) =>
      prev.map((save) =>
        save.id === id
          ? {
              ...save,
              save: { ...save.save, is_archived: !save.save.is_archived },
            }
          : save
      )
    );
  };

  const handleMarkRead = (id: string) => {
    setSaves((prev) =>
      prev.map((save) =>
        save.id === id
          ? {
              ...save,
              save: {
                ...save.save,
                is_read: true,
                read_at: new Date().toISOString(),
              },
            }
          : save
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
      {/* Add Save Bar */}
      <AddSaveBar onAddSave={handleAddSave} />

      {/* Filter and Search */}
      <FilterBar
        currentFilter={filter}
        searchQuery={searchQuery}
        viewMode={view}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onViewModeChange={handleViewModeChange}
        stats={stats}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {filter === "all" && "All Saves"}
            {filter === "unread" && "Unread Articles"}
            {filter === "favorites" && "Favorite Articles"}
            {filter === "archived" && "Archived Articles"}
          </h2>
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
                  : filter === "all"
                    ? "Start by saving your first article above!"
                    : `You don't have any ${filter} articles yet.`}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => handleSearchChange("")}
                >
                  Clear search
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredSaves.map((save) => (
            <SaveItem
              key={save.id}
              save={save}
              onToggleFavorite={handleToggleFavorite}
              onToggleArchive={handleToggleArchive}
              onMarkRead={handleMarkRead}
            />
          ))
        )}
      </div>
    </div>
  );
}
