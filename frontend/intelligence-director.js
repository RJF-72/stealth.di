"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntelligenceDirector = void 0;
// src/director/intelligenceDirector.ts
class IntelligenceDirector {
    async openDirector() {
        this.directorPanel = vscode.window.createWebviewPanel('stealth-director', '🎯 Intelligence Director - Stealth.DI', vscode.ViewColumn.Beside, { enableScripts: true });
        this.directorPanel.webview.html = this.getDirectorHTML();
        this.setupDirectorMessageHandlers();
    }
    getDirectorHTML() {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                ${this.getDirectorCSS()}
            </style>
        </head>
        <body class="director-theme">
            <div class="director-container">
                <header class="director-header">
                    <h1>🎯 Intelligence Director</h1>
                    <p>Stealth.DI - Directed Intelligence Control Center</p>
                </header>

                <div class="director-dashboard">
                    <!-- DI Model Status -->
                    <div class="status-card">
                        <h3>🧠 DI Model Status</h3>
                        <div class="status-indicators">
                            <div class="status-item online">
                                <span class="status-dot"></span>
                                Autonomous Coder: Active
                            </div>
                            <div class="status-item online">
                                <span class="status-dot"></span>
                                Code Analysis: Running
                            </div>
                            <div class="status-item online">
                                <span class="status-dot"></span>
                                Live Preview: Enabled
                            </div>
                        </div>
                    </div>

                    <!-- Performance Metrics -->
                    <div class="metrics-card">
                        <h3>⚡ Performance Metrics</h3>
                        <div class="metrics-grid">
                            <div class="metric">
                                <div class="metric-value">99.8%</div>
                                <div class="metric-label">Accuracy</div>
                            </div>
                            <div class="metric">
                                <div class="metric-value">42ms</div>
                                <div class="metric-label">Response Time</div>
                            </div>
                            <div class="metric">
                                <div class="metric-value">256</div>
                                <div class="metric-label">Active Processes</div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="actions-card">
                        <h3>🚀 Quick Actions</h3>
                        <div class="action-buttons">
                            <button class="action-btn" onclick="activateAutonomousCoding()">
                                🤖 Autonomous Coding
                            </button>
                            <button class="action-btn" onclick="optimizePerformance()">
                                ⚡ Optimize Performance
                            </button>
                            <button class="action-btn" onclick="runSecurityScan()">
                                🔒 Security Scan
                            </button>
                            <button class="action-btn" onclick="deployProject()">
                                🚀 Deploy Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                ${this.getDirectorJS()}
            </script>
        </body>
        </html>
        `;
    }
}
exports.IntelligenceDirector = IntelligenceDirector;
//# sourceMappingURL=intelligence-director.js.map