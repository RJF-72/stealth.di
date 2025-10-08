"use strict";
// apps/studio/app/studio/page.tsx
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StudioPage;
const stealth_studio_1 = require("@/components/studio/stealth-studio");
const intelligence_sidebar_1 = require("@/components/studio/intelligence-sidebar");
const live_preview_pane_1 = require("@/components/studio/live-preview-pane");
const code_editor_1 = require("@/components/studio/code-editor");
const use_stealth_di_1 = require("@/hooks/use-stealth-di");
function StudioPage() {
    const { diModel, project, preview } = (0, use_stealth_di_1.useStealthDI)();
    return (<div className="h-screen flex bg-stealth-black">
      {/* Intelligence Sidebar */}
      <intelligence_sidebar_1.IntelligenceSidebar />
      
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        <stealth_studio_1.StealthStudio.Header />
        <div className="flex-1 flex">
          <code_editor_1.CodeEditor />
          <live_preview_pane_1.LivePreviewPane />
        </div>
        <stealth_studio_1.StealthStudio.StatusBar />
      </div>
      
      {/* Intelligence Director Panel */}
      <stealth_studio_1.StealthStudio.DirectorPanel />
    </div>);
}
//# sourceMappingURL=studio-page.js.map