// build-embed.js - Build script to embed CodeFont
const fs = require('fs');
const path = require('path');

function embedCodeFont() {
    console.log('📦 Embedding CodeFont into extension...');
    
    // Read the compressed CodeFont file
    const codeFontPath = path.join(__dirname, '../codefonts/CODEGENIUS_X.cf');
    const codeFontData = fs.readFileSync(codeFontPath);
    
    // Convert to base64 for embedding
    const base64Data = codeFontData.toString('base64');
    
    // Generate TypeScript module
    const tsContent = `
// AUTO-GENERATED - Embedded CodeGenius X CodeFont
// Compressed SOTA Autonomous Coder Intelligence

export default Uint8Array.from(
    Buffer.from("${base64Data}", "base64")
);
`;
    
    // Write embedded module
    const outputPath = path.join(__dirname, '../src/embedded/codegenius_x.cf.embedded.ts');
    fs.writeFileSync(outputPath, tsContent);
    
    console.log(`✅ CodeFont embedded: ${codeFontData.length} bytes → ${outputPath}`);
}

embedCodeFont();