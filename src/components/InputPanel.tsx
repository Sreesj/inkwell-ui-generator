import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Wand2 } from "lucide-react";
import { Sketchpad } from "./Sketchpad";
import { toast } from "sonner";

export const InputPanel = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast("Please enter a prompt to generate UI");
      return;
    }

    setIsGenerating(true);
    toast("Generating your UI...", { 
      icon: <Wand2 className="w-4 h-4" />,
      duration: 2000 
    });

    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      toast("UI generated successfully!", { 
        icon: <Sparkles className="w-4 h-4" />,
        duration: 3000 
      });
    }, 2000);
  };

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <h2 className="font-medium text-foreground">Input</h2>
      </div>
      
      <div className="flex-1 p-4 space-y-6 overflow-auto">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Describe your UI
          </label>
          <Textarea
            placeholder="Create a modern dashboard with cards showing analytics, a sidebar navigation, and a clean header with user profile..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] resize-none bg-input border-border"
          />
        </div>

        <Sketchpad />

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Additional Options
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              React
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              TypeScript
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              Tailwind
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              Responsive
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-panel-border">
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="btn-generate w-full"
        >
          {isGenerating ? (
            <>
              <Wand2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate UI
            </>
          )}
        </Button>
      </div>
    </div>
  );
};