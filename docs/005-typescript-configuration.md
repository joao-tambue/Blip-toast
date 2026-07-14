# 005: Configuração TypeScript

## Status

Aceita

## Contexto

A biblioteca precisa de configuração TypeScript que:
- Suporte React e React Native
- Gere declarations precisas
- Funcione em diferentes ambientes
- Seja compartilhável

## Decisão

Utilizar **tsconfig.json compartilhado** com configurações específicas por pacote.

### Estrutura

```
/
├── tsconfig.base.json          # Configuração base
├── packages/
│   └── native-toast/
│       └── tsconfig.json       # Estende base
└── apps/
    └── expo-playground/
        └── tsconfig.json       # Estende Expo
```

### tsconfig.base.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "jsx": "react-jsx"
  }
}
```

### Justificativas

1. **Configuração Base Compartilhada**
   - Consistência entre pacotes
   - Menos duplicação
   - Manutenção centralizada

2. **moduleResolution: bundler**
   - Compatível com tsup/esbuild
   - Suporte a exports
   - Mais flexível

3. **strict: true**
   - Type safety máximo
   - Menos bugs em runtime
   - Melhor IDE support

4. **jsx: react-jsx**
   - JSX automático
   - Sem necessidade de import React
   - Mais limpo

### Consequências

### Positivas
- Type safety máximo
- Declarations automáticas
- Compatibilidade ampla
- Fácil de manter

### Negativas
- Mais rigidez no código
- Necessidade de tipar tudo
- Build pode ser mais lento
