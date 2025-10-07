// apps/studio/app/studio/page.tsx
'use client';

import { StealthStudio } from '@/components/studio/stealth-studio';
import { IntelligenceSidebar } from '@/components/studio/intelligence-sidebar';
import { LivePreviewPane } from '@/components/studio/live-preview-pane';
import { CodeEditor } from '@/components/studio/code-editor';
import { useStealthDI } from '@/hooks/use-stealth-di';

export default function StudioPage() {
  const { diModel, project, preview } = useStealthDI();

  return (
    <div className="h-screen flex bg-stealth-black">
      {/* Intelligence Sidebar */}
      <IntelligenceSidebar />
      
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        <StealthStudio.Header />
        <div className="flex-1 flex">
          <CodeEditor />
          <LivePreviewPane />
        </div>
        <StealthStudio.StatusBar />
      </div>
      
      {/* Intelligence Director Panel */}
      <StealthStudio.DirectorPanel />
    </div>
  );
}