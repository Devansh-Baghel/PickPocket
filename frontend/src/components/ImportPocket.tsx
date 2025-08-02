import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { importPocketData } from "@/utils/server-functions";
import {
  UploadIcon,
  LoaderIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  FileTextIcon,
} from "lucide-react";

interface ImportStats {
  total: number;
  imported: number;
  skipped: number;
  errors: number;
}

interface ImportResult {
  success: boolean;
  message: string;
  stats: ImportStats;
  errors: string[];
}

export function ImportPocket() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const session = useAuthStore((state) => state.session);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (csvContent: string) =>
      importPocketData({
        data: {
          userId: session?.user?.id!,
          csvContent,
        },
      }),
    onSuccess: (result) => {
      // Invalidate and refetch the saves list
      queryClient.invalidateQueries({
        queryKey: ["saves", session?.user?.id],
      });
      setImportResult(result);
      setSelectedFile(null);
    },
    onError: (error: any) => {
      setImportResult({
        success: false,
        message: error.message || "Import failed",
        stats: { total: 0, imported: 0, skipped: 0, errors: 1 },
        errors: [error.message || "Unknown error occurred"],
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
      setImportResult(null);
    } else {
      alert("Please select a valid CSV file");
    }
  };

  const handleImport = async () => {
    if (!selectedFile || !session?.user?.id) return;

    try {
      const csvContent = await selectedFile.text();
      mutation.mutate(csvContent);
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Error reading file. Please try again.");
    }
  };

  const resetImport = () => {
    setSelectedFile(null);
    setImportResult(null);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="size-5" />
          Import from Pocket
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!importResult ? (
          <>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your Pocket export CSV file to import all your saved
                  articles, tags, and reading status.
                </p>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    disabled={mutation.isPending}
                    className="w-full"
                  />
                  {selectedFile && (
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <FileTextIcon className="size-4" />
                      <span>
                        {selectedFile.name} (
                        {(selectedFile.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">
                  How to export from Pocket:
                </h4>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Go to your Pocket account settings</li>
                  <li>Find the "Export" section</li>
                  <li>Download your data as CSV format</li>
                  <li>Upload the CSV file here</li>
                </ol>
              </div>

              <Button
                onClick={handleImport}
                disabled={!selectedFile || mutation.isPending}
                className="w-full"
              >
                {mutation.isPending ? (
                  <>
                    <LoaderIcon className="size-4 animate-spin" />
                    Importing Articles...
                  </>
                ) : (
                  <>
                    <UploadIcon className="size-4" />
                    Import from Pocket
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {/* Import Result */}
            <div
              className={`p-4 rounded-lg border ${
                importResult.success
                  ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                  : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
              }`}
            >
              <div className="flex items-start gap-3">
                {importResult.success ? (
                  <CheckCircleIcon className="size-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircleIcon className="size-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4
                    className={`font-medium mb-2 ${
                      importResult.success
                        ? "text-green-900 dark:text-green-100"
                        : "text-red-900 dark:text-red-100"
                    }`}
                  >
                    {importResult.success
                      ? "Import Successful!"
                      : "Import Failed"}
                  </h4>
                  <p
                    className={`text-sm mb-3 ${
                      importResult.success
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    {importResult.message}
                  </p>

                  {/* Stats */}
                  {importResult.success && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-green-900 dark:text-green-100">
                          {importResult.stats.total}
                        </div>
                        <div className="text-green-700 dark:text-green-300">
                          Total
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-900 dark:text-green-100">
                          {importResult.stats.imported}
                        </div>
                        <div className="text-green-700 dark:text-green-300">
                          Imported
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-900 dark:text-green-100">
                          {importResult.stats.skipped}
                        </div>
                        <div className="text-green-700 dark:text-green-300">
                          Skipped
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-900 dark:text-green-100">
                          {importResult.stats.errors}
                        </div>
                        <div className="text-green-700 dark:text-green-300">
                          Errors
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Errors */}
                  {importResult.errors.length > 0 && (
                    <div className="mt-3">
                      <h5 className="font-medium text-sm mb-2">
                        Issues encountered:
                      </h5>
                      <ul className="text-xs space-y-1 max-h-32 overflow-y-auto">
                        {importResult.errors.map((error, index) => (
                          <li key={index} className="opacity-75">
                            • {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={resetImport}
                variant="outline"
                className="flex-1"
              >
                Import More
              </Button>
              <Button asChild className="flex-1">
                <a href="/app">View Imported Articles</a>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
