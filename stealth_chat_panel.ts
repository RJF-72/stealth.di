export class StealthSIChatPanel {
    // ... existing code ...

    private async handleUserMessage(message: string) {
        this._panel.webview.postMessage({
            type: 'userMessage',
            message: message,
            timestamp: new Date().toISOString()
        });

        try {
            const response = await this.client.autonomousChatRequest(message);
            
            this._panel.webview.postMessage({
                type: 'siResponse',
                message: response,
                timestamp: new Date().toISOString()
            });

            // Check if response contains file operations
            await this.processSIResponse(response);
        } catch (error) {
            this._panel.webview.postMessage({
                type: 'error',
                message: `Stealth.SI Error: ${error}`,
                timestamp: new Date().toISOString()
            });
        }
    }

    private async processSIResponse(response: string) {
        // Parse SI response for file operations
        try {
            const siDirective = this.extractSIDirective(response);
            if (siDirective && siDirective.action) {
                await this.client.executeSIAction(siDirective.action);
            }
        } catch (error) {
            console.error('Error processing SI directive:', error);
        }
    }

    private extractSIDirective(response: string): any {
        // Parse SI response for structured actions
        // This would typically be JSON embedded in the response
        try {
            const jsonMatch = response.match(/```json\n(.*?)\n```/s);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[1]);
            }
        } catch (error) {
            // Not a structured directive
        }
        return null;
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        // Enhanced HTML with file upload functionality
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stealth.SI Autonomous Pro</title>
    <style>
        /* ... existing styles ... */
        
        .file-upload-section {
            border: 2px dashed var(--vscode-input-border);
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin-bottom: 15px;
            cursor: pointer;
        }
        
        .file-upload-section:hover {
            background: var(--vscode-inputOption-hoverBackground);
        }
        
        .uploaded-files {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .file-item {
            background: var(--vscode-badge-background);
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.9em;
        }
        
        .workspace-info {
            background: var(--vscode-textCodeBlock-background);
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 15px;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="workspace-info" id="workspaceInfo">
        <strong>🔮 Stealth.SI Workspace Access:</strong> <span id="workspaceStatus">Scanning...</span>
    </div>

    <div class="file-upload-section" onclick="triggerFileUpload()">
        📁 Drag & drop files here or click to upload<br>
        <small>Supports: images, documents, code files (Max: 100MB)</small>
    </div>
    
    <div class="uploaded-files" id="uploadedFiles"></div>

    <!-- ... rest of existing HTML ... -->

    <script>
        // File upload functionality
        function triggerFileUpload() {
            vscode.postMessage({
                type: 'uploadFiles'
            });
        }

        // Handle workspace scan results
        window.addEventListener('message', (event) => {
            const message = event.data;
            if (message.type === 'workspaceScan') {
                document.getElementById('workspaceStatus').textContent = 
                    String(message.data.files.length) + ' files, ' + String(formatBytes(message.data.totalSize));
            }
        });

        function formatBytes(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // Request workspace scan on load
        vscode.postMessage({
            type: 'scanWorkspace'
        });
    </script>
</body>
</html>`;
    }
}