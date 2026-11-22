import path from "node:path";
import { MDocument } from "@mastra/rag";

import { KB_DIR } from "./config";
import { parseFileToStandardText } from "./parser";

export interface KnowledgeChunk {
  id: string;
  text: string;
  metadata: {
    source: string;
    title: string;
    sourceType: string;
    chunkIndex: number;
    [key: string]: unknown;
  };
}

export async function processAndChunkFile(
  filePath: string,
): Promise<KnowledgeChunk[]> {
  const document = await parseFileToStandardText(filePath);

  const mDoc =
    document.sourceType === "markdown"
      ? MDocument.fromMarkdown(document.rawText, {
          metadata: document.metadata,
        })
      : document.sourceType === "json"
        ? MDocument.fromJSON(document.rawText, {
            metadata: document.metadata,
          })
        : MDocument.fromText(document.rawText, {
            metadata: document.metadata,
          });

  let chunks;

  switch (document.sourceType) {
    case "markdown":
      chunks = await mDoc.chunk({
        strategy: "markdown",
        headers: [
          ["#", "h1"],
          ["##", "h2"],
          ["###", "h3"],
        ],
        stripHeaders: false,
      });
      break;

    case "json":
      chunks = await mDoc.chunk({
        strategy: "json",
        maxSize: 512,
      });
      break;

    case "csv":
      chunks = await mDoc.chunk({
        strategy: "recursive",
        maxSize: 512,
        overlap: 50,
        separators: ["\n\n", "\n", " ", ""],
      });
      break;

    case "pdf":
    case "txt":
    default:
      chunks = await mDoc.chunk({
        strategy: "recursive",
        maxSize: 512,
        overlap: 75,
        separators: ["\n\n", "\n", ". ", " ", ""],
      });
      break;
  }

  return chunks.map((chunk, index) => ({
    id: `${document.metadata.source}::${index}`,
    text: chunk.text,
    metadata: {
      ...document.metadata,
      source: document.metadata.source,
      title: document.metadata.title,
      sourceType: document.sourceType,
      chunkIndex: index,
    },
  }));
}

export async function chunkKnowledgeBase(): Promise<KnowledgeChunk[]> {
  async function getFiles(directory: string): Promise<string[]> {
    const entries = await import("node:fs/promises").then(({ readdir }) =>
      readdir(directory, { withFileTypes: true }),
    );

    const nested = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
          return getFiles(fullPath);
        }

        if (
          entry.isFile() &&
          /\.(md|mdx|txt|pdf|csv|json)$/i.test(entry.name)
        ) {
          return [fullPath];
        }

        return [];
      }),
    );

    return nested.flat();
  }

  const files = await getFiles(KB_DIR);
  const allChunks: KnowledgeChunk[] = [];

  console.log(`Found ${files.length} supported files.`);

  for (const filePath of files) {
    const chunks = await processAndChunkFile(filePath);
    allChunks.push(...chunks);

    console.log(
      `Chunked ${path.relative(KB_DIR, filePath)}: ${chunks.length} chunks`,
    );
  }

  console.log(`Total chunks created: ${allChunks.length}`);

  return allChunks;
}
