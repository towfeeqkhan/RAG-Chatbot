import { createTool } from "@mastra/core/tools";
import { embed } from "ai";
import { z } from "zod";

import {
  EMBEDDING_DIMENSION,
  INDEX_NAME,
  embeddingModel,
  vectorStore,
} from "../rag/config";

import { formatQuery } from "../rag/embedding-config";

export const knowledgeSearchTool = createTool({
  id: "knowledge-search",
  description:
    "Search Voltway's internal documentation for product details, prices, warranties, policies, and troubleshooting instructions.",

  inputSchema: z.object({
    query: z.string().describe("The specific customer question to search for"),
  }),

  execute: async ({ query }) => {
    const { embedding } = await embed({
      model: embeddingModel,
      value: formatQuery(query),
      dimensions: EMBEDDING_DIMENSION,
    });

    const results = await vectorStore.query({
      indexName: INDEX_NAME,
      queryVector: embedding,
      topK: 5,
    });

    if (results.length === 0) {
      return {
        found: false,
        context: "No relevant information was found.",
      };
    }

    return {
      found: true,
      context: results
        .map((result) => {
          const source = result.metadata?.source ?? "Unknown source";
          const text = result.metadata?.text ?? "";

          return `Source: ${source}\n${text}`;
        })
        .join("\n\n---\n\n"),
    };
  },
});
