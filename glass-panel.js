"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlassPanel = GlassPanel;
// packages/ui-components/src/glass-panel.tsx
const react_1 = __importDefault(require("react"));
const utils_1 = require("@/lib/utils");
function GlassPanel({ children, className, intensity = 'medium' }) {
    const intensityClasses = {
        low: 'bg-stealth-surface/30 backdrop-blur-stealth',
        medium: 'bg-stealth-surface/50 backdrop-blur-stealth border border-stealth-primary/20',
        high: 'bg-stealth-surface/70 backdrop-blur-stealth border border-stealth-primary/30'
    };
    return (<div className={(0, utils_1.cn)('rounded-xl p-6 transition-all duration-300 hover:border-stealth-primary/40', intensityClasses[intensity], className)}>
      {children}
    </div>);
}
//# sourceMappingURL=glass-panel.js.map