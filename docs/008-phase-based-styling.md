# 008: Sistema de Estilização por Fases

## Status

Aceita

## Contexto

A biblioteca utiliza um sistema onde toasts têm "fases" (loading, default, success, error, warning, info) e cada fase define automaticamente cores, ícones e comportamento.

## Decisão

Implementar um sistema de mapeamento fase → cores/ícones usando Records tipados.

### Mapeamentos

1. **PHASE_COLOR_MAP** - Cor do ícone e texto por fase
   - loading: #555, default: #555, success: #4CAF50
   - error: #E53935, warning: #C49000, info: #1E88E5

2. **PHASE_BG_MAP** - Cor de fundo por fase (light mode)
   - loading/default: #f5f5f5
   - success: #E8F5E9, error: #FFEBEE
   - warning: #FFF8E1, info: #E3F2FD

3. **DARK_PHASE_BG_MAP** - Cor de fundo por fase (dark mode)
   - Cores mais escuras e saturadas para contraste

4. **PHASE_PROGRESS_MAP** - Cor da barra de progresso por fase

5. **PHASE_ICON_MAP** - Componente de ícone por fase
   - Mapeia ToastPhase (excluindo 'loading') para componente React

### Uso no ToastItem

```tsx
const bgColor = isDark ? DARK_PHASE_BG_MAP[phase] : PHASE_BG_MAP[phase];
const iconColor = PHASE_COLOR_MAP[phase];
const IconComponent = PHASE_ICON_MAP[phase];
```

### Customização

- `fillColor` sobrescreve a cor de fundo externa
- `borderColor` e `borderWidth` para bordas personalizadas
- `theme` prop no ToastContainer controla light/dark/system

## Consequências

### Positivas
- Cores consistentes por variante
- Suporte a dark mode automático
- Fácil de estender com novas fases
- Tipado com TypeScript

### Negativas
- Paleta de cores fixa (precisa de override manual)
- Dark mode usa cores fixas (não segue sistema em todos os casos)
