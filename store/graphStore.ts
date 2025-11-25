import { create } from "zustand";
import {
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";

export type VisualizationType = "mindmap" | "timeline" | "quadrant";

export interface SmartNodeData extends Record<string, unknown> {
  label: string;
  content: string;
  nodeType: "root" | "concept" | "note";
}

export type SmartNode = Node<SmartNodeData, "smart">;

export interface GraphState {
  nodes: SmartNode[];
  edges: Edge[];
  visualizationType: VisualizationType;
  isGenerating: boolean;
  selectedNodeId: string | null;
  history: Array<{ nodes: SmartNode[]; edges: Edge[] }>;
  historyIndex: number;
}

export interface GraphActions {
  setNodes: (nodes: SmartNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange<SmartNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
  addNode: (node: SmartNode) => void;
  addEdge: (edge: Edge) => void;
  setVisualizationType: (type: VisualizationType) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setSelectedNodeId: (id: string | null) => void;
  updateNodePositions: (positions: Map<string, { x: number; y: number }>) => void;
  clearGraph: () => void;
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
}

const initialState: GraphState = {
  nodes: [],
  edges: [],
  visualizationType: "mindmap",
  isGenerating: false,
  selectedNodeId: null,
  history: [],
  historyIndex: -1,
};

export const useGraphStore = create<GraphState & GraphActions>((set, get) => ({
  ...initialState,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as SmartNode[],
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },

  addEdge: (edge) => {
    set((state) => ({
      edges: [...state.edges, edge],
    }));
  },

  setVisualizationType: (visualizationType) => set({ visualizationType }),

  setIsGenerating: (isGenerating) => set({ isGenerating }),

  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),

  updateNodePositions: (positions) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        const newPosition = positions.get(node.id);
        if (newPosition) {
          return { ...node, position: newPosition };
        }
        return node;
      }),
    }));
  },

  clearGraph: () => {
    get().saveToHistory();
    set({ nodes: [], edges: [] });
  },

  saveToHistory: () => {
    const { nodes, edges, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      nodes: structuredClone(nodes),
      edges: structuredClone(edges),
    });
    // Keep only last 50 history items
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      set({
        nodes: prevState.nodes,
        edges: prevState.edges,
        historyIndex: historyIndex - 1,
      });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      set({
        nodes: nextState.nodes,
        edges: nextState.edges,
        historyIndex: historyIndex + 1,
      });
    }
  },
}));
