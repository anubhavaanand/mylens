import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { graphSchema } from "./schema";

export const runtime = "edge";

interface GenerateRequest {
  content: string;
  visualizationType: "mindmap" | "timeline" | "quadrant";
  expandNodeId?: string;
  expandNodeLabel?: string;
}

function getSystemPrompt(visualizationType: string): string {
  const basePrompt = `You are an expert knowledge architect. Transform the user's input into a structured knowledge graph. Decompose complex ideas into atomic concepts linked by hierarchical or causal relationships.

Generate unique IDs for each node using a format like "node-1", "node-2", etc.
The first node should be the root node with type "root".
All other nodes should have type "concept" unless they are brief notes which should have type "note".
Provide a brief, informative content description for each node (1-2 sentences, supports Markdown).`;

  switch (visualizationType) {
    case "mindmap":
      return `${basePrompt}

For Mind Maps: Focus on hierarchical expansion. Create a root concept in the center with sub-concepts branching out. Organize information in a tree-like structure with clear parent-child relationships.`;
    case "timeline":
      return `${basePrompt}

For Timelines: Identify dates and chronological events. Connect them linearly. Structure the graph to show temporal progression with nodes representing key events or milestones.`;
    case "quadrant":
      return `${basePrompt}

For Quadrants: Identify two opposing axes (e.g., Impact vs Effort, Urgency vs Importance) and categorize entities into four distinct groups. Create nodes that represent items in each quadrant.`;
    default:
      return basePrompt;
  }
}

function getExpandPrompt(nodeLabel: string): string {
  return `Expand on the concept: "${nodeLabel}"

Generate 3-5 child nodes that are direct subconcepts, examples, or related ideas of this concept.
Each child node should have:
- A unique ID (e.g., "expanded-1", "expanded-2")
- A concise label (2-5 words)
- Type "concept"
- Brief content (1-2 sentences)

Also generate edges from a source node with id "PARENT_NODE" to each of the new child nodes.`;
}

export async function POST(req: Request) {
  try {
    const body: GenerateRequest = await req.json();
    const { content, visualizationType, expandNodeId, expandNodeLabel } = body;

    if (!content && !expandNodeLabel) {
      return new Response(
        JSON.stringify({ error: "Content or expandNodeLabel is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const isExpanding = !!expandNodeId && !!expandNodeLabel;
    const systemPrompt = isExpanding
      ? getExpandPrompt(expandNodeLabel)
      : getSystemPrompt(visualizationType);

    const userPrompt = isExpanding
      ? `Expand on: ${expandNodeLabel}`
      : `Transform this content into a knowledge graph:\n\n${content}`;

    const result = streamObject({
      model: openai("gpt-4o-mini"),
      schema: graphSchema,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Generate API error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
