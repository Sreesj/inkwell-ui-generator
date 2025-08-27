import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-16 bg-[hsl(var(--header-background))] border-b border-[hsl(var(--panel-border))] flex items-center px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-accent-purple to-accent-blue rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Inkwell</h1>
          <p className="text-xs text-muted-foreground">AI UI Generator</p>
        </div>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <div className="text-xs text-muted-foreground">
          Ready to generate
        </div>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
      </div>
    </header>
  );
};