# 004: Arquitetura de Componentes

## Status

Aceita

## Contexto

A biblioteca precisa de componentes React que:
- Renderizem toasts
- Suportem diferentes variantes
- Permitam customização
- Funcionem de forma headless

## Decisão

Adotar uma arquitetura de **Componentes Compostos** com suporte a **Headless API**.

### Estrutura de Componentes

```
components/
├── ToastContainer.tsx    # Container principal
├── ToastItem.tsx         # Item individual
└── index.ts              # Exports
```

### Componentes

1. **ToastContainer**
   - Gerencia posição dos toasts
   - Renderiza lista de toasts
   - Controla z-index e elevação

2. **ToastItem**
   - Renderiza toast individual
   - Suporta variantes visuais
   - Gerencia interações

### Justificativas

1. **Separação de Responsabilidades**
   - Container: posicionamento e lista
   - Item: aparência e interação

2. **Headless API**
   - Lógica separada de apresentação
   - Customização total
   - Fácil teste

3. **Variantes Visuais**
   - Default, success, error, warning, info
   - Stylesheets separados
   - Fácil extensão

### Uso

```tsx
// Uso básico
<ToastContainer position="bottom" />

// Customização via props
<ToastItem 
  toast={toast}
  onDismiss={handleDismiss}
/>
```

### API Headless (Futuro)

```tsx
// Controle total
function CustomToast({ toast }) {
  return (
    <MyCustomView>
      <Text>{toast.options.title}</Text>
    </MyCustomView>
  );
}

<ToastContainer
  renderToast={(toast) => <CustomToast toast={toast} />}
/>
```

## Consequências

### Positivas
- Componentes pequenos e focados
- Fácil de testar
- Customização flexível
- Pronto para Headless API

### Negativas
- Mais componentes para manter
- Necessidade de compor componentes
- Complexidade inicial maior
