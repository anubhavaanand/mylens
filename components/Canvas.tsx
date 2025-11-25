"use client";

import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Connection,
  addEdge,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { SmartNode } from "@/components/SmartNode";
import { useGraphStore } from "@/store/graphStore";
import { useAutoLayout } from "@/hooks/useAutoLayout";

const nodeTypes = {
  smart: SmartNode,
};

interface CanvasProps {
  onExpandNode?: (nodeId: string, nodeLabel: string) => void;
}

export function Canvas({ onExpandNode }: CanvasProps) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setEdges,
    setSelectedNodeId,
  } = useGraphStore();

  // Apply auto-layout when graph structure changes
  useAutoLayout();

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges(addEdge(connection, edges));
    },
    [edges, setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: { id: string }) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  // Listen for expand node events
  useEffect(() => {
    const handleExpandNode = (event: CustomEvent<{ nodeId: string }>) => {
      const node = nodes.find((n) => n.id === event.detail.nodeId);
      if (node && onExpandNode) {
        onExpandNode(node.id, node.data.label);
      }
    };

    window.addEventListener(
      "expandNode",
      handleExpandNode as EventListener
    );
    return () => {
      window.removeEventListener(
        "expandNode",
        handleExpandNode as EventListener
      );
    };
  }, [nodes, onExpandNode]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
}
