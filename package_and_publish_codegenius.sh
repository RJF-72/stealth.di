# Build and package everything
npm run package

# Creates: codegenius-autonomous-1.0.0.vsix
# Contains: Embedded CodeFont + Extension = ~52MB

# Deploy to Open-VSX
npx ovsx publish codegenius-autonomous-1.0.0.vsix -p $OPEN_VSX_TOKEN

# Deploy to VSCode Marketplace
vsce publish -p $VSCE_TOKEN