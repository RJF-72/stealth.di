# Build Stealth.DI Studio
npm run build

# Package with embedded CodeFont
npm run package

# Creates: stealth-di-1.0.0.vsix (~55MB with everything included)

# Deploy to marketplaces
npx ovsx publish stealth-di-1.0.0.vsix
vsce publish