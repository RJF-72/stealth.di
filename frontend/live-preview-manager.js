"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivePreviewManager = void 0;
// src/preview/livePreviewManager.ts
class LivePreviewManager {
    constructor() {
        this.isWatching = false;
    }
    async startLivePreview(projectPath) {
        this.currentProject = await this.loadProject(projectPath);
        this.isWatching = true;
        // Create preview panel
        this.previewPanel = vscode.window.createWebviewPanel('stealth-preview', '👁️ Live Preview - Stealth.DI', vscode.ViewColumn.Two, { enableScripts: true });
        this.updatePreview();
        this.startFileWatching(projectPath);
    }
    async updatePreview() {
        if (!this.previewPanel || !this.currentProject)
            return;
        const html = await this.generatePreviewHTML();
        this.previewPanel.webview.html = html;
    }
    async generatePreviewHTML() {
        // Generate live preview of the current project
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    margin: 0; 
                    background: #0a0a0a;
                    color: #00ff88;
                    font-family: monospace;
                }
                .stealth-preview {
                    padding: 20px;
                }
                .preview-header {
                    border-bottom: 1px solid #00ff88;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="stealth-preview">
                <div class="preview-header">
                    <h2>🕶️ Stealth.DI Live Preview</h2>
                    <p>Real-time application preview</p>
                </div>
                <div id="app-preview">
                    <!-- Dynamic content will be injected here -->
                    ${await this.renderAppPreview()}
                </div>
            </div>
            <script>
                // Live preview JavaScript
                console.log('Stealth.DI Live Preview Active');
            </script>
        </body>
        </html>
        `;
    }
    async renderAppPreview() {
        // Render the actual application based on project files
        // This would interpret and render the code in real-time
        return `
        <div class="app-container">
            <h3>🚀 Application Output</h3>
            <div class="output-area">
                <p>Live preview updating in real-time...</p>
                <div class="performance-metrics">
                    <div>⚡ Performance: Optimal</div>
                    <div>🎯 DI Model: Active</div>
                    <div>👁️ Preview: Live</div>
                </div>
            </div>
        </div>
        `;
    }
    startFileWatching(projectPath) {
        // Watch for file changes and update preview automatically
        const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(projectPath, '**/*'));
        watcher.onDidChange(() => this.updatePreview());
        watcher.onDidCreate(() => this.updatePreview());
        watcher.onDidDelete(() => this.updatePreview());
    }
}
exports.LivePreviewManager = LivePreviewManager;
//# sourceMappingURL=live-preview-manager.js.map