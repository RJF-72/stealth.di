"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeFontWASMRuntime = void 0;
// packages/codefont-engine/src/wasm-runtime.ts
class CodeFontWASMRuntime {
    constructor() {
        this.wasmModule = null;
        this.memory = null;
    }
    async loadCodeFont(codeFontData) {
        // Compile and instantiate WASM module
        const wasmBuffer = await this.decompressCodeFont(codeFontData);
        this.wasmModule = await WebAssembly.compile(wasmBuffer);
        const instance = await WebAssembly.instantiate(this.wasmModule, {
            env: {
                memory: this.memory,
                // Import JavaScript functions for WASM to call
                log: (ptr, len) => this.logFromWasm(ptr, len),
                // ... other imports
            }
        });
        this.initializeRuntime(instance);
    }
    async executeIntelligence(module, inputs) {
        if (!this.wasmModule) {
            throw new Error('CodeFont not loaded');
        }
        // Execute compressed intelligence module
        const result = await this.callWasmFunction(module, inputs);
        return this.processWasmResult(result);
    }
    async decompressCodeFont(data) {
        // Use Compression Streams API for efficient decompression
        const ds = new DecompressionStream('gzip');
        const stream = new Response(data).body?.pipeThrough(ds);
        return await new Response(stream).arrayBuffer();
    }
}
exports.CodeFontWASMRuntime = CodeFontWASMRuntime;
//# sourceMappingURL=codefont-wasm-runtime.js.map