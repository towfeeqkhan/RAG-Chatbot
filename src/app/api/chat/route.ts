import { handleChatStream } from "@mastra/ai-sdk";
import { mastra } from "@/mastra";
import { createUIMessageStreamResponse } from "ai";

export async function POST(req: Request) {
  const params = await req.json();

  const stream = await handleChatStream({
    mastra,
    agentId: "voltway-support-agent",
    version: "v7",
    params,
  });

  return createUIMessageStreamResponse({
    stream,
  });
}
