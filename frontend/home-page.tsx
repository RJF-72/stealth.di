// apps/web-app/app/page.tsx
import { StealthHero } from '@/components/stealth-hero';
import { FeatureShowcase } from '@/components/feature-showcase';
import { LiveDemo } from '@/components/live-demo';
import { Pricing } from '@/components/pricing';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stealth-black via-stealth-surface to-stealth-black">
      <StealthHero />
      <LiveDemo />
      <FeatureShowcase />
      <Pricing />
    </div>
  );
}