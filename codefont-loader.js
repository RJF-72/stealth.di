"use strict";
// apps/studio/components/codefont-loader.tsx
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeFontLoader = CodeFontLoader;
const react_1 = require("react");
const use_stealth_di_1 = require("@/hooks/use-stealth-di");
const AVAILABLE_CODEFONTS = [
    {
        id: 'coding_pro',
        name: 'CODEGENIUS_X.cf',
        domain: 'software_development',
        description: 'Autonomous coding intelligence',
        size: '52MB',
        capabilities: ['Code Generation', 'Architecture Design', 'Testing']
    },
    {
        id: 'visual_genius',
        name: 'VISUAL_GENIUS_PRO.cf',
        domain: 'visual_asset_generation',
        description: 'World-class image and asset creation',
        size: '48MB',
        capabilities: ['Image Generation', 'Icon Design', 'Logo Creation']
    },
    {
        id: 'content_creator',
        name: 'CONTENT_CREATOR_PRO.cf',
        domain: 'content_creation',
        description: 'Professional writing and content',
        size: '45MB',
        capabilities: ['Documentation', 'Copywriting', 'Technical Writing']
    }
];
function CodeFontLoader() {
    const { diModel, loadedCodeFonts } = (0, use_stealth_di_1.useStealthDI)();
    const [loading, setLoading] = (0, react_1.useState)([]);
    const loadCodeFont = async (codefontId) => {
        setLoading(prev => [...prev, codefontId]);
        try {
            await diModel.loadCodeFont(codefontId);
        }
        finally {
            setLoading(prev => prev.filter(id => id !== codefontId));
        }
    };
    const isLoaded = (codefontId) => loadedCodeFonts.some(cf => cf.id === codefontId);
    const isLoading = (codefontId) => loading.includes(codefontId);
    return (<div className="glass-panel medium">
      <h3 className="text-stealth-primary mb-4">🧠 Available CodeFonts</h3>
      
      <div className="space-y-3">
        {AVAILABLE_CODEFONTS.map((codefont) => (<div key={codefont.id} className={`p-4 rounded-lg border transition-all ${isLoaded(codefont.id)
                ? 'border-stealth-primary bg-stealth-primary/10'
                : 'border-stealth-border hover:border-stealth-accent'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-stealth-white">
                  {codefont.name}
                </h4>
                <p className="text-sm text-stealth-muted">
                  {codefont.description}
                </p>
                <div className="flex gap-2 mt-2">
                  {codefont.capabilities.map((capability) => (<span key={capability} className="px-2 py-1 text-xs bg-stealth-surface rounded">
                      {capability}
                    </span>))}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-stealth-muted mb-2">
                  {codefont.size}
                </div>
                <button onClick={() => loadCodeFont(codefont.id)} disabled={isLoaded(codefont.id) || isLoading(codefont.id)} className={`stealth-btn ${isLoaded(codefont.id) ? 'success' : 'primary'}`}>
                  {isLoading(codefont.id) && '🔄 Loading...'}
                  {isLoaded(codefont.id) && '✅ Loaded'}
                  {!isLoaded(codefont.id) && !isLoading(codefont.id) && '🚀 Load'}
                </button>
              </div>
            </div>
          </div>))}
      </div>
      
      {/* Loaded CodeFonts Status */}
      <div className="mt-4 p-3 bg-stealth-surface rounded">
        <h4 className="text-stealth-accent mb-2">Loaded Intelligence</h4>
        <div className="flex gap-2 flex-wrap">
          {loadedCodeFonts.map((cf) => (<span key={cf.id} className="px-3 py-1 bg-stealth-primary/20 text-stealth-primary rounded-full text-sm">
              {cf.name} ✅
            </span>))}
          {loadedCodeFonts.length === 0 && (<span className="text-stealth-muted text-sm">
              No CodeFonts loaded yet
            </span>)}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=codefont-loader.js.map