// src/embeddedCodeFont.ts
import * as vscode from 'vscode';

export class EmbeddedCodeFont {
    private codeFontData: Uint8Array;
    private diModel: AutonomousCoderDIModel | null = null;
    
    constructor() {
        // CodeFont is embedded in the extension bundle
        this.codeFontData = this.getEmbeddedCodeFont();
    }
    
    async initialize(): Promise<void> {
        console.log('🚀 Initializing Embedded CodeGenius X...');
        
        // Load the compressed CodeFont directly from extension resources
        this.diModel = new AutonomousCoderDIModel(this.codeFontData);
        await this.diModel.initialize();
        
        console.log('✅ Autonomous Coder Ready - CodeFont Loaded from Extension Bundle');
    }
    
    private getEmbeddedCodeFont(): Uint8Array {
        // CodeFont is compiled directly into the extension
        // During build process, CODEGENIUS_X.cf is converted to TypeScript module
        return require('./embedded/codegenius_x.cf.embedded').default;
    }
    
    getDIModel(): AutonomousCoderDIModel {
        if (!this.diModel) {
            throw new Error('CodeFont not initialized');
        }
        return this.diModel;
    }
}