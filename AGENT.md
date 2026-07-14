Você é um arquiteto sênior de bibliotecas React Native open-source.

Crie a estrutura inicial de uma biblioteca chamada "Blip-toast".

Objetivo:
Construir uma biblioteca moderna de Toast Notifications para React Native inspirada em Sonner, React Hot Toast e Gooey Toast, com foco em performance, animações fluidas e excelente Developer Experience.

Requisitos:

* Monorepo usando pnpm workspace
* TurboRepo configurado
* TypeScript em todos os pacotes
* Pasta apps/expo-playground para testes
* Pasta packages/native-toast contendo a biblioteca
* Configurar tsup para build da biblioteca
* Configurar ESLint e Prettier
* Configurar Husky e lint-staged
* Exportar corretamente a biblioteca
* Preparar estrutura para publicação futura no npm
* Criar package.json completos
* Criar tsconfig base compartilhado
* Criar scripts de build, lint, dev e typecheck
* Criar README inicial profissional

Estrutura desejada:

native-toast/
├── apps/
│   └── expo-playground/
│
├── packages/
│   └── native-toast/
│       ├── src/
│       │   ├── core/
│       │   ├── components/
│       │   ├── hooks/
│       │   ├── animations/
│       │   ├── utils/
│       │   └── index.ts
│       │
│       ├── package.json
│       ├── tsconfig.json
│       └── tsup.config.ts
│
├── package.json
├── turbo.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── README.md

Além da estrutura, gere todos os arquivos iniciais necessários para que eu consiga executar:

pnpm install
pnpm dev
pnpm build

sem erros.

Siga boas práticas de bibliotecas React Native modernas e prepare a arquitetura para futuramente suportar:

* Reanimated
* Gesture Handler
* Promise Toasts
* Queue Management
* Headless API
* Dynamic Island Mode
* Morphing Toasts

Explique todas as decisões arquiteturais tomadas dentro de uma pasta docs/ onde dentro dessa pasta estarás a criar arquivos das decisões tomadas.
