import { getSaveWithArticle } from "@/utils/server-functions";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ExternalLinkIcon,
  TagIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import "@/styles/reader.css";

interface Save {
  id: string;
  made_by: string;
  is_archived: boolean;
  is_favorite: boolean;
  is_read: boolean;
  read_at?: string;
  article_id: string;
  timestamp: string;
}

interface Article {
  id: string;
  url: string;
  title: string;
  content: string;
  excerpt: string;
  lang: string;
  publishedTime?: string;
  siteName: string;
  timestamp: string;
}

export const Route = createFileRoute("/app/saves/$saveId")({
  component: Article,
});

function Article() {
  const { saveId } = Route.useParams();

  const {
    data: saveData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["save-article", saveId],
    queryFn: () => getSaveWithArticle({ data: saveId }),
    enabled: !!saveId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading save...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error loading save: {error.message}</div>
      </div>
    );
  }

  if (!saveData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Save not found</div>
      </div>
    );
  }

  console.log(saveData);

  const { save, article } = saveData;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Navigation */}
      <div className="mb-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline"
        >
          <ArrowLeftIcon className="size-4" />
          Back to App
        </Link>
      </div>

      {/* Save Metadata */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TagIcon className="size-5" />
            Save Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-sm text-muted-foreground">
                  Save ID:
                </span>
                <p className="text-sm">{save.id}</p>
              </div>
              <div>
                <span className="font-semibold text-sm text-muted-foreground">
                  Saved At:
                </span>
                <p className="text-sm">
                  {new Date(save.timestamp).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="font-semibold text-sm text-muted-foreground">
                  Article ID:
                </span>
                <p className="text-sm">{save.article_id}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="font-semibold text-sm text-muted-foreground">
                  Status:
                </span>
                <div className="flex gap-2 mt-1">
                  {save.is_read && <Badge variant="secondary">Read</Badge>}
                  {save.is_favorite && (
                    <Badge variant="outline">Favorite</Badge>
                  )}
                  {save.is_archived && (
                    <Badge variant="outline">Archived</Badge>
                  )}
                </div>
              </div>
              {save.read_at && (
                <div>
                  <span className="font-semibold text-sm text-muted-foreground">
                    Read At:
                  </span>
                  <p className="text-sm">
                    {new Date(save.read_at).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Article Content */}
      <Card>
        <CardHeader>
          <CardTitle>Article Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Article Header */}
            <div className="border-b pb-6">
              <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="size-4" />
                  <span>
                    {article.publishedTime
                      ? new Date(article.publishedTime).toLocaleDateString()
                      : "Date unknown"}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-semibold">Source:</span>
                  <span>{article.siteName}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-semibold">Language:</span>
                  <span>{article.lang || "en"}</span>
                </div>

                {article.url && (
                  <div className="flex items-center gap-1">
                    <ExternalLinkIcon className="size-4" />
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View Original
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Article Excerpt */}
            {article.excerpt && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-muted-foreground">{article.excerpt}</p>
              </div>
            )}

            {/* Article Content */}
            <div className="reader-mode prose prose-lg max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
