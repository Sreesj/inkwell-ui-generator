import { Monitor, Smartphone, Tablet, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const PreviewPanel = () => {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const viewModes = [
    { id: "desktop", icon: Monitor, label: "Desktop" },
    { id: "tablet", icon: Tablet, label: "Tablet" },
    { id: "mobile", icon: Smartphone, label: "Mobile" },
  ] as const;

  const getPreviewStyles = () => {
    switch (viewMode) {
      case "mobile":
        return "w-[375px] h-[667px]";
      case "tablet":
        return "w-[768px] h-[1024px]";
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header flex items-center justify-between">
        <span>Live Preview</span>
        <div className="flex items-center gap-1">
          {viewModes.map((mode) => (
            <Button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              variant={viewMode === mode.id ? "default" : "ghost"}
              size="sm"
              className="h-7 px-2"
            >
              <mode.icon className="w-3 h-3" />
            </Button>
          ))}
          <Button variant="ghost" size="sm" className="h-7 px-2 ml-1">
            <RefreshCw className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="h-full flex items-center justify-center">
          <div 
            className={`${getPreviewStyles()} bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300`}
          >
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center space-y-4 p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full mx-auto flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Preview Ready
                  </h3>
                  <p className="text-sm text-gray-600 max-w-sm">
                    Your generated UI will appear here. Start by describing your interface and click Generate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};