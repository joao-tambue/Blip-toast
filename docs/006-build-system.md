# 006: Sistema de Build

## Status

Aceita

## Contexto

A biblioteca precisa de um sistema de build que:
- Gere bundles CJS e ESM
- Gere declarations TypeScript
- Funcione com React Native
- Seja rápido e eficiente

## Decisão

Utilizar **tsup** (baseado em esbuild) para builds.

### Configuração

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-native'],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
```

### Justificativas

1. **tsup (esbuild)**
   - Extremamente rápido
   - Configuração mínima
   - Suporte nativo a DTS
   - Tree-shaking eficiente

2. **Dual Format (CJS + ESM)**
   - Compatibilidade ampla
   - Suporte a bundlers modernos
   - Retrocompatibilidade

3. **Externalização**
   - React e React Native não empacotados
   - Evita duplicação
   - Usa dependências do consumidor

4. **JSX Automatic**
   - Sem necessidade de import React
   - Compatível com JSX transform
   - Mais limpo

### Scripts

```json
{
  "build": "tsup",
  "dev": "tsup --watch",
  "clean": "rm -rf dist"
}
```

### Output

```
dist/
├── index.js        # CJS
├── index.mjs       # ESM
├── index.d.ts      # Declarations
└── index.js.map    # Source maps
```

### Consequências

### Positivas
- Build em segundos
- Output otimizado
- Declarations automáticas
- Fácil configurar

### Negativas
- Menos controle que Webpack
- Limitações em casos complexos
- Dependência de esbuild
