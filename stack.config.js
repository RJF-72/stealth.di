"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STEALTH_TECH_STACK = void 0;
// stack.config.ts
exports.STEALTH_TECH_STACK = {
    frontend: {
        framework: 'Next.js 14',
        styling: 'Tailwind CSS + CSS Modules',
        state: 'Zustand + React Query',
        routing: 'App Router',
        realtime: 'WebSockets + Server-Sent Events'
    },
    backend: {
        runtime: 'Node.js + Bun',
        framework: 'NestJS + Fastify',
        database: 'PostgreSQL + Redis',
        cache: 'Redis Cluster',
        search: 'Elasticsearch'
    },
    ai: {
        runtime: 'WebAssembly + WebGPU',
        models: 'Compressed CodeFonts',
        inference: 'ONNX Runtime Web',
        orchestration: 'Custom DI Engine'
    },
    infrastructure: {
        hosting: 'Vercel + AWS',
        cdn: 'Cloudflare',
        monitoring: 'DataDog + Sentry',
        analytics: 'PostHog'
    }
};
//# sourceMappingURL=stack.config.js.map