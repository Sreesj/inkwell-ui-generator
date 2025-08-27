import { Header } from "@/components/Header";
import { InputPanel } from "@/components/InputPanel";
import { CodePreview } from "@/components/CodePreview";
import { PreviewPanel } from "@/components/PreviewPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-4">
        <div className="layout-grid">
          {/* Left Panel - Inputs */}
          <InputPanel />
          
          {/* Middle Panel - Code */}
          <CodePreview />
          
          {/* Right Panel - Preview */}
          <PreviewPanel />
        </div>
      </main>
    </div>
  );
};

export default Index;
