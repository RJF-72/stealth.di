// providers/completionProvider.ts
import * as vscode from 'vscode';
import { CodeGeniusEngine } from './codegenius-engine';

export class CompletionProvider implements vscode.CompletionItemProvider {
    constructor(private codegenius: CodeGeniusEngine) {}
    
    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): Promise<vscode.CompletionItem[]> {
        const completions = await this.codegenius.getCompletions(
            document,
            position,
            context
        );
        
        return completions.map(comp => {
            const item = new vscode.CompletionItem(comp.label, comp.kind);
            item.insertText = new vscode.SnippetString(comp.insertText);
            item.detail = comp.detail;
            item.documentation = new vscode.MarkdownString(comp.documentation);
            return item;
        });
    }
}