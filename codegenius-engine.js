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
exports.CodeGeniusEngine = void 0;
// services/codegeniusEngine.ts
const vscode = __importStar(require("vscode"));
const diModel_1 = require("./diModel");
class CodeGeniusEngine {
    constructor(context) {
        this.context = context;
        this.loadCodeFont();
    }
    async loadCodeFont() {
        const codefontPath = this.context.asAbsolutePath('CODEGENIUS_PRO.cf');
        this.diModel = new diModel_1.CodeGeniusDIModel(codefontPath);
        await this.diModel.initialize();
    }
    async getCompletions(document, position, context) {
        const request = this.buildCompletionRequest(document, position, context);
        return await this.diModel.process_developer_request(request);
    }
    async generateCodeFromDescription() {
        const description = await vscode.window.showInputBox({
            prompt: 'Describe the code you want to generate:',
            placeHolder: 'e.g., "function to sort users by last name and then first name"'
        });
        if (description) {
            const generatedCode = await this.diModel.generateCode(description);
            await this.insertGeneratedCode(generatedCode);
        }
    }
    async explainSelectedCode() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const code = editor.document.getText(selection);
            const explanation = await this.diModel.explainCode(code);
            // Show explanation in hover or panel
            vscode.window.showInformationMessage(explanation);
        }
    }
    async refactorSelectedCode() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const code = editor.document.getText(selection);
            const refactored = await this.diModel.refactorCode(code);
            // Apply refactoring
            const edit = new vscode.WorkspaceEdit();
            edit.replace(editor.document.uri, selection, refactored);
            await vscode.workspace.applyEdit(edit);
        }
    }
    buildCompletionRequest(document, position, context) {
        return {
            type: 'completion',
            document: {
                text: document.getText(),
                language: document.languageId,
                uri: document.uri.toString()
            },
            position: {
                line: position.line,
                character: position.character
            },
            context: {
                triggerCharacter: context.triggerCharacter,
                triggerKind: context.triggerKind
            }
        };
    }
}
exports.CodeGeniusEngine = CodeGeniusEngine;
//# sourceMappingURL=codegenius-engine.js.map