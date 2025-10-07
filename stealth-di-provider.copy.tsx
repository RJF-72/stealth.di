// apps/web-app/providers/stealth-di-provider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { StealthMultiCodeFontDIModel } from '@stealth-di/core';

interface StealthDIContextType {
  diModel: StealthMultiCodeFontDIModel | null;
  loadedCodeFonts: string[];
  loadCodeFont: (domain: string) => Promise<void>;
  isInitialized: boolean;
}

const StealthDIContext = createContext<StealthDIContextType | undefined>(undefined);

export function StealthDIProvider({ children }: { children: React.ReactNode }) {
  const [diModel, setDiModel] = useState<StealthMultiCodeFontDIModel | null>(null);
  const [loadedCodeFonts, setLoadedCodeFonts] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeDIModel();
  }, []);

  const initializeDIModel = async () => {
    try {
      const model = new StealthMultiCodeFontDIModel();
      await model.initialize();
      setDiModel(model);
      setIsInitialized(true);
      console.log('🚀 Stealth.DI Multi-CodeFont Model Initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Stealth.DI:', error);
    }
  };

  const loadCodeFont = async (domain: string) => {
    if (!diModel) throw new Error('DI Model not initialized');
    
    try {
      await diModel.loadCodeFont(domain);
      setLoadedCodeFonts(prev => [...prev, domain]);
    } catch (error) {
      console.error(`❌ Failed to load CodeFont for ${domain}:`, error);
      throw error;
    }
  };

  return (
    <StealthDIContext.Provider value={{
      diModel,
      loadedCodeFonts,
      loadCodeFont,
      isInitialized
    }}>
      {children}
    </StealthDIContext.Provider>
  );
}

export const useStealthDI = () => {
  const context = useContext(StealthDIContext);
  if (context === undefined) {
    throw new Error('useStealthDI must be used within a StealthDIProvider');
  }
  return context;
};