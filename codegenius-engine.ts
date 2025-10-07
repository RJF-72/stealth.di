// services/codegeniusEngine.ts
import * as vscode from 'vscode';
import { CodeGeniusDIModel } from './diModel';

export class CodeGeniusEngine {
    private diModel: CodeGeniusDIModel;
    
    constructor(private context: vscode.ExtensionContext) {
        this.loadCodeFont();
    }
    
    private async loadCodeFont() {
        const codefontPath = this.context.asAbsolutePath('CODEGENIUS_PRO.cf');
        this.diModel = new CodeGeniusDIModel(codefontPath);
        await this.diModel.initialize();
    }
    
    async getCompletions(
        document: vscode.TextDocument,
        position: vscode.Position,
        context: vscode.CompletionContext
    ): Promise<CompletionItem[]> {
        const request = this.buildCompletionRequest(document, position, context);
        return await this.diModel.process_developer_request(request);
    }
    
    async generateCodeFromDescription(): Promise<void> {
        const description = await vscode.window.showInputBox({
            prompt: 'Describe the code you want to generate:',
            placeHolder: 'e.g., "function to sort users by last name and then first name"'
        });
        
        if (description) {
            const generatedCode = await this.diModel.generateCode(description);
            await this.insertGeneratedCode(generatedCode);
        }
    }
    
    async explainSelectedCode(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const code = editor.document.getText(selection);
            const explanation = await this.diModel.explainCode(code);
            
            // Show explanation in hover or panel
            vscode.window.showInformationMessage(explanation);
        }
    }
    
    async refactorSelectedCode(): Promise<void> {
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
    
    private buildCompletionRequest(
        document: vscode.TextDocument,
        position: vscode.Position,
        context: vscode.CompletionContext
    ): any {
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