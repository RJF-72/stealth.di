"use strict";
// apps/web-app/providers/stealth-di-provider.tsx
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStealthDI = void 0;
exports.StealthDIProvider = StealthDIProvider;
const react_1 = __importStar(require("react"));
const core_1 = require("@stealth-di/core");
const StealthDIContext = (0, react_1.createContext)(undefined);
function StealthDIProvider({ children }) {
    const [diModel, setDiModel] = (0, react_1.useState)(null);
    const [loadedCodeFonts, setLoadedCodeFonts] = (0, react_1.useState)([]);
    const [isInitialized, setIsInitialized] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        initializeDIModel();
    }, []);
    const initializeDIModel = async () => {
        try {
            const model = new core_1.StealthMultiCodeFontDIModel();
            await model.initialize();
            setDiModel(model);
            setIsInitialized(true);
            console.log('🚀 Stealth.DI Multi-CodeFont Model Initialized');
        }
        catch (error) {
            console.error('❌ Failed to initialize Stealth.DI:', error);
        }
    };
    const loadCodeFont = async (domain) => {
        if (!diModel)
            throw new Error('DI Model not initialized');
        try {
            await diModel.loadCodeFont(domain);
            setLoadedCodeFonts(prev => [...prev, domain]);
        }
        catch (error) {
            console.error(`❌ Failed to load CodeFont for ${domain}:`, error);
            throw error;
        }
    };
    return (<StealthDIContext.Provider value={{
            diModel,
            loadedCodeFonts,
            loadCodeFont,
            isInitialized
        }}>
      {children}
    </StealthDIContext.Provider>);
}
const useStealthDI = () => {
    const context = (0, react_1.useContext)(StealthDIContext);
    if (context === undefined) {
        throw new Error('useStealthDI must be used within a StealthDIProvider');
    }
    return context;
};
exports.useStealthDI = useStealthDI;
//# sourceMappingURL=stealth-di-provider.copy2.js.map