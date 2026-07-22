# Plano de Publicacao — Blip Toast v0.1.0

> Checklist detalhado para publicar a lib no npm e tornar o repositorio publico.

---

## Fase 1 — Corrigir Problemas Criticos

### 1.1 Adicionar `react-native-svg` ao `external` do tsup

**Arquivo:** `packages/blip-toast/tsup.config.ts`

`react-native-svg` e uma peer dependency obrigatoria, mas nao esta na lista de `external`. Isso pode causar tentativas de bundle duplicado ou erros de build.

```ts
external: ['react', 'react-native', 'react-native-svg'],
```

---

### 1.2 Corrigir nome duplicado no root `package.json`

**Arquivo:** `package.json` (raiz)

O root e a lib usam o mesmo nome `"blip-toast"`. Isso causa confusao em ferramentas de monorepo e no registry.

```json
"name": "blip-toast-monorepo",
```

---

### 1.3 Corrigir `substr()` deprecated

**Arquivos:**
- `packages/blip-toast/src/utils/index.ts`
- `packages/blip-toast/src/core/toast-manager.ts`

Substituir `.substr(2, 9)` por `.substring(2, 11)` em ambos os arquivos.

---

### 1.4 Remover `generateId` duplicado

**Arquivo:** `packages/blip-toast/src/core/toast-manager.ts`

O `toast-manager.ts` define sua propria copia privada de `generateId`. Remover a duplicacao importando de `../utils`:

```ts
import { generateId } from '../utils';
```

E remover a funcao local `const generateId = ...`.

---

### 1.5 Limpar `.turbo/` do historico do git

O diretorio `.turbo/cache/` esta rastreado no git apesar de estar no `.gitignore`. Executar:

```bash
git rm -r --cached .turbo/
```

---

### 1.6 Corrigir `.gitignore` para `POSTs/`

A entrada `POSTs/` na raiz nao alcanca `docs/POSTs/`. Corrigir para:

```
docs/POSTs/
```

---

## Fase 2 — Testes

### 2.1 Configurar framework de testes

Instalar Jest + React Native Testing Library no workspace da lib:

```bash
pnpm add -D -w jest @testing-library/react-native @testing-library/jest-native
```

Ou usar **Vitest** para compatibilidade com tsup/esbuild (decidir qual).

**Arquivo:** `packages/blip-toast/jest.config.js` (ou `vitest.config.ts`)

### 2.2 Escrever testes unitarios

Prioridade maxima:

| Modulo | Arquivo | O que testar |
|--------|---------|--------------|
| Core | `toast-manager.ts` | `create`, `dismiss`, `dismissAll`, `update`, `promise`, `maxToasts` |
| Hooks | `use-toasts.ts` | Subscricao, snapshot atualizado, cleanup no unmount |
| Utils | `utils/index.ts` | `generateId` (uniqueness), `clamp`, `sleep` |
| Core | `presets.ts` | Presets retornam valores validos |

### 2.3 Escrever testes de componente

Prioridade media (React Native Testing Library):

| Componente | Cenarios |
|------------|----------|
| `ToastItem` | Renderiza mensagem, variante correta, acao clicavel, dismiss |
| `ToastContainer` | Renderiza lista, posicao, maximo visivel |
| `ProgressBar` | Anima de 100 a 0, pausa |

### 2.4 Adicionar script de teste

**Arquivo:** `packages/blip-toast/package.json`

```json
"test": "jest",
"test:coverage": "jest --coverage"
```

**Arquivo:** `package.json` (raiz)

```json
"test": "turbo test"
```

### 2.5 Meta de cobertura

Definir cobertura minima no jest config:

```json
"coverageThreshold": {
  "global": {
    "branches": 70,
    "functions": 80,
    "lines": 80,
    "statements": 80
  }
}
```

Comecar com 70-80% e ir aumentando.

---

## Fase 3 — CI/CD com GitHub Actions

### 3.1 Workflow de CI

**Arquivo:** `.github/workflows/ci.yml`

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build
```

### 3.2 Workflow de publicacao

**Arquivo:** `.github/workflows/publish.yml`

Workflow manual ou trigger por tag `v*` que executa `pnpm publish` no pacote da lib.

---

## Fase 4 — Hooks do Husky

### 4.1 Criar hooks reais

O diretorio `.husky/` so tem a subpasta `_/` (auto-gerada pelo `husky install`). Criar:

**`.husky/pre-commit`:**

```sh
pnpm lint-staged
```

**`.husky/commit-msg`:**

```sh
pnpm commitlint --edit $1
```

---

## Fase 5 — CHANGELOG

### 5.1 Criar `CHANGELOG.md`

**Arquivo:** `packages/blip-toast/CHANGELOG.md`

```markdown
# Changelog

## 0.1.0 (YYYY-MM-DD)

### Features
- Toast notifications com 5 variantes (default, success, error, warning, info)
- Card stack layout com animacoes spring
- 6 posicoes de posicionamento
- Suporte a temas (dark, light, system)
- Promise toasts com transicao loading -> success/error
- Action buttons com transicao successLabel
- Progress bar animada
- SVG icons (react-native-svg)
- Animation presets (smooth, bouncy, subtle, snappy)
- Customizacao completa (fillColor, borderColor, classNames, etc.)
- API `toast()` com metodos encadeaveis
- Hook `useToasts` para acesso ao estado
```

---

## Fase 6 — Limpeza e Polish

### 6.1 Resolver conflito `.npmignore` vs `files`

O `.npmignore` exclui `src/`, mas `package.json` `files` inclui `src` (necessario para Metro). Remover a entrada `src/` do `.npmignore` para evitar confusao.

### 6.2 Adicionar `engines` ao package.json

**Arquivo:** `packages/blip-toast/package.json`

```json
"engines": {
  "node": ">=18"
}
```

### 6.3 Revisar README

- Verificar se o exemplo `useToasts` esta correto
- Confirmar que todas as props documentadas existem na API real
- Adicionar badge de build/CI quando o workflow existir

### 6.4 Adicionar `prepublishOnly` script

**Arquivo:** `packages/blip-toast/package.json`

```json
"prepublishOnly": "pnpm lint && pnpm typecheck && pnpm test && pnpm build"
```

Garante que nada sujo seja publicado.

---

## Ordem de Execucao Sugerida

```
Fase 1 (Corrigir bugs criticos)
  └─> Fase 2 (Testes)
        └─> Fase 3 (CI/CD)
              └─> Fase 4 (Husky)
                    └─> Fase 5 (CHANGELOG)
                          └─> Fase 6 (Limpeza)
                                └─> Publicar v0.1.0 no npm
                                      └─> Tornar repo publico no GitHub
```

**Estimativa:** Cada fase leva de 1 a 3 horas dependendo da familiaridade com as ferramentas. A Fase 2 (testes) e a mais demorada.

---

## Comando Final de Publicacao

```bash
cd packages/blip-toast
pnpm publish --access public
```

O `--access public` e necessario porque o npm registra pacotes como `private` por default em organizacoes.
