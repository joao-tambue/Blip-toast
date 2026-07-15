# Contribuindo para Blip Toast

Obrigado por interesse em contribuir! Este guia vai te ajudar a começar.

## Pré-requisitos

- Node.js 18+
- pnpm 9+

## Setup

```bash
# Clone o repositório
git clone https://github.com/joao-tambue/Blip-toast.git

# Entre no diretório
cd blip-toast

# Instale as dependências
pnpm install

# Inicie o dev server
pnpm dev
```

## Estrutura

```
blip-toast/
├── apps/
│   └── expo-playground/    # App de teste
├── packages/
│   └── blip-toast/       # Biblioteca principal
└── docs/                   # Documentação
```

## Desenvolvimento

### Comandos

```bash
# Development
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Type check
pnpm typecheck

# Format
pnpm format
```

### Criando uma Feature

1. Crie uma branch
   ```bash
   git checkout -b feat/my-feature
   ```

2. Faça suas mudanças
3. Adicione testes
4. Rode lint e typecheck
5. Crie um commit seguindo o padrão

### Commit Messages

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new toast variant
fix: resolve dismiss animation issue
docs: update README
chore: update dependencies
```

### Pull Requests

1. Fork o projeto
2. Crie uma branch para sua feature
3. Envie um PR com descrição clara
4. Aguarde review

## Código

### Estilo

- Use TypeScript
- Siga o ESLint config
- Formate com Prettier
- Escreva código limpo e documentado

### Componentes

- Componentes ficam em `packages/blip-toast/src/components`
- Hooks ficam em `packages/blip-toast/src/hooks`
- Utilitários ficam em `packages/blip-toast/src/utils`

### Testes

- Escreva testes para novas features
- Mantenha cobertura alta
- Teste em iOS e Android

## Duvidas?

Abra uma issue ou entre em contato pelo Discord.
