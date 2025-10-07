import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';
import { StealthSIChatPanel } from './chatPanel';

export function activate(context: vscode.ExtensionContext) {
    console.log('Stealth.SI Autonomous Pro is now active');

    // Register all commands
    context.subscriptions.push(
        vscode.commands.registerCommand('stealthsi.chat', () => {
            StealthSIChatPanel.createOrShow(context.extensionUri);
        }),

        vscode.commands.registerCommand('stealthsi.autonomous', () => {
            vscode.window.showInformationMessage('Stealth.SI Autonomous Mode activated with full permissions');
            // Implement autonomous mode functionality
        }),

        vscode.commands.registerCommand('stealthsi.createApp', () => {
            vscode.window.showInformationMessage('Stealth.SI Application Creator started');
            // Implement app creation functionality
        }),

        vscode.commands.registerCommand('stealthsi.workspaceScan', () => {
            vscode.window.showInformationMessage('Scanning workspace...');
            // Implement workspace scanning functionality
        }),

        vscode.commands.registerCommand('stealthsi.uploadFiles', () => {
            vscode.window.showOpenDialog({
                canSelectMany: true,
                openLabel: 'Upload Files',
                filters: {
                    'All Files': ['*']
                }
            }).then(fileUris => {
                if (fileUris && fileUris.length > 0) {
                    vscode.window.showInformationMessage(`${fileUris.length} files selected for processing`);
                    // Implement file processing functionality
                }
            });
        }),

        vscode.commands.registerCommand('stealthsi.fullAccessMode', () => {
            vscode.window.showInformationMessage('Full file system access enabled');
            // Implement full access mode functionality
        })
    );
}

export function deactivate() {
    // Clean up resources when extension is deactivated
}