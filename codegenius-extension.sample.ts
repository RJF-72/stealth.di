// extension.ts
import * as vscode from 'vscode';
import { CodeGeniusEngine } from './codegenius-engine';
import { CompletionProvider } from './providers/completionProvider';
import { CodeActionsProvider } from './providers/codeActionsProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('CodeGenius extension activated');
    
    // Initialize CodeFont DI Model
    const codegenius = new CodeGeniusEngine(context);
    
    // Register Providers
    const completionProvider = new CompletionProvider(codegenius);
    const codeActionsProvider = new CodeActionsProvider(codegenius);
    
    // Register Completion Provider
    const languages = ['python', 'javascript', 'typescript', 'java', 'cpp', 'rust', 'go'];
    languages.forEach(language => {
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(
                language,
                completionProvider,
                '.', '"', "'", ' ', '('
            )
        );
    });
    
    // Register Code Actions
    context.subscriptions.push(
        vscode.languages.registerCodeActionsProvider(
            { pattern: '**/*.{py,js,ts,java,cpp,rs,go}' },
            codeActionsProvider
        )
    );
    
    // Register Commands
    context.subscriptions.push(
        vscode.commands.registerCommand('codegenius.generateCode', async () => {
            await codegenius.generateCodeFromDescription();
        }),
        vscode.commands.registerCommand('codegenius.explainCode', async () => {
            await codegenius.explainSelectedCode();
        }),
        vscode.commands.registerCommand('codegenius.refactorCode', async () => {
            await codegenius.refactorSelectedCode();
        })
    );
}

export function deactivate() {
    console.log('CodeGenius extension deactivated');
}