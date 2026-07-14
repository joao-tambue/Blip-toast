# Blip Toast

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> Modern Toast Notifications for React Native

Blip Toast is a modern, performant, and highly customizable toast notification library for React Native. Inspired by Sonner, React Hot Toast, and Gooey Toast, it provides smooth animations and excellent developer experience.

## Features

- 🎨 **Beautiful Animations** - Smooth transitions powered by React Native Animated API
- 🎯 **Multiple Variants** - Default, success, error, warning, and info toasts
- 📍 **Flexible Positioning** - Top, bottom, and corner positions
- 👆 **Interactive** - Swipe to dismiss, action buttons, and press handlers
- 🔧 **Highly Customizable** - Themes, durations, and custom content
- 📱 **Cross-Platform** - Works on iOS, Android, and Web
- ⚡ **Lightweight** - Minimal bundle size with tree-shaking support
- 🎭 **Headless API** - Full control over toast rendering
- 🔮 **Future-Ready** - Prepared for Reanimated, Gesture Handler, and more

## Installation

```bash
# Using npm
npm install native-toast

# Using yarn
yarn add native-toast

# Using pnpm
pnpm add native-toast
```

## Quick Start

```tsx
import toast, { ToastContainer } from 'native-toast';

function App() {
  return (
    <>
      <Button
        title="Show Toast"
        onPress={() => toast('Hello World!')}
      />
      <ToastContainer />
    </>
  );
}
```

## Usage

### Basic Toast

```tsx
toast('This is a toast message');
```

### Variants

```tsx
toast.success('Success!');
toast.error('Error!');
toast.warning('Warning!');
toast.info('Info');
```

### With Options

```tsx
toast('Hello!', {
  description: 'This is a description',
  duration: 5000,
  dismissible: true,
  position: 'top-right',
});
```

### With Action

```tsx
toast('File deleted', {
  action: {
    label: 'Undo',
    onPress: () => handleUndo(),
  },
});
```

### Dismiss Toasts

```tsx
const t = toast('Hello!');
t.dismiss(); // Dismiss specific toast

toast.dismissAll(); // Dismiss all toasts
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Toast message |
| `description` | `string` | - | Additional description |
| `variant` | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Visual style |
| `duration` | `number` | `4000` | Auto-dismiss duration (ms) |
| `position` | `'top' \| 'bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom'` | Screen position |
| `dismissible` | `boolean` | `true` | Can be dismissed by user |
| `swipeToDismiss` | `boolean` | `true` | Swipe gesture to dismiss |
| `onDismiss` | `() => void` | - | Callback on dismiss |
| `onPress` | `() => void` | - | Callback on press |
| `icon` | `ReactNode` | - | Custom icon |
| `action` | `{ label: string; onPress: () => void }` | - | Action button |

## Hooks

### useToasts

```tsx
import { useToasts } from 'native-toast';

function ToastList() {
  const toasts = useToasts();
  
  return (
    <View>
      {toasts.map(toast => (
        <Text key={toast.id}>{toast.options.title}</Text>
      ))}
    </View>
  );
}
```

## Architecture

Blip Toast is built with a modular architecture:

- **Core** - Toast manager and state management
- **Components** - Pre-built UI components
- **Hooks** - React hooks for state access
- **Animations** - Animation utilities and presets
- **Utils** - Helper functions

## Roadmap

- [ ] React Native Reanimated support
- [ ] React Native Gesture Handler integration
- [ ] Promise-based toasts
- [ ] Queue management system
- [ ] Headless API
- [ ] Dynamic Island mode (iOS)
- [ ] Morphing toasts
- [ ] Custom themes
- [ ] Stack traces

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

## License

MIT © [Your Name](https://github.com/your-name)
