import ELK, { type ElkNode, type ElkExtendedEdge } from "elkjs/lib/elk.bundled";
import type { Edge } from "@xyflow/react";
import type { VisualizationType, SmartNode } from "@/store/graphStore";

const elk = new ELK();

// Default node dimensions
const NODE_WIDTH = 250;
const NODE_HEIGHT = 150;

interface LayoutOptions {
  direction?: "DOWN" | "RIGHT" | "UP" | "LEFT";
  nodeSpacing?: number;
  layerSpacing?: number;
}

function getLayoutOptions(
  visualizationType: VisualizationType,
  options: LayoutOptions = {}
): Record<string, string> {
  const {
    direction = "DOWN",
    nodeSpacing = 80,
    layerSpacing = 100,
  } = options;

  const baseOptions: Record<string, string> = {
    "elk.spacing.nodeNode": String(nodeSpacing),
    "elk.layered.spacing.nodeNodeBetweenLayers": String(layerSpacing),
  };

  switch (visualizationType) {
    case "mindmap":
      return {
        ...baseOptions,
        "elk.algorithm": "layered",
        "elk.direction": direction,
        "elk.layered.nodePlacement.strategy": "SIMPLE",
        "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
      };
    case "timeline":
      return {
        ...baseOptions,
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.layered.nodePlacement.strategy": "LINEAR_SEGMENTS",
      };
    case "quadrant":
      return {
        ...baseOptions,
        "elk.algorithm": "box",
        "elk.box.packingMode": "BOX_PER_ROW",
        "elk.aspectRatio": "1.0",
      };
    default:
      return {
        ...baseOptions,
        "elk.algorithm": "layered",
        "elk.direction": direction,
      };
  }
}

export async function getLayoutedElements(
  nodes: SmartNode[],
  edges: Edge[],
  visualizationType: VisualizationType = "mindmap",
  options: LayoutOptions = {}
): Promise<{ nodes: SmartNode[]; edges: Edge[] }> {
  if (nodes.length === 0) {
    return { nodes: [], edges: [] };
  }

  const elkNodes: ElkNode[] = nodes.map((node) => ({
    id: node.id,
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
  }));

  const elkEdges: ElkExtendedEdge[] = edges.map((edge) => ({
    id: edge.id,
    sources: [edge.source],
    targets: [edge.target],
  }));

  const layoutOptions = getLayoutOptions(visualizationType, options);

  const graph: ElkNode = {
    id: "root",
    layoutOptions,
    children: elkNodes,
    edges: elkEdges,
  };

  try {
    const layout = await elk.layout(graph);

    if (!layout.children) {
      return { nodes, edges };
    }

    const layoutedNodes: SmartNode[] = nodes.map((node) => {
      const elkNode = layout.children?.find((n) => n.id === node.id);
      if (elkNode && elkNode.x !== undefined && elkNode.y !== undefined) {
        return {
          ...node,
          position: {
            x: elkNode.x,
            y: elkNode.y,
          },
        };
      }
      return node;
    });

    return {
      nodes: layoutedNodes,
      edges,
    };
  } catch (error) {
    console.error("ELK layout error:", error);
    return { nodes, edges };
  }
}

export { NODE_WIDTH, NODE_HEIGHT };
