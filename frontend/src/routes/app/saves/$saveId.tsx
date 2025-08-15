import { getSaveWithArticle } from "@/utils/server-functions";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading save...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">Error loading save: {error.message}</div>
      </div>
    );
  }

  if (!saveData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Save not found</div>
      </div>
    );
  }

  console.log(saveData);

  const { save, article } = saveData;

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Navigation */}
      <div className="mb-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-blue-600 underline hover:text-blue-800"
        >
          <ArrowLeftIcon className="size-4" />
          Back to App
        </Link>
      </div>

      {/* Article Content */}
      <Card>
        <CardHeader>
          <CardTitle>Article Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Article Header */}
            <div className="border-b pb-6">
              <h1 className="mb-4 text-3xl font-bold">{article.title}</h1>

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
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View Original
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Article Excerpt */}
            {article.excerpt && (
              <div className="rounded-lg bg-muted/50 p-4">
                <h3 className="mb-2 font-semibold">Summary</h3>
                <p className="text-muted-foreground">{article.excerpt}</p>
              </div>
            )}

            {/* Article Content */}
            <div className="reader-mode prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
