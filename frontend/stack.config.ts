// stack.config.ts
export const STEALTH_TECH_STACK = {
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