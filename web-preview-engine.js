"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPreviewEngine = void 0;
// packages/live-preview/src/preview-engine.ts
class WebPreviewEngine {
    constructor() {
        this.iframe = null;
        this.websocket = null;
        this.compilationWorker = null;
    }
    async initializePreview(container) {
        // Create preview iframe
        this.iframe = document.createElement('iframe');
        this.iframe.className = 'w-full h-full border-0';
        container.appendChild(this.iframe);
        // Connect to compilation service
        await this.connectWebSocket();
        this.startCompilationWorker();
    }
    async connectWebSocket() {
        this.websocket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
        this.websocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.handlePreviewUpdate(message);
        };
    }
    startCompilationWorker() {
        this.compilationWorker = new Worker(new URL('./compiler.worker.ts', import.meta.url));
        this.compilationWorker.onmessage = (event) => {
            const { html, css, js } = event.data;
            this.updatePreview({ html, css, js });
        };
    }
    async updateCode(code, language) {
        if (this.compilationWorker) {
            this.compilationWorker.postMessage({ code, language });
        }
    }
    updatePreview(content) {
        if (!this.iframe?.contentDocument)
            return;
        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${content.css}</style>
        </head>
        <body>
          ${content.html}
          <script>${content.js}</script>
        </body>
      </html>
    `;
        this.iframe.srcdoc = html;
    }
}
exports.WebPreviewEngine = WebPreviewEngine;
//# sourceMappingURL=web-preview-engine.js.map