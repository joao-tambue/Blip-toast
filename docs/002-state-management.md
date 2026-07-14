# 002: Gerenciamento de Estado

## Status

Aceita

## Contexto

A biblioteca precisa gerenciar o estado dos toasts ativos de forma eficiente, permitindo:
- Criar, atualizar e remover toasts
- Notificar componentes sobre mudanças
- Suportar múltiplos toasts simultâneos
- Controlar limites de toasts

## Decisão

Implementar um **ToastManager** como um singleton com pattern Observer.

### Arquitetura

```typescript
class ToastManager {
  private toasts: Toast[];
  private listeners: Set<ToastListener>;
  
  subscribe(listener: ToastListener): () => void;
  create(message: string, options?: ToastOptions): Toast;
  dismiss(id: string): void;
  dismissAll(): void;
  update(id: string, options: Partial<ToastOptions>): void;
}
```

### Justificativas

1. **Singleton Pattern**
   - Estado global único
   - Acesso fácil de qualquer parte do app
   - Evita múltiplas instâncias

2. **Observer Pattern**
   - Desacoplamento entre estado e UI
   - Atualizações reativas
   - Cleanup automático

3. **Interface Imutável**
   - Cada toast retorna métodos `dismiss()` e `update()`
   - Type-safe API
   - Encadeamento de chamadas

### Uso

```tsx
// Criar toast com referência
const myToast = toast('Hello!');

// Usar referência para controle
myToast.dismiss();
myToast.update({ variant: 'success' });
```

## Consequências

### Positivas
- Controle granular sobre cada toast
- API intuitiva e type-safe
- Fácil de estender
- Performance otimizada

### Negativas
- Mais código que um simples array
- Necessidade de gerenciar listeners
- Ciclo de vida dos listeners
