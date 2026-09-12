# Changelog

## Unreleased

## 0.2.0 (2026-09-11)

### Features

- **Custom layout** — three composable, opt-in tiers for adapting toasts to any design system without losing the built-in animation, timing, promise morphing, gestures or accessibility:
  - `styles` — per-slot style overrides merged over the built-in `StyleSheet`
  - `slots` — swap individual pieces (`Icon`, `ActionButton`, `Progress`)
  - `renderToast` — a render prop with full control of the inner card
- `<ToastConfigProvider>` / `useToastConfig()` — configure the above once at the app root (props on `<ToastContainer>` still win per field)
- Exposed `resolveToastColors` and `defaultToastStyles` so custom layouts can match the default look

## 0.1.0 (2026-07-22)

### Features

- Toast notifications com 5 variantes (default, success, error, warning, info)
- Card stack layout com animacoes spring
- 6 posicoes de posicionamento
- Suporte a temas (dark, light, system)
- Promise toasts com transicao loading → success/error
- Action buttons com transicao successLabel
- Progress bar animada
- SVG icons (react-native-svg)
- Animation presets (smooth, bouncy, subtle, snappy)
- Customizacao completa (fillColor, borderColor, classNames, etc.)
- API `toast()` com metodos encadeaveis
- Hook `useToasts` para acesso ao estado
