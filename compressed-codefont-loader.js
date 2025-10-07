"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressedCodeFontLoader = void 0;
// compressedLoader.ts
class CompressedCodeFontLoader {
    async loadCodeGeniusX() {
        // Load the 50MB compressed CodeFont
        const compressedData = await this.loadCompressedFile('CODEGENIUS_X.cf');
        // The CodeFont remains compressed during execution
        return new AutonomousCoderCodeFont(compressedData);
    }
    async loadCompressedFile(path) {
        // Memory-map the compressed file
        // Never fully decompress - stream intelligence as needed
        return await vscode.workspace.fs.readFile(vscode.Uri.file(path));
    }
}
exports.CompressedCodeFontLoader = CompressedCodeFontLoader;
//# sourceMappingURL=compressed-codefont-loader.js.map