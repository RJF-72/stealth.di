// src/studio/stealthStudio.ts
export class StealthStudio {
    private panel: vscode.WebviewPanel;
    private diModel: StealthDIModel;
    private previewManager: LivePreviewManager;
    private director: IntelligenceDirector;

    constructor() {
        this.diModel = new StealthDIModel();
        this.previewManager = new LivePreviewManager();
        this.director = new IntelligenceDirector();
    }

    async openStudio(): Promise<void> {
        this.panel = vscode.window.createWebviewPanel(
            'stealth-studio',
            '🕶️ Stealth.DI Studio',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: this.getResourceRoots()
            }
        );

        this.panel.webview.html = this.getStudioHTML();
        this.setupWebviewMessageHandlers();
        
        // Initialize all components
        await this.initializeStudio();
    }

    private getStudioHTML(): string {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Stealth.DI Studio</title>
            <style>
                ${this.getStealthCSS()}
            </style>
        </head>
        <body class="stealth-theme">
            <div class="stealth-container">
                <!-- Stealth Header -->
                <header class="stealth-header">
                    <div class="stealth-brand">
                        <span class="brand-icon">🕶️</span>
                        <span class="brand-name">Stealth.DI</span>
                        <span class="brand-tagline">Directed Intelligence Platform</span>
                    </div>
                    <div class="stealth-controls">
                        <button class="stealth-btn" onclick="toggleStealthMode()">
                            <span class="btn-icon">⚡</span>
                            Stealth Mode
                        </button>
                        <button class="stealth-btn primary" onclick="openDirector()">
                            <span class="btn-icon">🎯</span>
                            Intelligence Director
                        </button>
                    </div>
                </header>

                <!-- Main Workspace -->
                <div class="stealth-workspace">
                    <!-- Intelligence Sidebar -->
                    <aside class="stealth-sidebar">
                        <div class="sidebar-section">
                            <h3 class="section-title">🎯 Directed Intelligence</h3>
                            <div class="intelligence-widgets">
                                <div class="widget" data-action="autonomous-coding">
                                    <span class="widget-icon">🤖</span>
                                    <span class="widget-text">Autonomous Coder</span>
                                </div>
                                <div class="widget" data-action="live-preview">
                                    <span class="widget-icon">👁️</span>
                                    <span class="widget-text">Live Preview</span>
                                </div>
                                <div class="widget" data-action="code-analysis">
                                    <span class="widget-icon">🔍</span>
                                    <span class="widget-text">Code Analysis</span>
                                </div>
                                <div class="widget" data-action="deployment">
                                    <span class="widget-icon">🚀</span>
                                    <span class="widget-text">Deployment</span>
                                </div>
                            </div>
                        </div>

                        <div class="sidebar-section">
                            <h3 class="section-title">⚡ Stealth Tools</h3>
                            <div class="tool-buttons">
                                <button class="tool-btn" onclick="activateStealthMode()">
                                    <span class="tool-icon">🕶️</span>
                                    Stealth Mode
                                </button>
                                <button class="tool-btn" onclick="optimizePerformance()">
                                    <span class="tool-icon">⚡</span>
                                    Performance Boost
                                </button>
                                <button class="tool-btn" onclick="analyzeSecurity()">
                                    <span class="tool-icon">🔒</span>
                                    Security Scan
                                </button>
                            </div>
                        </div>
                    </aside>

                    <!-- Content Area -->
                    <main class="stealth-content">
                        <div class="content-tabs">
                            <div class="tab active" data-tab="editor">Code Editor</div>
                            <div class="tab" data-tab="preview">Live Preview</div>
                            <div class="tab" data-tab="analysis">Intelligence Analysis</div>
                            <div class="tab" data-tab="deploy">Deployment</div>
                        </div>

                        <div class="tab-content">
                            <!-- Editor View -->
                            <div id="editor-tab" class="tab-pane active">
                                ${this.getEditorView()}
                            </div>

                            <!-- Live Preview View -->
                            <div id="preview-tab" class="tab-pane">
                                ${this.getPreviewView()}
                            </div>

                            <!-- Intelligence Analysis View -->
                            <div id="analysis-tab" class="tab-pane">
                                ${this.getAnalysisView()}
                            </div>

                            <!-- Deployment View -->
                            <div id="deploy-tab" class="tab-pane">
                                ${this.getDeploymentView()}
                            </div>
                        </div>
                    </main>
                </div>

                <!-- Status Bar -->
                <footer class="stealth-statusbar">
                    <div class="status-left">
                        <span class="status-item">🟢 DI Model: Active</span>
                        <span class="status-item">⚡ Stealth: Ready</span>
                        <span class="status-item">🎯 Director: Online</span>
                    </div>
                    <div class="status-right">
                        <span class="status-item">🚀 Performance: Optimal</span>
                    </div>
                </footer>
            </div>

            <script>
                ${this.getStealthJS()}
            </script>
        </body>
        </html>
        `;
    }

    private getStealthCSS(): string {
        return `
        :root {
            --stealth-primary: #00ff88;
            --stealth-secondary: #8b5cf6;
            --stealth-accent: #06b6d4;
            --stealth-bg: #0a0a0a;
            --stealth-surface: #1a1a1a;
            --stealth-border: #333333;
            --stealth-text: #f8fafc;
            --stealth-muted: #64748b;
        }

        .stealth-theme {
            background: var(--stealth-bg);
            color: var(--stealth-text);
            font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        .stealth-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
            background: linear-gradient(135deg, var(--stealth-bg) 0%, #111111 100%);
        }

        .stealth-header {
            background: rgba(26, 26, 26, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--stealth-border);
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .stealth-brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .brand-icon {
            font-size: 24px;
        }

        .brand-name {
            font-size: 20px;
            font-weight: 700;
            background: linear-gradient(135deg, var(--stealth-primary), var(--stealth-accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .brand-tagline {
            color: var(--stealth-muted);
            font-size: 12px;
        }

        .stealth-controls {
            display: flex;
            gap: 8px;
        }

        .stealth-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid var(--stealth-border);
            color: var(--stealth-text);
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
        }

        .stealth-btn:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--stealth-primary);
        }

        .stealth-btn.primary {
            background: linear-gradient(135deg, var(--stealth-primary), var(--stealth-secondary));
            border: none;
            color: var(--stealth-bg);
            font-weight: 600;
        }

        .stealth-workspace {
            display: flex;
            flex: 1;
            overflow: hidden;
        }

        .stealth-sidebar {
            width: 280px;
            background: rgba(26, 26, 26, 0.9);
            border-right: 1px solid var(--stealth-border);
            padding: 20px;
            overflow-y: auto;
        }

        .sidebar-section {
            margin-bottom: 24px;
        }

        .section-title {
            color: var(--stealth-primary);
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .intelligence-widgets {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .widget {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--stealth-border);
            border-radius: 6px;
            padding: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s ease;
        }

        .widget:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: var(--stealth-primary);
            transform: translateX(4px);
        }

        .widget-icon {
            font-size: 16px;
        }

        .widget-text {
            font-size: 14px;
            font-weight: 500;
        }

        .tool-buttons {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .tool-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--stealth-border);
            color: var(--stealth-text);
            padding: 10px 12px;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s ease;
        }

        .tool-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: var(--stealth-accent);
        }

        .stealth-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: var(--stealth-bg);
        }

        .content-tabs {
            display: flex;
            background: rgba(26, 26, 26, 0.9);
            border-bottom: 1px solid var(--stealth-border);
        }

        .tab {
            padding: 12px 24px;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.2s ease;
        }

        .tab:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .tab.active {
            border-bottom-color: var(--stealth-primary);
            color: var(--stealth-primary);
        }

        .tab-content {
            flex: 1;
            position: relative;
        }

        .tab-pane {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: none;
        }

        .tab-pane.active {
            display: block;
        }

        .stealth-statusbar {
            background: rgba(26, 26, 26, 0.95);
            border-top: 1px solid var(--stealth-border);
            padding: 8px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
        }

        .status-left, .status-right {
            display: flex;
            gap: 16px;
        }

        .status-item {
            color: var(--stealth-muted);
        }

        /* Matrix-style animations */
        @keyframes matrixGlow {
            0% { text-shadow: 0 0 5px var(--stealth-primary); }
            50% { text-shadow: 0 0 20px var(--stealth-primary), 0 0 30px var(--stealth-primary); }
            100% { text-shadow: 0 0 5px var(--stealth-primary); }
        }

        .matrix-glow {
            animation: matrixGlow 2s ease-in-out infinite;
        }
        `;
    }

    private getStealthJS(): string {
        return `
        // Stealth.DI Studio JavaScript
        let currentTab = 'editor';
        let stealthMode = false;

        function switchTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });

            // Show selected tab
            document.getElementById(tabName + '-tab').classList.add('active');
            document.querySelector(\`[data-tab="\${tabName}"]\`).classList.add('active');
            currentTab = tabName;
        }

        function toggleStealthMode() {
            stealthMode = !stealthMode;
            document.body.classList.toggle('stealth-mode-active', stealthMode);
            
            if (stealthMode) {
                vscode.postMessage({
                    command: 'activateStealthMode',
                    data: { enabled: true }
                });
            } else {
                vscode.postMessage({
                    command: 'deactivateStealthMode', 
                    data: { enabled: false }
                });
            }
        }

        function openDirector() {
            vscode.postMessage({
                command: 'openIntelligenceDirector'
            });
        }

        // Tab event listeners
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                switchTab(tab.dataset.tab);
            });
        });

        // Widget event listeners  
        document.querySelectorAll('.widget').forEach(widget => {
            widget.addEventListener('click', () => {
                const action = widget.dataset.action;
                vscode.postMessage({
                    command: 'widgetAction',
                    data: { action: action }
                });
            });
        });

        // Handle messages from extension
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.command) {
                case 'updatePreview':
                    updateLivePreview(message.data);
                    break;
                case 'diStatusUpdate':
                    updateDIStatus(message.data);
                    break;
                case 'stealthModeChanged':
                    stealthMode = message.data.enabled;
                    break;
            }
        });

        function updateLivePreview(data) {
            if (currentTab === 'preview') {
                // Update preview content
                const previewFrame = document.getElementById('preview-frame');
                if (previewFrame) {
                    previewFrame.srcdoc = data.html;
                }
            }
        }

        function updateDIStatus(data) {
            const statusElement = document.querySelector('.status-item:nth-child(1)');
            if (statusElement) {
                statusElement.textContent = \`🟢 DI Model: \${data.status}\`;
            }
        }
        `;
    }
}