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
exports.IntelligentCompletionProvider = void 0;
// src/providers/intelligentCompletionProvider.ts
const vscode = __importStar(require("vscode"));
class IntelligentCompletionProvider {
    constructor(diModel) {
        this.diModel = diModel;
    }
    async provideCompletionItems(document, position, token, context) {
        const completions = await this.diModel.getIntelligentCompletions({
            document: document.getText(),
            language: document.languageId,
            position: { line: position.line, character: position.character },
            context: this.extractContext(document, position)
        });
        return completions.map(comp => this.createCompletionItem(comp));
    }
    extractContext(document, position) {
        // Extract rich context for intelligent completions
        return {
            precedingLines: this.getPrecedingLines(document, position, 10),
            followingLines: this.getFollowingLines(document, position, 5),
            currentLine: document.lineAt(position).text,
            imports: this.extractImports(document),
            functions: this.extractFunctionContext(document, position)
        };
    }
    createCompletionItem(comp) {
        const item = new vscode.CompletionItem(comp.label, comp.kind);
        if (comp.insertText) {
            item.insertText = new vscode.SnippetString(comp.insertText);
        }
        if (comp.detail) {
            item.detail = comp.detail;
        }
        if (comp.documentation) {
            item.documentation = new vscode.MarkdownString(comp.documentation);
        }
        // Autonomous coding suggestions get special treatment
        if (comp.isAutonomous) {
            item.detail = `🚀 ${comp.detail}`;
            item.kind = vscode.CompletionItemKind.Interface;
        }
        return item;
    }
    getPrecedingLines(document, position, count) {
        const lines = [];
        for (let i = Math.max(0, position.line - count); i < position.line; i++) {
            lines.push(document.lineAt(i).text);
        }
        return lines;
    }
    getFollowingLines(document, position, count) {
        const lines = [];
        for (let i = position.line + 1; i <= Math.min(document.lineCount - 1, position.line + count); i++) {
            lines.push(document.lineAt(i).text);
        }
        return lines;
    }
    extractImports(document) {
        // Extract import statements for context-aware completions
        const imports = [];
        for (let i = 0; i < Math.min(document.lineCount, 50); i++) {
            const line = document.lineAt(i).text;
            if (line.match(/^(import|from|require|using)\s+/)) {
                imports.push(line);
            }
        }
        return imports;
    }
    extractFunctionContext(document, position) {
        // Extract current function context
        // Implementation depends on language
        return {
            inFunction: this.isInFunction(document, position),
            functionName: this.getCurrentFunctionName(document, position),
            parameters: this.getFunctionParameters(document, position)
        };
    }
    isInFunction(document, position) {
        // Determine if position is inside a function
        // Simplified implementation
        const text = document.getText();
        return text.includes('function') || text.includes('def ') || text.includes('fn ');
    }
    getCurrentFunctionName(document, position) {
        // Extract current function name
        // Implementation varies by language
        return null;
    }
    getFunctionParameters(document, position) {
        // Extract function parameters
        return [];
    }
}
exports.IntelligentCompletionProvider = IntelligentCompletionProvider;
//# sourceMappingURL=intelligent-completion-provider.js.map