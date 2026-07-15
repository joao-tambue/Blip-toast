# 007: Design System do Toast

## Status

Aceita

## Contexto

A biblioteca precisava de um design visual elaborado e polido com:
- Animações de morphing com spring physics
- Ícones SVG por variante
- Barras de progresso
- Temas escuro/claro
- Promises toast
- Timestamps

## Decisão

Implementar um design system completo para toasts com suporte a múltiplas fases, animações suaves e customização completa.

### Componentes do Design

1. **Ícones SVG por Variante**
   - Cada variante (success, error, warning, info) tem seu ícone SVG
   - Loading usa spinner animado
   - react-native-svg como dependência peer

2. **Sistema de Fases**
   - Toasts têm fases: loading → default/success/error/warning/info
   - Cada fase define cores de fundo, ícone e progresso
   - Transições de fase suaves via animate

3. **Animações com Spring Physics**
   - Bounce configurável via presets (smooth, bouncy, subtle, snappy)
   - Squish/scale na entrada
   - Shake horizontal em erros
   - Opacity fade no expand

4. **Promise Toast**
   - `toast.promise(promise, { loading, success, error })`
   - Auto-atualiza de loading para success/error
   - Suporta descrições e ações por estado

5. **Barra de Progresso**
   - Countdown visual do tempo de exibição
   - Usa scaleX transform (native driver safe)

### Adaptações para React Native

1. **maxHeight não suportado pelo Native Driver**
   - Substituído por opacity-based expand
   - Body sempre renderizado quando deve expandir
   - Fade in/out via Animated.Value

2. **useColorScheme para tema system**
   - Detecção automática de tema do sistema
   - Fallback para light em ambientes sem suporte

3. **Platform-aware offsets**
   - Status bar height diferente iOS/Android
   - Bottom offset adaptativo

## Consequências

### Positivas
- Design profissional e consistente
- UX rica com animações suaves
- Tema escuro nativo
- Customização completa

### Negativas
- Dependência de react-native-svg
- Mais complexidade no componente ToastItem
- Algumas animações limitadas pelo native driver
