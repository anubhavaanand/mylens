import { z } from "zod";

export const graphNodeSchema = z.object({
  id: z.string().describe("Unique UUID for the node"),
  label: z.string().describe("The main concept or title"),
  type: z
    .enum(["concept", "root", "note"])
    .default("concept")
    .describe("Node type for visual hierarchy"),
  content: z
    .string()
    .describe("A brief summary or definition (Markdown supported)"),
});

export const graphEdgeSchema = z.object({
  source: z.string().describe("ID of the source node"),
  target: z.string().describe("ID of the target node"),
  label: z.string().optional().describe("Relationship description"),
});

export const graphSchema = z.object({
  nodes: z.array(graphNodeSchema),
  edges: z.array(graphEdgeSchema),
});

export type GraphNode = z.infer<typeof graphNodeSchema>;
export type GraphEdge = z.infer<typeof graphEdgeSchema>;
export type GraphData = z.infer<typeof graphSchema>;
