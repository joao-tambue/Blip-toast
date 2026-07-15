# 001: Estrutura Monorepo

## Status

Aceita

## Contexto

A biblioteca Blip Toast precisa de uma estrutura que suporte:
- O pacote principal da biblioteca
- Uma aplicação de playground para desenvolvimento e testes
- Possibilidade de futuros pacotes (como plugins, temas, etc)

## Decisão

Utilizar **pnpm workspaces** com **Turborepo** como gerenciador de builds.

### Justificativas

1. **pnpm Workspaces**
   - Economia de disco via hard linking
   - Instalação mais rápida
   - Controle estrito de dependências
   - Suporte nativo a workspaces

2. **Turborepo**
   - Cache de builds
   - Execução paralela de tarefas
   - Incremental builds
   - Dependências entre tarefas

### Estrutura

```
blip-toast/
├── apps/
│   └── expo-playground/    # App de teste
├── packages/
│   └── blip-toast/       # Biblioteca principal
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Consequências

### Positivas
- Separação clara entre biblioteca e app de teste
- Build incrementais e rápidos
- Facilidade para adicionar novos pacotes
- CI/CD otimizado

### Negativas
- Complexidade inicial maior
- Necessidade de entender conceitos de monorepo
- Configuração adicional do Turborepo
