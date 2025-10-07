"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
// apps/web-app/app/layout.tsx
function RootLayout({ children }) {
    return (<html lang="en" className="stealth-theme">
      <body className="bg-stealth-black text-stealth-white">
        <StealthDIProvider>
          <IntelligenceDirector>
            {children}
          </IntelligenceDirector>
        </StealthDIProvider>
      </body>
    </html>);
}
//# sourceMappingURL=app-root-layout.js.map