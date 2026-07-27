# Blip Toast

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Toast notifications for React Native.

## Features

| Feature              | Description                                             |
| -------------------- | ------------------------------------------------------- |
| Beautiful Animations | Smooth transitions powered by React Native Animated API |
| Multiple Variants    | Default, success, error, warning, and info toasts       |
| Flexible Positioning | Top, bottom, and corner positions (6 positions)         |
| Interactive          | Swipe to dismiss, action buttons, and press handlers    |
| Highly Customizable  | Themes, durations, and custom content                   |
| Cross-Platform       | Works on iOS, Android, and Web                          |
| Lightweight          | Minimal bundle size with tree-shaking support           |
| Headless API         | Full control over toast rendering                       |
| Future-Ready         | Prepared for Reanimated, Gesture Handler, and more      |

## Installation

```bash
# Using npm
npm install blip-toast

# Using yarn
yarn add blip-toast

# Using pnpm
pnpm add blip-toast
```

### Install from GitHub

```bash
# Using npm
npm install joao-tambue/Blip-toast#v0.1.0

# Using yarn
yarn add joao-tambue/Blip-toast#v0.1.0

# Using pnpm
pnpm add joao-tambue/Blip-toast#v0.1.0

# Using bun
bun add joao-tambue/Blip-toast#v0.1.0
```

### Peer Dependencies

Make sure you have the following installed:

```bash
npm install react-native-svg
```

`react` and `react-native` are also required (usually already installed in your project).

## Quick Start

```tsx
import toast, { ToastContainer } from 'blip-toast';

function App() {
  return (
    <>
      <Button title="Show Toast" onPress={() => toast('Hello World!')} />
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

### Promise Toast

```tsx
toast.promise(saveData(), {
  loading: 'Saving...',
  success: 'Data saved!',
  error: 'Failed to save data',
});
```

### Update Toast

```tsx
const t = toast('Loading...');
toast.update(t.id, { variant: 'success', title: 'Done!' });
```

### Dismiss Toasts

```tsx
const t = toast('Hello!');
t.dismiss(); // Dismiss specific toast

toast.dismissAll(); // Dismiss all toasts
```

## Props

| Prop             | Type                                                                                | Default     | Description                |
| ---------------- | ----------------------------------------------------------------------------------- | ----------- | -------------------------- |
| `title`          | `string`                                                                            | -           | Toast message              |
| `description`    | `string`                                                                            | -           | Additional description     |
| `variant`        | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'`                          | `'default'` | Visual style               |
| `duration`       | `number`                                                                            | `4000`      | Auto-dismiss duration (ms) |
| `position`       | `'top' \| 'bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom'`  | Screen position            |
| `dismissible`    | `boolean`                                                                           | `true`      | Can be dismissed by user   |
| `swipeToDismiss` | `boolean`                                                                           | `true`      | Swipe gesture to dismiss   |
| `onDismiss`      | `() => void`                                                                        | -           | Callback on dismiss        |
| `onPress`        | `() => void`                                                                        | -           | Callback on press          |
| `icon`           | `ReactNode`                                                                         | -           | Custom icon                |
| `action`         | `{ label: string; onPress: () => void }`                                            | -           | Action button              |
| `fillColor`      | `string`                                                                            | -           | Custom fill color          |
| `borderColor`    | `string`                                                                            | -           | Custom border color        |
| `classNames`     | `ToastClassNames`                                                                   | -           | Custom class names         |

## Hooks

### useToasts

```tsx
import { useToasts } from 'blip-toast';

function ToastList() {
  const toasts = useToasts();

  return (
    <View>
      {toasts.map((toast) => (
        <Text key={toast.id}>{toast.options.title}</Text>
      ))}
    </View>
  );
}
```

## Animation Presets

```tsx
import { animationPresets } from 'blip-toast';

// Available presets: smooth, bouncy, subtle, snappy
```

## Architecture

Blip Toast is built with a modular architecture:

- **Core** - Toast manager and state management
- **Components** - Pre-built UI components (ToastContainer, ToastItem, ProgressBar)
- **Hooks** - React hooks for state access (`useToasts`)
- **Animations** - Animation utilities and presets
- **Icons** - SVG icons for each variant
- **Utils** - Helper functions (generateId, clamp, sleep)

## Roadmap

- [ ] React Native Reanimated support
- [ ] React Native Gesture Handler integration
- [ ] Queue management system
- [ ] Headless API
- [ ] Dynamic Island mode (iOS)
- [ ] Custom themes
- [ ] Stack traces

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

## License

MIT © [João Tambue](https://github.com/joao-tambue)
