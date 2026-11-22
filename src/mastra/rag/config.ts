import "dotenv/config";
import path from "node:path";
import { LibSQLVector } from "@mastra/libsql";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const dbPath = process.env.KNOWLEDGE_DB_PATH;
const googleApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!dbPath) {
  throw new Error("KNOWLEDGE_DB_PATH is missing from your .env file.");
}

if (!googleApiKey) {
  throw new Error(
    "GOOGLE_GENERATIVE_AI_API_KEY is missing from your .env file.",
  );
}

// Absolute path to the company knowledge-base directory.
export const KB_DIR = path.resolve(
  process.cwd(),
  "src",
  "mastra",
  "rag",
  "knowledge-base",
);

// Keep the database path absolute so Next.js and Mastra Studio
// can open the same database file.
export const DB_PATH = path.resolve(dbPath);

export const EMBEDDING_MODEL_ID = "gemini-embedding-2";
export const EMBEDDING_DIMENSION = 768;
export const INDEX_NAME = "voltway_knowledge";

const google = createGoogleGenerativeAI({
  apiKey: googleApiKey,
});

export const embeddingModel = google.embedding(EMBEDDING_MODEL_ID);

export const vectorStore = new LibSQLVector({
  id: "voltway-knowledge-vectors",
  url: `file:${DB_PATH.replace(/\\/g, "/")}`,
});
