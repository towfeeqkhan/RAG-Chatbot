import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import Papa from "papaparse";
import { KB_DIR } from "./config";

export type SourceType = "markdown" | "pdf" | "csv" | "json" | "txt";

export interface ExtractedDocument {
  rawText: string;
  sourceType: SourceType;
  metadata: {
    source: string;
    filePath: string;
    title: string;
    [key: string]: unknown;
  };
}

export async function parseFileToStandardText(
  filePath: string,
): Promise<ExtractedDocument> {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);

  // Keep the relative path so files with the same filename
  // in different folders remain distinguishable.
  const relativePath = path.relative(KB_DIR, filePath).replace(/\\/g, "/");

  const metadata = {
    source: relativePath,
    filePath,
    title: path.basename(fileName, ext),
  };

  switch (ext) {
    case ".md":
    case ".mdx": {
      const rawText = await readFile(filePath, "utf8");

      return {
        rawText,
        sourceType: "markdown",
        metadata,
      };
    }

    case ".txt": {
      const rawText = await readFile(filePath, "utf8");

      return {
        rawText,
        sourceType: "txt",
        metadata,
      };
    }

    case ".pdf": {
      const buffer = await readFile(filePath);

      const parser = new PDFParse({
        data: buffer,
      });

      try {
        const parsed = await parser.getText();

        const rawText = parsed.text
          .replace(/\r\n/g, "\n")
          .replace(/[ \t]+\n/g, "\n")
          .replace(/\n{3,}/g, "\n\n")
          .trim();

        return {
          rawText,
          sourceType: "pdf",
          metadata: {
            ...metadata,
            totalPages: parsed.total,
          },
        };
      } finally {
        // Release parser resources even if extraction fails.
        await parser.destroy();
      }
    }

    case ".csv": {
      const content = await readFile(filePath, "utf8");

      const parsed = Papa.parse<Record<string, string>>(content, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
      });

      if (parsed.errors.length > 0) {
        console.warn(`CSV warnings in ${relativePath}:`, parsed.errors);
      }

      const rows = parsed.data.map((row, index) => {
        const fields = Object.entries(row)
          .map(([key, value]) => `${key}: ${value ?? ""}`)
          .join(" | ");

        return `[Record ${index + 1}] ${fields}`;
      });

      return {
        rawText: rows.join("\n\n"),
        sourceType: "csv",
        metadata: {
          ...metadata,
          rowCount: parsed.data.length,
          headers: parsed.meta.fields ?? [],
        },
      };
    }

    case ".json": {
      const content = await readFile(filePath, "utf8");
      const parsedJson: unknown = JSON.parse(content);

      const rawText = Array.isArray(parsedJson)
        ? parsedJson
            .map(
              (item, index) =>
                `[Item ${index + 1}]\n${JSON.stringify(item, null, 2)}`,
            )
            .join("\n\n")
        : JSON.stringify(parsedJson, null, 2);

      return {
        rawText,
        sourceType: "json",
        metadata,
      };
    }

    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
}
