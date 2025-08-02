import { HTTPException } from "hono/http-exception";

export interface PocketCsvRow {
  title: string;
  url: string;
  time_added: string;
  tags: string;
  status: string;
}

export function parsePocketCsv(csvContent: string): PocketCsvRow[] {
  console.log("CSV content length:", csvContent?.length);
  console.log("CSV content preview:", csvContent?.slice(0, 200));

  try {
    // Split into lines and remove empty lines
    const lines = csvContent
      .trim()
      .split("\n")
      .filter((line) => line.trim());

    if (lines.length === 0) {
      throw new Error("CSV file is empty");
    }

    // Parse header line
    const headerLine = lines[0];
    const headers = parseCSVLine(headerLine);

    console.log("Parsed headers:", headers);

    // Validate required columns
    const requiredColumns = ["title", "url", "time_added", "tags", "status"];
    const missingColumns = requiredColumns.filter(
      (col) => !headers.includes(col)
    );
    if (missingColumns.length > 0) {
      throw new HTTPException(400, {
        message: `Missing required columns: ${missingColumns.join(", ")}`,
      });
    }

    // Parse data rows
    const records: PocketCsvRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        const values = parseCSVLine(line);

        // Create record object
        const record: any = {};
        headers.forEach((header, index) => {
          record[header] = values[index] || "";
        });

        // Validate required fields
        if (record.url && record.title) {
          records.push(record as PocketCsvRow);
        } else {
          console.warn(`Skipping invalid row ${i}: missing url or title`);
        }
      } catch (error) {
        console.warn(`Error parsing row ${i}:`, error);
      }
    }

    console.log("Successfully parsed", records.length, "rows");
    return records;
  } catch (error) {
    console.error("CSV parsing error:", error);
    throw new HTTPException(400, {
      message:
        "Invalid CSV format. Please ensure you uploaded a valid Pocket export file.",
    });
  }
}

// Simple CSV line parser that handles quoted fields
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i += 2;
        continue;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      // Field separator
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
    i++;
  }

  // Add the last field
  result.push(current.trim());

  return result;
}

export function convertUnixTimestamp(unixTimestamp: string): string {
  const timestamp = parseInt(unixTimestamp);
  if (isNaN(timestamp)) {
    return new Date().toISOString();
  }
  return new Date(timestamp * 1000).toISOString();
}
