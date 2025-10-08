// packages/live-preview/src/preview-engine.ts
export class WebPreviewEngine {
  private iframe: HTMLIFrameElement | null = null;
  private websocket: WebSocket | null = null;
  private compilationWorker: Worker | null = null;

  async initializePreview(container: HTMLElement): Promise<void> {
    // Create preview iframe
    this.iframe = document.createElement('iframe');
    this.iframe.className = 'w-full h-full border-0';
    container.appendChild(this.iframe);

    // Connect to compilation service
    await this.connectWebSocket();
    this.startCompilationWorker();
  }

  private async connectWebSocket(): Promise<void> {
    this.websocket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
    
    this.websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handlePreviewUpdate(message);
    };
  }

  private startCompilationWorker(): void {
    this.compilationWorker = new Worker(new URL('./compiler.worker.ts', import.meta.url));
    
    this.compilationWorker.onmessage = (event) => {
      const { html, css, js } = event.data;
      this.updatePreview({ html, css, js });
    };
  }

  async updateCode(code: string, language: string): Promise<void> {
    if (this.compilationWorker) {
      this.compilationWorker.postMessage({ code, language });
    }
  }

  private updatePreview(content: PreviewContent): void {
    if (!this.iframe?.contentDocument) return;

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