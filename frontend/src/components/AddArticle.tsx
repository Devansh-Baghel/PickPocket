import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { postSave } from "@/utils/server-functions";
import { PlusIcon, LoaderIcon } from "lucide-react";

export function AddArticle() {
  const [url, setUrl] = useState("");
  const session = useAuthStore((state) => state.session);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (articleUrl: string) =>
      postSave({
        data: {
          userId: session?.user?.id,
          url: articleUrl,
        },
      }),
    onSuccess: () => {
      // Invalidate and refetch the saves list
      queryClient.invalidateQueries({
        queryKey: ["saves", session?.user?.id],
      });
      setUrl("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !session?.user?.id) return;

    mutation.mutate(url.trim());
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const canSubmit = url.trim() && isValidUrl(url.trim()) && !mutation.isPending;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusIcon className="size-5" />
          Save New Article
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={mutation.isPending}
              className="w-full"
            />
            {url && !isValidUrl(url) && (
              <p className="text-sm text-destructive">
                Please enter a valid URL
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!canSubmit}
            className="w-full sm:w-auto"
          >
            {mutation.isPending ? (
              <>
                <LoaderIcon className="size-4 animate-spin" />
                Saving Article...
              </>
            ) : (
              <>
                <PlusIcon className="size-4" />
                Save Article
              </>
            )}
          </Button>

          {/* Status Messages */}
          {mutation.isError && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">
                Failed to save article:{" "}
                {mutation.error?.message || "Unknown error"}
              </p>
            </div>
          )}

          {mutation.isSuccess && (
            <div className="p-3 rounded-md bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300">
                Article saved successfully! 🎉
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
