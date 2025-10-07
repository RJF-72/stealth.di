import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';

export class StealthSIChatPanel {
    public static currentPanel: StealthSIChatPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it
        if (StealthSIChatPanel.currentPanel) {
            StealthSIChatPanel.currentPanel._panel.reveal(column);
            return;
        }

        // Otherwise, create a new panel
        const panel = vscode.window.createWebviewPanel(
            'stealthsiChat',
            'Stealth.SI Autonomous Chat',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.joinPath(extensionUri, 'media')
                ]
            }
        );

        StealthSIChatPanel.currentPanel = new StealthSIChatPanel(panel, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        // Set the webview's initial html content
        this._update();

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programmatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Update the content based on view changes
        this._panel.onDidChangeViewState(
            e => {
                if (this._panel.visible) {
                    this._update();
                }
            },
            null,
            this._disposables
        );

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'sendMessage':
                        this._handleUserMessage(message.text);
                        return;
                }
            },
            null,
            this._disposables
        );
    }

    private async _handleUserMessage(message: string) {
        this._panel.webview.postMessage({
            type: 'userMessage',
            message: message,
            timestamp: new Date().toISOString()
        });

        try {
            // Simulate AI response
            const response = `Processing your request: "${message}"`;
            
            this._panel.webview.postMessage({
                type: 'siResponse',
                message: response,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error}`);
        }
    }

    private _update() {
        const webview = this._panel.webview;
        this._panel.title = "Stealth.SI Autonomous Chat";
        this._panel.webview.html = this._getHtmlForWebview(webview);
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        // Create and return the HTML for the webview
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Stealth.SI Autonomous Chat</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: var(--vscode-editor-background);
                    color: var(--vscode-editor-foreground);
                }
                .chat-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                }
                .message {
                    margin-bottom: 15px;
                    padding: 10px;
                    border-radius: 5px;
                }
                .user-message {
                    background-color: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    align-self: flex-end;
                }
                .ai-message {
                    background-color: var(--vscode-editor-inactiveSelectionBackground);
                    color: var(--vscode-editor-foreground);
                    align-self: flex-start;
                }
                .input-area {
                    display: flex;
                    padding: 10px;
                    border-top: 1px solid var(--vscode-panel-border);
                }
                #message-input {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid var(--vscode-input-border);
                    background-color: var(--vscode-input-background);
                    color: var(--vscode-input-foreground);
                    border-radius: 4px;
                }
                #send-button {
                    margin-left: 10px;
                    padding: 10px 15px;
                    background-color: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                #send-button:hover {
                    background-color: var(--vscode-button-hoverBackground);
                }
            </style>
        </head>
        <body>
            <div class="chat-container">
                <div class="chat-messages" id="chat-messages">
                    <div class="message ai-message">
                        Hello! I'm Stealth.SI Autonomous Pro. How can I assist you today?
                    </div>
                </div>
                <div class="input-area">
                    <input type="text" id="message-input" placeholder="Type your message...">
                    <button id="send-button">Send</button>
                </div>
            </div>

            <script>
                const vscode = acquireVsCodeApi();
                const messagesContainer = document.getElementById('chat-messages');
                const messageInput = document.getElementById('message-input');
                const sendButton = document.getElementById('send-button');

                // Handle sending messages
                function sendMessage() {
                    const message = messageInput.value.trim();
                    if (message) {
                        vscode.postMessage({
                            command: 'sendMessage',
                            text: message
                        });
                        messageInput.value = '';
                    }
                }

                // Event listeners
                sendButton.addEventListener('click', sendMessage);
                messageInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                });

                // Handle messages from the extension
                window.addEventListener('message', event => {
                    const message = event.data;
                    
                    if (message.type === 'userMessage' || message.type === 'siResponse') {
                        const messageDiv = document.createElement('div');
                        messageDiv.classList.add('message');
                        messageDiv.classList.add(message.type === 'userMessage' ? 'user-message' : 'ai-message');
                        messageDiv.textContent = message.message;
                        messagesContainer.appendChild(messageDiv);
                        
                        // Scroll to bottom
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    }
                });
            </script>
        </body>
        </html>`;
    }

    public dispose() {
        StealthSIChatPanel.currentPanel = undefined;

        // Clean up resources
        this._panel.dispose();

        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
}