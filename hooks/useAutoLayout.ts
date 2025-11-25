"use client";

import { useEffect, useRef, useCallback } from "react";
import { useGraphStore } from "@/store/graphStore";
import { getLayoutedElements } from "@/lib/layout";

/** Debounce delay for layout recalculation to prevent excessive updates during rapid graph changes */
const LAYOUT_DEBOUNCE_MS = 150;

export function useAutoLayout() {
  const { nodes, edges, visualizationType, setNodes } = useGraphStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevNodesLength = useRef(nodes.length);
  const prevEdgesLength = useRef(edges.length);
  const isLayoutingRef = useRef(false);

  const applyLayout = useCallback(async () => {
    if (nodes.length === 0 || isLayoutingRef.current) {
      return;
    }

    isLayoutingRef.current = true;

    try {
      const { nodes: layoutedNodes } = await getLayoutedElements(
        nodes,
        edges,
        visualizationType
      );
      setNodes(layoutedNodes);
    } catch (error) {
      console.error("Auto-layout error:", error);
    } finally {
      isLayoutingRef.current = false;
    }
  }, [nodes, edges, visualizationType, setNodes]);

  useEffect(() => {
    // Only trigger layout when structure changes (nodes/edges added/removed)
    const nodesChanged = nodes.length !== prevNodesLength.current;
    const edgesChanged = edges.length !== prevEdgesLength.current;

    if (nodesChanged || edgesChanged) {
      prevNodesLength.current = nodes.length;
      prevEdgesLength.current = edges.length;

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Debounce the layout calculation
      timeoutRef.current = setTimeout(() => {
        applyLayout();
      }, LAYOUT_DEBOUNCE_MS);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [nodes.length, edges.length, applyLayout]);

  return { applyLayout };
}
