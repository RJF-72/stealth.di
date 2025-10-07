// src/extension.ts
import * as vscode from 'vscode';
import { EmbeddedCodeFont } from './embedded-codefont';
import { AutonomousCoderUI } from './autonomous-coder-ui';
import { IntelligentCompletionProvider } from './intelligent-completion-provider';

let embeddedCodeFont: EmbeddedCodeFont;

export async function activate(context: vscode.ExtensionContext) {
    console.log('🚀 Activating CodeGenius X - Autonomous AI Coder');
    
    try {
        // Initialize embedded CodeFont immediately
        embeddedCodeFont = new EmbeddedCodeFont();
        await embeddedCodeFont.initialize();
        
        // Register providers and commands
        await registerExtensionFeatures(context);
        
        vscode.window.showInformationMessage(
            '🚀 CodeGenius X Ready - Autonomous AI Coder Loaded!'
        );
        
    } catch (error) {
        vscode.window.showErrorMessage(
            `❌ Failed to initialize CodeGenius X: ${error}`
        );
    }
}

async function registerExtensionFeatures(context: vscode.ExtensionContext) {
    const diModel = embeddedCodeFont.getDIModel();
    const autonomousUI = new AutonomousCoderUI(diModel);
    
    // Register Intelligent Completion Provider
    const completionProvider = new IntelligentCompletionProvider(diModel);
    const languages = [
        'python', 'javascript', 'typescript', 'java', 'cpp', 
        'rust', 'go', 'csharp', 'php', 'ruby', 'swift', 'kotlin'
    ];
    
    languages.forEach(language => {
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(
                { pattern: `**/*.${getFileExtension(language)}` },
                completionProvider,
                '.', '"', "'", ' ', '(', '{', '['
            )
        );
    });
    
    // Register Autonomous Commands
    context.subscriptions.push(
        vscode.commands.registerCommand('codegenius.createProject', async () => {
            await autonomousUI.createCompleteProject();
        }),
        
        vscode.commands.registerCommand('codegenius.inventAlgorithm', async () => {
            await autonomousUI.inventNewAlgorithm();
        }),
        
        vscode.commands.registerCommand('codegenius.solveImpossible', async () => {
            await autonomousUI.solveImpossibleProblem();
        }),
        
        vscode.commands.registerCommand('codegenius.autonomousRefactor', async () => {
            await autonomousUI.autonomousRefactoring();
        })
    );
    
    // Register Code Actions for autonomous improvements
    context.subscriptions.push(
        vscode.languages.registerCodeActionsProvider(
            { pattern: '**/*.{py,js,ts,java,cpp,rs,go,cs,php,rb,swift,kt}' },
            new AutonomousCodeActionProvider(diModel),
            {
                providedCodeActionKinds: [
                    vscode.CodeActionKind.QuickFix,
                    vscode.CodeActionKind.Refactor,
                    vscode.CodeActionKind.RefactorRewrite
                ]
            }
        )
    );
}

function getFileExtension(language: string): string {
    const extensions: { [key: string]: string } = {
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

export function deactivate() {
    console.log('🔴 CodeGenius X deactivated');
}