import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush } from "fabric";
import { Pencil, Square, Circle as CircleIcon, Eraser, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Sketchpad = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<"draw" | "rectangle" | "circle" | "erase">("draw");

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 350,
      height: 280,
      backgroundColor: "hsl(var(--sketchpad-background))",
    });

    // Initialize the freeDrawingBrush
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = "#374151";
    canvas.freeDrawingBrush.width = 2;

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw" || activeTool === "erase";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = "#374151";
      fabricCanvas.freeDrawingBrush.width = 2;
    } else if (activeTool === "erase" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = "hsl(var(--sketchpad-background))";
      fabricCanvas.freeDrawingBrush.width = 8;
    }
  }, [activeTool, fabricCanvas]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (tool === "rectangle") {
      const rect = new Rect({
        left: 50,
        top: 50,
        fill: "transparent",
        stroke: "#374151",
        strokeWidth: 2,
        width: 100,
        height: 60,
      });
      fabricCanvas?.add(rect);
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 50,
        top: 50,
        fill: "transparent",
        stroke: "#374151",
        strokeWidth: 2,
        radius: 40,
      });
      fabricCanvas?.add(circle);
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "hsl(var(--sketchpad-background))";
    fabricCanvas.renderAll();
    toast("Sketchpad cleared");
  };

  const tools = [
    { id: "draw", icon: Pencil, label: "Draw" },
    { id: "rectangle", icon: Square, label: "Rectangle" },
    { id: "circle", icon: CircleIcon, label: "Circle" },
    { id: "erase", icon: Eraser, label: "Erase" },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Sketch Your Idea</h3>
        <Button
          onClick={handleClear}
          variant="outline"
          size="sm"
          className="h-8 px-2"
        >
          <RotateCcw className="w-3 h-3" />
        </Button>
      </div>
      
      <div className="flex gap-1 p-1 bg-muted rounded-lg">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            onClick={() => handleToolClick(tool.id)}
            variant={activeTool === tool.id ? "default" : "ghost"}
            size="sm"
            className="h-8 px-2 flex-1"
          >
            <tool.icon className="w-3 h-3" />
          </Button>
        ))}
      </div>

      <div className="border border-panel-border rounded-lg overflow-hidden bg-sketchpad-bg">
        <canvas 
          ref={canvasRef} 
          className="block"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
        />
      </div>
    </div>
  );
};