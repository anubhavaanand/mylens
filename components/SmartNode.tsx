"use client";

import { memo, useCallback } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SmartNodeData } from "@/store/graphStore";

interface SmartNodeProps extends NodeProps {
  data: SmartNodeData;
}

function SmartNodeComponent({ data, id, selected }: SmartNodeProps) {
  const { label, content, nodeType } = data;

  const handleExpand = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      // Dispatch custom event for expansion
      const event = new CustomEvent("expandNode", { detail: { nodeId: id } });
      window.dispatchEvent(event);
    },
    [id]
  );

  const isRoot = nodeType === "root";
  const isNote = nodeType === "note";

  return (
    <div className="relative">
      {/* Input handle */}
      {!isRoot && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-3 !h-3 !bg-primary !border-2 !border-background"
        />
      )}

      <Card
        className={cn(
          "min-w-[200px] max-w-[300px] shadow-md transition-all duration-200",
          selected && "ring-2 ring-primary ring-offset-2",
          isRoot && "bg-primary/5 border-primary border-2",
          isNote && "bg-muted/50 border-dashed"
        )}
      >
        <CardHeader className="py-3 px-4 gap-1">
          <CardTitle
            className={cn(
              "text-sm leading-tight",
              isRoot && "text-primary font-bold text-base",
              isNote && "text-muted-foreground font-normal"
            )}
          >
            {label}
          </CardTitle>
        </CardHeader>

        {content && (
          <CardContent className="py-2 px-4">
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
              {content}
            </p>
          </CardContent>
        )}

        {/* Expand button for leaf nodes */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <Button
            variant="secondary"
            size="icon"
            className="h-6 w-6 rounded-full shadow-md hover:bg-primary hover:text-primary-foreground"
            onClick={handleExpand}
            title="Expand with AI"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />
    </div>
  );
}

export const SmartNode = memo(SmartNodeComponent);
