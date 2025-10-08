// src/providers/intelligentCompletionProvider.ts
import * as vscode from 'vscode';
import { AutonomousCoderDIModel } from '../diModel';

export class IntelligentCompletionProvider implements vscode.CompletionItemProvider {
    constructor(private diModel: AutonomousCoderDIModel) {}
    
    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): Promise<vscode.CompletionItem[]> {
        
        const completions = await this.diModel.getIntelligentCompletions({
            document: document.getText(),
            language: document.languageId,
            position: { line: position.line, character: position.character },
            context: this.extractContext(document, position)
        });
        
        return completions.map(comp => this.createCompletionItem(comp));
    }
    
    private extractContext(document: vscode.TextDocument, position: vscode.Position): any {
        // Extract rich context for intelligent completions
        return {
            precedingLines: this.getPrecedingLines(document, position, 10),
            followingLines: this.getFollowingLines(document, position, 5),
            currentLine: document.lineAt(position).text,
            imports: this.extractImports(document),
            functions: this.extractFunctionContext(document, position)
        };
    }
    
    private createCompletionItem(comp: any): vscode.CompletionItem {
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
    
    private getPrecedingLines(document: vscode.TextDocument, position: vscode.Position, count: number): string[] {
        const lines: string[] = [];
        for (let i = Math.max(0, position.line - count); i < position.line; i++) {
            lines.push(document.lineAt(i).text);
        }
        return lines;
    }
    
    private getFollowingLines(document: vscode.TextDocument, position: vscode.Position, count: number): string[] {
        const lines: string[] = [];
        for (let i = position.line + 1; i <= Math.min(document.lineCount - 1, position.line + count); i++) {
            lines.push(document.lineAt(i).text);
        }
        return lines;
    }
    
    private extractImports(document: vscode.TextDocument): string[] {
        // Extract import statements for context-aware completions
        const imports: string[] = [];
        for (let i = 0; i < Math.min(document.lineCount, 50); i++) {
            const line = document.lineAt(i).text;
            if (line.match(/^(import|from|require|using)\s+/)) {
                imports.push(line);
            }
        }
        return imports;
    }
    
    private extractFunctionContext(document: vscode.TextDocument, position: vscode.Position): any {
        // Extract current function context
        // Implementation depends on language
        return {
            inFunction: this.isInFunction(document, position),
            functionName: this.getCurrentFunctionName(document, position),
            parameters: this.getFunctionParameters(document, position)
        };
    }
    
    private isInFunction(document: vscode.TextDocument, position: vscode.Position): boolean {
        // Determine if position is inside a function
        // Simplified implementation
        const text = document.getText();
        return text.includes('function') || text.includes('def ') || text.includes('fn ');
    }
    
    private getCurrentFunctionName(document: vscode.TextDocument, position: vscode.Position): string | null {
        // Extract current function name
        // Implementation varies by language
        return null;
    }
    
    private getFunctionParameters(document: vscode.TextDocument, position: vscode.Position): string[] {
        // Extract function parameters
        return [];
    }
}