"use strict";
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
exports.activate = activate;
exports.deactivate = deactivate;
// extension.ts
const vscode = __importStar(require("vscode"));
const codegenius_engine_1 = require("./codegenius-engine");
const completionProvider_1 = require("./providers/completionProvider");
const codeActionsProvider_1 = require("./providers/codeActionsProvider");
function activate(context) {
    console.log('CodeGenius extension activated');
    // Initialize CodeFont DI Model
    const codegenius = new codegenius_engine_1.CodeGeniusEngine(context);
    // Register Providers
    const completionProvider = new completionProvider_1.CompletionProvider(codegenius);
    const codeActionsProvider = new codeActionsProvider_1.CodeActionsProvider(codegenius);
    // Register Completion Provider
    const languages = ['python', 'javascript', 'typescript', 'java', 'cpp', 'rust', 'go'];
    languages.forEach(language => {
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider(language, completionProvider, '.', '"', "'", ' ', '('));
    });
    // Register Code Actions
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider({ pattern: '**/*.{py,js,ts,java,cpp,rs,go}' }, codeActionsProvider));
    // Register Commands
    context.subscriptions.push(vscode.commands.registerCommand('codegenius.generateCode', async () => {
        await codegenius.generateCodeFromDescription();
    }), vscode.commands.registerCommand('codegenius.explainCode', async () => {
        await codegenius.explainSelectedCode();
    }), vscode.commands.registerCommand('codegenius.refactorCode', async () => {
        await codegenius.refactorSelectedCode();
    }));
}
function deactivate() {
    console.log('CodeGenius extension deactivated');
}
//# sourceMappingURL=codegenius-extension.sample.js.map