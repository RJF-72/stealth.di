"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedCodeFont = void 0;
class EmbeddedCodeFont {
    constructor() {
        this.diModel = null;
        // CodeFont is embedded in the extension bundle
        this.codeFontData = this.getEmbeddedCodeFont();
    }
    async initialize() {
        console.log('🚀 Initializing Embedded CodeGenius X...');
        // Load the compressed CodeFont directly from extension resources
        this.diModel = new AutonomousCoderDIModel(this.codeFontData);
        await this.diModel.initialize();
        console.log('✅ Autonomous Coder Ready - CodeFont Loaded from Extension Bundle');
    }
    getEmbeddedCodeFont() {
        // CodeFont is compiled directly into the extension
        // During build process, CODEGENIUS_X.cf is converted to TypeScript module
        return require('./embedded/codegenius_x.cf.embedded').default;
    }
    getDIModel() {
        if (!this.diModel) {
            throw new Error('CodeFont not initialized');
        }
        return this.diModel;
    }
}
exports.EmbeddedCodeFont = EmbeddedCodeFont;
//# sourceMappingURL=embedded-codefont.js.map