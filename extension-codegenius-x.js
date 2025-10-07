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
// src/extension.ts
const vscode = __importStar(require("vscode"));
const embedded_codefont_1 = require("./embedded-codefont");
const autonomous_coder_ui_1 = require("./autonomous-coder-ui");
const intelligent_completion_provider_1 = require("./intelligent-completion-provider");
let embeddedCodeFont;
async function activate(context) {
    console.log('🚀 Activating CodeGenius X - Autonomous AI Coder');
    try {
        // Initialize embedded CodeFont immediately
        embeddedCodeFont = new embedded_codefont_1.EmbeddedCodeFont();
        await embeddedCodeFont.initialize();
        // Register providers and commands
        await registerExtensionFeatures(context);
        vscode.window.showInformationMessage('🚀 CodeGenius X Ready - Autonomous AI Coder Loaded!');
    }
    catch (error) {
        vscode.window.showErrorMessage(`❌ Failed to initialize CodeGenius X: ${error}`);
    }
}
async function registerExtensionFeatures(context) {
    const diModel = embeddedCodeFont.getDIModel();
    const autonomousUI = new autonomous_coder_ui_1.AutonomousCoderUI(diModel);
    // Register Intelligent Completion Provider
    const completionProvider = new intelligent_completion_provider_1.IntelligentCompletionProvider(diModel);
    const languages = [
        'python', 'javascript', 'typescript', 'java', 'cpp',
        'rust', 'go', 'csharp', 'php', 'ruby', 'swift', 'kotlin'
    ];
    languages.forEach(language => {
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ pattern: `**/*.${getFileExtension(language)}` }, completionProvider, '.', '"', "'", ' ', '(', '{', '['));
    });
    // Register Autonomous Commands
    context.subscriptions.push(vscode.commands.registerCommand('codegenius.createProject', async () => {
        await autonomousUI.createCompleteProject();
    }), vscode.commands.registerCommand('codegenius.inventAlgorithm', async () => {
        await autonomousUI.inventNewAlgorithm();
    }), vscode.commands.registerCommand('codegenius.solveImpossible', async () => {
        await autonomousUI.solveImpossibleProblem();
    }), vscode.commands.registerCommand('codegenius.autonomousRefactor', async () => {
        await autonomousUI.autonomousRefactoring();
    }));
    // Register Code Actions for autonomous improvements
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider({ pattern: '**/*.{py,js,ts,java,cpp,rs,go,cs,php,rb,swift,kt}' }, new AutonomousCodeActionProvider(diModel), {
        providedCodeActionKinds: [
            vscode.CodeActionKind.QuickFix,
            vscode.CodeActionKind.Refactor,
            vscode.CodeActionKind.RefactorRewrite
        ]
    }));
}
function getFileExtension(language) {
    const extensions = {
        'python': 'py',
        'javascript': 'js',
        'typescript': 'ts',
        'java': 'java',
        'cpp': 'cpp',
        'rust': 'rs',
        'go': 'go',
        'csharp': 'cs',
        'php': 'php',
        'ruby': 'rb',
        'swift': 'swift',
        'kotlin': 'kt'
    };
    return extensions[language] || 'txt';
}
function deactivate() {
    console.log('🔴 CodeGenius X deactivated');
}
//# sourceMappingURL=extension-codegenius-x.js.map