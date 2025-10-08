// apps/web-app/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="stealth-theme">
      <body className="bg-stealth-black text-stealth-white">
        <StealthDIProvider>
          <IntelligenceDirector>
            {children}
          </IntelligenceDirector>
        </StealthDIProvider>
      </body>
    </html>
  );
}