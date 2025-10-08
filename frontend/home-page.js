"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
// apps/web-app/app/page.tsx
const stealth_hero_1 = require("@/components/stealth-hero");
const feature_showcase_1 = require("@/components/feature-showcase");
const live_demo_1 = require("@/components/live-demo");
const pricing_1 = require("@/components/pricing");
function HomePage() {
    return (<div className="min-h-screen bg-gradient-to-br from-stealth-black via-stealth-surface to-stealth-black">
      <stealth_hero_1.StealthHero />
      <live_demo_1.LiveDemo />
      <feature_showcase_1.FeatureShowcase />
      <pricing_1.Pricing />
    </div>);
}
//# sourceMappingURL=home-page.js.map