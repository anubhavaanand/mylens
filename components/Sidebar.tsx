"use client";

import { useState } from "react";
import {
  Brain,
  Clock,
  LayoutGrid,
  Trash2,
  Undo,
  Redo,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGraphStore, type VisualizationType } from "@/store/graphStore";

interface SidebarProps {
  onGenerate: (content: string) => void;
}

const visualizationTypes: {
  type: VisualizationType;
  label: string;
  icon: typeof Brain;
  description: string;
}[] = [
  {
    type: "mindmap",
    label: "Mind Map",
    icon: Brain,
    description: "Hierarchical concept visualization",
  },
  {
    type: "timeline",
    label: "Timeline",
    icon: Clock,
    description: "Chronological event sequence",
  },
  {
    type: "quadrant",
    label: "Quadrant",
    icon: LayoutGrid,
    description: "2x2 matrix categorization",
  },
];

const examplePrompts = [
  {
    label: "Machine Learning",
    content:
      "Machine Learning is a subset of AI that enables computers to learn from data. Key types include supervised learning (using labeled data), unsupervised learning (finding patterns), and reinforcement learning (learning through rewards).",
  },
  {
    label: "Water Cycle",
    content:
      "The water cycle involves evaporation from bodies of water, condensation into clouds, precipitation as rain or snow, and collection in rivers, lakes, and oceans. This continuous cycle is essential for life on Earth.",
  },
  {
    label: "Project Management",
    content:
      "Project Management involves five phases: initiation (defining scope), planning (creating roadmap), execution (doing the work), monitoring (tracking progress), and closure (completing deliverables). Key methodologies include Agile, Scrum, and Waterfall.",
  },
];

export function Sidebar({ onGenerate }: SidebarProps) {
  const [content, setContent] = useState("");
  const {
    visualizationType,
    setVisualizationType,
    isGenerating,
    clearGraph,
    undo,
    redo,
    history,
    historyIndex,
    nodes,
  } = useGraphStore();

  const handleGenerate = () => {
    if (content.trim()) {
      onGenerate(content);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <aside className="w-80 border-r bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          Visual Intelligence
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Transform text into interactive diagrams
        </p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Input Section */}
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm">Input Content</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter text, paste notes, or describe a concept..."
              className="w-full h-32 px-3 py-2 text-sm rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button
              className="w-full mt-3"
              onClick={handleGenerate}
              disabled={!content.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4" />
                  Generate Diagram
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Visualization Type Selector */}
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm">Visualization Type</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {visualizationTypes.map(({ type, label, icon: Icon, description }) => (
              <button
                key={type}
                onClick={() => setVisualizationType(type)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors",
                  visualizationType === type
                    ? "border-primary bg-primary/5"
                    : "border-transparent hover:bg-accent"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5",
                  visualizationType === type
                    ? "text-primary"
                    : "text-muted-foreground"
                )} />
                <div>
                  <p className="font-medium text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Quick Examples */}
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm">Quick Examples</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {examplePrompts.map((example) => (
              <button
                key={example.label}
                onClick={() => setContent(example.content)}
                className="w-full text-left text-sm p-2 rounded-md hover:bg-accent transition-colors"
              >
                {example.label}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t space-y-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={undo}
            disabled={!canUndo}
          >
            <Undo className="h-4 w-4" />
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={redo}
            disabled={!canRedo}
          >
            <Redo className="h-4 w-4" />
            Redo
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={clearGraph}
          disabled={nodes.length === 0}
        >
          <Trash2 className="h-4 w-4" />
          Clear Canvas
        </Button>
        <div className="text-xs text-muted-foreground text-center">
          {nodes.length} nodes on canvas
        </div>
      </div>
    </aside>
  );
}
