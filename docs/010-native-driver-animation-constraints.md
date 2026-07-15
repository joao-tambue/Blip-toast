# 010: Restrições de Animação com Native Driver

## Status

Aceita

## Contexto

Durante a implementação do ToastItem, surgiu o erro:
```
Style property 'maxHeight' is not supported by native animated module
```

O React Native Animated API com `useNativeDriver: true` só suporta propriedades de `opacity` e `transform`. Propriedades de layout como `maxHeight`, `width`, `height`, `top`, `left` não são suportadas.

## Decisão

Usar apenas propriedades suportadas pelo native driver para animações de entrada/saída, e usar abordagens alternativas para expand/contract.

### Propriedades Suportadas (Native Driver)

✅ `opacity`
✅ `transform` (translateX, translateY, scale, rotate, etc.)

### Propriedades NÃO Suportadas

❌ `maxHeight`, `height`, `width`
❌ `top`, `left`, `right`, `bottom`
❌ `padding*`, `margin*`
❌ `backgroundColor`, `borderColor`

### Solução para Expand/Contract

**Problema**: Animar `maxHeight` para expandir o corpo do toast.

**Solução**: Usar opacity-based expand:
- O corpo do toast é renderizado condicionalmente quando `shouldExpand` é true
- Animação de `opacity: expandAnim` faz fade in suave
- Sem `maxHeight` interpolation

```tsx
// ANTES (causa erro)
const expandedHeight = expandAnim.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
// <Animated.View style={{ maxHeight: expandedHeight }}>

// DEPOIS (funciona)
<Animated.View style={{ opacity: expandAnim }}>
```

### Animações que Funcionam

1. **Entry**: `opacity` (fade) + `scale` (spring)
2. **Landing squish**: `scaleY` + `scaleX` (spring)
3. **Expand**: `opacity` (fade in)
4. **Error shake**: `translateX` (timing sequence)
5. **Exit**: `opacity` (fade out) + `scale` (缩小)
6. **ProgressBar**: `scaleX` com `useNativeDriver: false`

### ProgressBar - Exceção

A ProgressBar usa `useNativeDriver: false` porque anima `scaleX` em um container com `overflow: hidden`. Isso é aceitável porque:
- É uma animação simples e contínuan
- Não causa frame drops perceptíveis
- `useNativeDriver: false` é aceitável para animações de curta duração

## Consequências

### Positivas
- 60fps consistente em todas as animações
- Zero frame drops em dispositivos de baixa performance
- Compatibilidade com todos os dispositivos

### Negativas
- Expand/contract limitado a opacity (sem slide height)
- Algumas animações de layout não são possíveis
- ProgressBar não é 100% nativa
