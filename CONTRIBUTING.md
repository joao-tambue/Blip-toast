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
cd Blip-toast

# Instale as dependências
pnpm install
```

## Estrutura

```
Blip-toast/
├── apps/
│   └── expo-playground/    # App de teste
├── packages/
│   └── blip-toast/         # Biblioteca principal
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

# Testes
pnpm test

# Testes com cobertura
pnpm test:coverage
```

### Criando uma Feature

1. Crie uma branch a partir da `main`

   ```bash
   git checkout -b feat/my-feature
   ```

2. Faça suas mudanças
3. Adicione testes
4. Rode lint, typecheck e testes
5. Crie um commit seguindo o padrão

### Commit Messages

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new toast variant
fix: resolve dismiss animation issue
docs: update README
chore: update dependencies
test: add unit tests for toast-manager
```

### Branches

Siga a convenção de nomes:

- `feat/*` - Nova funcionalidade
- `fix/*` - Correção de bug
- `docs/*` - Atualização de documentação
- `chore/*` - Manutenção e dependências
- `test/*` - Adição/correção de testes

### Pull Requests

1. Fork o projeto
2. Crie uma branch para sua feature
3. Envie um PR com descrição clara
4. Aguarde review

## Hooks do Git

O projeto usa Husky com lint-staged e commitlint:

- **pre-commit**: `pnpm lint-staged` — roda ESLint + Prettier nos arquivos staged
- **commit-msg**: `pnpm commitlint` — valida a mensagem do commit

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
- Mantenha cobertura alta (mínimo: branches 70%, functions 80%, lines 80%, statements 80%)
- Use React Native Testing Library para testes de componente

## Duvidas?

Abra uma [issue](https://github.com/joao-tambue/Blip-toast/issues).
