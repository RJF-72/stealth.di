// src/components/glassmorphic/glassPanel.ts
export class GlassPanel {
    static create(options: GlassPanelOptions): vscode.WebviewPanel {
        const panel = vscode.window.createWebviewPanel(
            'codefont-studio',
            'CodeFont Studio 🚀',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [
                    vscode.Uri.joinPath(extensionUri, 'media'),
                    vscode.Uri.joinPath(extensionUri, 'themes')
                ]
            }
        );

        panel.webview.html = this.getGlassmorphicHTML(panel);
        return panel;
    }

    private static getGlassmorphicHTML(panel: vscode.WebviewPanel): string {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CodeFont Studio</title>
            <style>
                ${this.getGlassmorphicCSS()}
            </style>
        </head>
        <body class="famous-ai-theme">
            <div class="glass-container">
                <!-- Header -->
                <header class="glass-header">
                    <div class="logo">
                        <span class="logo-icon">🚀</span>
                        <span class="logo-text">CodeFont Studio</span>
                    </div>
                    <div class="header-actions">
                        <button class="glass-btn" onclick="togglePreview()">
                            <span class="btn-icon">👁️</span>
                            Live Preview
                        </button>
                        <button class="glass-btn primary" onclick="openChat()">
                            <span class="btn-icon">💬</span>
                            AI Assistant
                        </button>
                    </div>
                </header>

                <!-- Main Content -->
                <div class="main-content">
                    <!-- Sidebar -->
                    <aside class="glass-sidebar">
                        <nav class="sidebar-nav">
                            <div class="nav-item active" data-view="project">
                                <span class="nav-icon">📁</span>
                                <span class="nav-text">Project</span>
                            </div>
                            <div class="nav-item" data-view="editor">
                                <span class="nav-icon">⌨️</span>
                                <span class="nav-text">Editor</span>
                            </div>
                            <div class="nav-item" data-view="preview">
                                <span class="nav-icon">👁️</span>
                                <span class="nav-text">Preview</span>
                            </div>
                            <div class="nav-item" data-view="chat">
                                <span class="nav-icon">💬</span>
                                <span class="nav-text">AI Chat</span>
                            </div>
                        </nav>
                    </aside>

                    <!-- Content Area -->
                    <main class="content-area">
                        <div id="project-view" class="view active">
                            ${this.getProjectViewHTML()}
                        </div>
                        <div id="editor-view" class="view">
                            ${this.getEditorViewHTML()}
                        </div>
                        <div id="preview-view" class="view">
                            ${this.getPreviewViewHTML()}
                        </div>
                        <div id="chat-view" class="view">
                            ${this.getChatViewHTML()}
                        </div>
                    </main>
                </div>

                <!-- Status Bar -->
                <footer class="glass-statusbar">
                    <div class="status-left">
                        <span class="status-item">🟢 Autonomous Mode</span>
                        <span class="status-item">⚡ CodeFont Loaded</span>
                    </div>
                    <div class="status-right">
                        <span class="status-item">🚀 Ready</span>
                    </div>
                </footer>
            </div>

            <script>
                ${this.getGlassmorphicJS()}
            </script>
        </body>
        </html>
        `;
    }

    private static getGlassmorphicCSS(): string {
        return `
        :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --glass-bg: rgba(255, 255, 255, 0.1);
            --glass-border: rgba(255, 255, 255, 0.2);
            --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            --blur: blur(10px);
        }

        body.famous-ai-theme {
            background: radial-gradient(circle at 20% 20%, #1a1a2e, #0f0f1a);
            color: #ffffff;
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
        }

        .glass-container {
            min-height: 100vh;
            padding: 24px;
        }

        .glass-header, .glass-statusbar {
            backdrop-filter: var(--blur);
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            box-shadow: var(--glass-shadow);
            border-radius: 16px;
            padding: 12px 16px;
            margin-bottom: 16px;
        }

        .glass-sidebar {
            backdrop-filter: var(--blur);
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            box-shadow: var(--glass-shadow);
            border-radius: 16px;
            padding: 16px;
        }

        .glass-btn {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            padding: 8px 12px;
            color: #fff;
            cursor: pointer;
        }

        .glass-btn.primary {
            background: var(--primary-gradient);
            border-color: transparent;
        }
        `;
    }