"use strict";
// apps/studio/components/asset-preview.tsx
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetPreview = AssetPreview;
const use_stealth_di_1 = require("@/hooks/use-stealth-di");
function AssetPreview() {
    const { assets, imageCodeFont } = (0, use_stealth_di_1.useStealthDI)();
    return (<div className="glass-panel high">
      <h3 className="text-stealth-primary mb-4">🖼️ Generated Assets</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Logo Preview */}
        <div className="asset-card">
          <h4 className="text-stealth-accent">🎨 Logo</h4>
          <img src={assets.branding?.logo?.preview} alt="Generated Logo" className="w-32 h-32 object-contain mx-auto"/>
          <div className="format-tags">
            <span className="tag">PNG</span>
            <span className="tag">SVG</span>
            <span className="tag">ICO</span>
          </div>
        </div>
        
        {/* Icons Preview */}
        <div className="asset-card">
          <h4 className="text-stealth-accent">📱 Icons</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {assets.icons?.map((icon, index) => (<img key={index} src={icon.preview} alt={icon.name} className="w-8 h-8 object-contain"/>))}
          </div>
        </div>
        
        {/* Favicon Preview */}
        <div className="asset-card">
          <h4 className="text-stealth-accent">🌐 Favicon</h4>
          <div className="flex gap-2 justify-center">
            {assets.favicons?.map((favicon, index) => (<div key={index} className="text-center">
                <img src={favicon.preview} alt={`${favicon.size}x${favicon.size}`} className="w-8 h-8 object-contain mx-auto"/>
                <span className="text-xs text-stealth-muted">
                  {favicon.size}px
                </span>
              </div>))}
          </div>
        </div>
        
        {/* Color Palette */}
        <div className="asset-card">
          <h4 className="text-stealth-accent">🎨 Colors</h4>
          <div className="flex gap-1 justify-center">
            {assets.branding?.color_palette?.map((color, index) => (<div key={index} className="w-6 h-6 rounded" style={{ backgroundColor: color }} title={color}/>))}
          </div>
        </div>
      </div>
      
      {/* Asset Generation Controls */}
      <div className="mt-4 flex gap-2">
        <button className="stealth-btn primary" onClick={() => imageCodeFont.regenerateAssets()}>
          🔄 Regenerate Assets
        </button>
        <button className="stealth-btn outline" onClick={() => imageCodeFont.downloadAssetPackage()}>
          📦 Download All
        </button>
      </div>
    </div>);
}
//# sourceMappingURL=asset-preview.copy.js.map