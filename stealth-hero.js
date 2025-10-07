"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StealthHero = StealthHero;
// apps/web-app/app/page.tsx - Hero Section
function StealthHero() {
    return (<section className="relative min-h-screen flex items-center justify-center">
      <MatrixBackground />
      
      <div className="text-center z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="text-stealth-primary">Stealth</span>
          <span className="text-stealth-white">.</span>
          <span className="text-stealth-accent">DI</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-stealth-muted mb-8 max-w-2xl mx-auto">
          Directed Intelligence for Autonomous Development.
          <br />
          <span className="text-stealth-primary">
            Build faster. Code smarter. Deploy instantly.
          </span>
        </p>

        <div className="flex gap-4 justify-center">
          <button className="stealth-btn primary text-lg px-8 py-4">
            🚀 Start Building Free
          </button>
          <button className="stealth-btn outline text-lg px-8 py-4">
            🎯 See Live Demo
          </button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl text-stealth-primary">⚡</div>
            <h3 className="text-stealth-white font-semibold">Instant Setup</h3>
            <p className="text-stealth-muted">No configuration needed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl text-stealth-primary">🧠</div>
            <h3 className="text-stealth-white font-semibold">SOTA Intelligence</h3>
            <p className="text-stealth-muted">Compressed CodeFont technology</p>
          </div>
          <div className="text-center">
            <div className="text-3xl text-stealth-primary">👁️</div>
            <h3 className="text-stealth-white font-semibold">Live Preview</h3>
            <p className="text-stealth-muted">See changes in real-time</p>
          </div>
        </div>
      </div>
    </section>);
}
//# sourceMappingURL=stealth-hero.js.map