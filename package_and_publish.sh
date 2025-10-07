# Package the extension
npm run package

# Publish to Open-VSX
npx ovsx publish codegenius-extension-1.0.0.vsix -p $OPEN_VSX_TOKEN

# Publish to VSCode Marketplace  
vsce publish -p $VSCE_TOKEN