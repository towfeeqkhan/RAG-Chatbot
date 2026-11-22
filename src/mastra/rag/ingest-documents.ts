import "dotenv/config";
import { embedMany } from "ai";

import {
  EMBEDDING_DIMENSION,
  EMBEDDING_MODEL_ID,
  INDEX_NAME,
  embeddingModel,
  vectorStore,
} from "./config";

import { chunkKnowledgeBase } from "./chunk-documents";
import { formatDocument } from "./embedding-config";

const BATCH_SIZE = 8;

// Stay comfortably below the provider's limits.
const MAX_BATCH_TOKENS = 25_000;
const MAX_INPUT_TOKENS = 7_000;
const MAX_REQUESTS_PER_MINUTE = 80;

// Leave room for other embedding requests you may make today.
const MAX_DAILY_REQUESTS = 900;

// Conservative estimate: tokens are not exactly the same as characters.
// For English text, 1 token is often around 3–4 characters, but this varies.
const CHARS_PER_ESTIMATED_TOKEN = 3;

const MIN_REQUEST_INTERVAL_MS = Math.ceil(60_000 / MAX_REQUESTS_PER_MINUTE);

const estimateTokens = (text: string): number =>
  Math.ceil(text.length / CHARS_PER_ESTIMATED_TOKEN);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function buildBatches<T extends { text: string; metadata: { title: string } }>(
  chunks: T[],
): T[][] {
  const batches: T[][] = [];
  let currentBatch: T[] = [];
  let currentTokens = 0;

  for (const chunk of chunks) {
    const formattedText = formatDocument(chunk.text, chunk.metadata.title);
    const estimatedTokens = estimateTokens(formattedText);

    if (estimatedTokens > MAX_INPUT_TOKENS) {
      throw new Error(
        `A chunk exceeds the safe input limit: ` +
          `${chunk.metadata.title} (~${estimatedTokens} estimated tokens).`,
      );
    }

    if (
      currentBatch.length >= BATCH_SIZE ||
      currentTokens + estimatedTokens > MAX_BATCH_TOKENS
    ) {
      if (currentBatch.length > 0) {
        batches.push(currentBatch);
      }

      currentBatch = [];
      currentTokens = 0;
    }

    currentBatch.push(chunk);
    currentTokens += estimatedTokens;
  }

  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  return batches;
}

async function embedWithRetry(values: string[]): Promise<number[][]> {
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await embedMany({
        model: embeddingModel,
        values,
        dimensions: EMBEDDING_DIMENSION,
      });

      return result.embeddings;
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }

      // Exponential backoff: 2s, 4s, 8s, 16s.
      const delayMs = 2_000 * 2 ** (attempt - 1);

      console.warn(
        `Embedding request failed (attempt ${attempt}/${maxAttempts}). ` +
          `Retrying in ${delayMs / 1_000}s...`,
      );

      await sleep(delayMs);
    }
  }

  throw new Error("Embedding failed after all retry attempts.");
}

async function main() {
  // 1. Parse and chunk the knowledge base.
  const chunks = await chunkKnowledgeBase();

  if (chunks.length === 0) {
    throw new Error("No chunks found in the knowledge base.");
  }

  const batches = buildBatches(chunks);

  console.log(`\nPreparing ${chunks.length} chunks for embedding.`);
  console.log("Embedding model:", EMBEDDING_MODEL_ID);
  console.log("Vector dimensions:", EMBEDDING_DIMENSION);
  console.log("Batch size:", BATCH_SIZE);
  console.log("Embedding requests required:", batches.length);
  console.log("Minimum request interval:", `${MIN_REQUEST_INTERVAL_MS}ms`);

  if (batches.length > MAX_DAILY_REQUESTS) {
    throw new Error(
      `This ingestion requires ${batches.length} requests, ` +
        `exceeding the configured daily budget of ${MAX_DAILY_REQUESTS}.`,
    );
  }

  // 2. Create the vector index if necessary.
  const indexes = await vectorStore.listIndexes();

  if (!indexes.includes(INDEX_NAME)) {
    await vectorStore.createIndex({
      indexName: INDEX_NAME,
      dimension: EMBEDDING_DIMENSION,
      metric: "cosine",
    });

    console.log(`Created vector index: ${INDEX_NAME}`);
  } else {
    const stats = await vectorStore.describeIndex({
      indexName: INDEX_NAME,
    });

    if (stats.dimension !== EMBEDDING_DIMENSION) {
      throw new Error(
        `Index dimension mismatch. Expected ${EMBEDDING_DIMENSION}, ` +
          `but found ${stats.dimension}.`,
      );
    }

    console.log(`Using existing index: ${INDEX_NAME}`);
  }

  // 3. Embed and store batches.
  let totalStored = 0;
  let requestCount = 0;
  let lastRequestTime = 0;

  for (const [batchIndex, batch] of batches.entries()) {
    // Wait before sending the next request.
    const elapsedMs = Date.now() - lastRequestTime;
    const waitMs = Math.max(0, MIN_REQUEST_INTERVAL_MS - elapsedMs);

    if (waitMs > 0 && requestCount > 0) {
      await sleep(waitMs);
    }

    if (requestCount >= MAX_DAILY_REQUESTS) {
      throw new Error(
        "Daily embedding request budget reached; stopping ingestion.",
      );
    }

    const values = batch.map((chunk) =>
      formatDocument(chunk.text, chunk.metadata.title),
    );

    lastRequestTime = Date.now();
    requestCount++;

    const embeddings = await embedWithRetry(values);

    if (
      embeddings.length !== batch.length ||
      embeddings.some((embedding) => embedding.length !== EMBEDDING_DIMENSION)
    ) {
      throw new Error(`Invalid embeddings in batch ${batchIndex + 1}.`);
    }

    await vectorStore.upsert({
      indexName: INDEX_NAME,
      vectors: embeddings,
      ids: batch.map((chunk) => chunk.id),
      metadata: batch.map((chunk) => ({
        text: chunk.text,
        ...chunk.metadata,
      })),
    });

    totalStored += batch.length;

    console.log(
      `Stored ${totalStored}/${chunks.length} chunks ` +
        `(request ${requestCount}/${batches.length})`,
    );
  }

  // 4. Verify the vector index.
  const stats = await vectorStore.describeIndex({
    indexName: INDEX_NAME,
  });

  console.log("\n✅ Ingestion completed successfully!");
  console.log("Chunks processed:", totalStored);
  console.log("Embedding requests:", requestCount);
  console.log("Index:", INDEX_NAME);
  console.log("Index dimensions:", stats.dimension);
  console.log("Total vectors in index:", stats.count);
}

main().catch((error) => {
  console.error("❌ Ingestion failed:", error);
  process.exitCode = 1;
});
