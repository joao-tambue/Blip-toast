# 009: react-native-svg como Dependência Peer

## Status

Aceita

## Contexto

Os ícones do goey-toast usam SVG para renderização vetorial de alta qualidade. No React Native, a biblioteca padrão para SVG é react-native-svg.

## Decisão

Tornar react-native-svg uma **dependência peer obrigatória** (não opcional).

### Configuração

```json
{
  "peerDependencies": {
    "react-native-svg": ">=13.0.0"
  },
  "peerDependenciesMeta": {
    "react-native-svg": {
      "optional": false
    }
  }
}
```

### Justificativas

1. **Qualidade Visual**
   - SVGs escaláveis sem perda de qualidade
   - Ícones nítidos em todas as densidades de tela
   - strokeWidth configurável

2. **Performance**
   - Renderização nativa via bridge
   - Memória menor que imagens bitmap
   - Suporte a animações de transform

3. **Padrão da Comunidade**
   - react-native-svg é o padrão de facto
   - 15k+ stars no GitHub
   - Mantido ativamente

4. **Tree-shaking**
   - Apenas os componentes usados são importados
   - Svg, Path, Circle, Line importados sob demanda

### Tipos de Ícones

| Ícone | Componente | Descrição |
|-------|-----------|-----------|
| Default | DefaultIcon | Sino de notificação |
| Success | SuccessIcon | Círculo com check |
| Error | ErrorIcon | Círculo com X |
| Warning | WarningIcon | Triângulo com exclamação |
| Info | InfoIcon | Círculo com i |
| Loading | SpinnerIcon | Círculo rotativo |

## Consequências

### Positivas
- Ícones de alta qualidade
- Consistência visual
- Suporte a customização de cor/tamanho

### Negativas
- Dependência obrigatória增加了 bundle size
- Usuários sem SVG precisam instalar
- Builds bare React Native precisam configurar native modules
