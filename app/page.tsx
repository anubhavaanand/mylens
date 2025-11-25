"use client";

import { useCallback, useRef } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { Canvas } from "@/components/Canvas";
import { Sidebar } from "@/components/Sidebar";
import { useGraphStore, type SmartNode } from "@/store/graphStore";
import { graphSchema } from "@/app/api/generate/schema";
import type { Edge } from "@xyflow/react";

export default function Home() {
  const {
    setNodes,
    setEdges,
    addNode,
    addEdge,
    setIsGenerating,
    visualizationType,
    nodes,
    saveToHistory,
  } = useGraphStore();

  // Ref to track which node is being expanded
  const expandingNodeRef = useRef<{ id: string; label: string } | null>(null);

  // Hook for initial generation
  const { submit: submitGenerate } = useObject({
    api: "/api/generate",
    schema: graphSchema,
    onFinish: ({ object }) => {
      if (object) {
        saveToHistory();
        // Transform the graph data to React Flow format
        const newNodes: SmartNode[] = object.nodes.map((node) => ({
          id: node.id,
          type: "smart",
          position: { x: 0, y: 0 }, // Will be calculated by auto-layout
          data: {
            label: node.label,
            content: node.content,
            nodeType: node.type ?? "concept",
          },
        }));

        const newEdges: Edge[] = object.edges.map((edge, index) => ({
          id: `edge-${index}`,
          source: edge.source,
          target: edge.target,
          label: edge.label,
        }));

        setNodes(newNodes);
        setEdges(newEdges);
      }
      setIsGenerating(false);
    },
    onError: (error) => {
      console.error("Generation error:", error);
      setIsGenerating(false);
    },
  });

  // Hook for node expansion
  const { submit: submitExpand } = useObject({
    api: "/api/generate",
    schema: graphSchema,
    onFinish: ({ object }) => {
      const expandingNode = expandingNodeRef.current;
      if (object && expandingNode) {
        saveToHistory();
        // Add new nodes with positions relative to parent
        const parentNode = nodes.find((n) => n.id === expandingNode.id);
        const baseX = parentNode?.position.x ?? 0;
        const baseY = parentNode?.position.y ?? 200;

        object.nodes.forEach((node, index) => {
          const newNode: SmartNode = {
            id: `${expandingNode.id}-${node.id}`,
            type: "smart",
            position: {
              x: baseX + (index - object.nodes.length / 2) * 280,
              y: baseY + 200,
            },
            data: {
              label: node.label,
              content: node.content,
              nodeType: node.type ?? "concept",
            },
          };
          addNode(newNode);
        });

        // Add edges from parent to new nodes
        object.edges.forEach((edge, index) => {
          const newEdge: Edge = {
            id: `expanded-edge-${expandingNode.id}-${index}`,
            source: edge.source === "PARENT_NODE" ? expandingNode.id : edge.source,
            target: `${expandingNode.id}-${edge.target}`,
            label: edge.label,
          };
          addEdge(newEdge);
        });

        expandingNodeRef.current = null;
      }
      setIsGenerating(false);
    },
    onError: (error) => {
      console.error("Expand error:", error);
      expandingNodeRef.current = null;
      setIsGenerating(false);
    },
  });

  const handleGenerate = useCallback(
    (content: string) => {
      setIsGenerating(true);
      submitGenerate({
        content,
        visualizationType,
      });
    },
    [submitGenerate, visualizationType, setIsGenerating]
  );

  const handleExpandNode = useCallback(
    (nodeId: string, nodeLabel: string) => {
      expandingNodeRef.current = { id: nodeId, label: nodeLabel };
      setIsGenerating(true);
      submitExpand({
        content: "",
        visualizationType,
        expandNodeId: nodeId,
        expandNodeLabel: nodeLabel,
      });
    },
    [submitExpand, visualizationType, setIsGenerating]
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar onGenerate={handleGenerate} />
      <main className="flex-1 bg-background">
        <Canvas onExpandNode={handleExpandNode} />
      </main>
    </div>
  );
}
