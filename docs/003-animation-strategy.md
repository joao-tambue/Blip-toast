# 003: Estratégia de Animações

## Status

Aceita

## Contexto

A biblioteca precisa de animações fluidas e performáticas para:
- Entrada e saída de toasts
- Transições suaves
- Gestos de swipe
- Futuras animações complexas

## Decisão

Utilizar **React Native Animated API** como base, com preparação para **Reanimated**.

### Estratégia

1. **Camada de Abstração**
   - Hooks customizados para animações
   - Separação entre lógica e UI
   - Fácil migração futura

2. **Hooks de Animação**

```typescript
// Animação de entrada
const slideIn = useSlideIn(duration);

// Animação de saída
const { animate, style } = useSlideOut(duration);
```

3. **Configurações Padrão**
   - Entry: Spring animation (suave)
   - Exit: Timing animation (rápido)
   - Duration configurável

### Justificativas

1. **Animated API Nativa**
   - Zero dependências extras
   - Performance excelente
   - Disponível em todas as plataformas

2. **Preparação para Reanimated**
   - Interface abstrata
   - Fácil swap de implementação
   - Não quebra API pública

3. **Hooks Customizados**
   - Reutilizáveis
   - Testáveis
   - Documentados

### Implementação Atual

```tsx
// hooks/useSlideIn.ts
export function useSlideIn(duration = 300) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { ... }),
      Animated.spring(translateY, { ... }),
    ]).start();
  }, []);

  return { opacity, transform: [{ translateY }] };
}
```

## Consequências

### Positivas
- Animações nativas e performáticas
- Sem dependências extras
- Flexibilidade para customização
- Camada pronta para Reanimated

### Negativas
- Animações mais simples que Reanimated
- Limitações em animações complexas
- Necessidade de migração futura (opcional)
