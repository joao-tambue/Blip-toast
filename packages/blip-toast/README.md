![Blip Toast banner](./public/banner.png)

# Blip Toast

Modern toast notifications for React Native, with animated stacking, variants, actions, promise states, and React Native Web support.

## Installation

```bash
npm install blip-toast react-native-svg
```

`react` and `react-native` are peer dependencies and must already be present in your app.

## Quick start

Mount one `ToastContainer` near the root of your application, then call `toast` from anywhere in the React tree.

```tsx
import { Button } from 'react-native';
import toast, { ToastContainer } from 'blip-toast';

export default function App() {
  return (
    <>
      <Button title="Show toast" onPress={() => toast('Hello, world!')} />
      <ToastContainer />
    </>
  );
}
```

## Usage

```tsx
toast.success('Saved successfully');

toast.error('Something went wrong', {
  description: 'Please try again.',
  duration: 5000,
});

toast('File deleted', {
  action: {
    label: 'Undo',
    onPress: restoreFile,
  },
});
```

### Promise toasts

```tsx
toast.promise(saveData(), {
  loading: 'Saving…',
  success: 'Saved successfully',
  error: 'Unable to save data',
});
```

### Update or dismiss

```tsx
const notification = toast('Uploading…');

toast.update(notification.id, {
  title: 'Upload complete',
  variant: 'success',
});

notification.dismiss();
toast.dismissAll();
```

### Custom layout

Adapt toasts to your design system without losing the animation, timing, promise
morphing, gestures or accessibility — the library still owns all of that. Three
opt-in tiers, composable, configurable per `<ToastContainer>` or once at the root
through `<ToastConfigProvider>` (container props win).

```tsx
import { ToastContainer } from 'blip-toast';

// 1. Re-skin a slot
<ToastContainer styles={{ content: { borderRadius: 12 }, title: { fontSize: 15 } }} />;

// 2. Swap a piece
<ToastContainer slots={{ Icon: MyBrandIcon }} />;

// 3. Full control of the inner card
<ToastContainer
  renderToast={({ title, description, colors, icon, progressBar, dismiss, runAction, action }) => (
    <View style={{ backgroundColor: colors.background, borderRadius: 16, padding: 14 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {icon}
        <Text style={{ color: colors.accent, fontWeight: '700' }}>{title}</Text>
      </View>
      {description ? <Text style={{ color: colors.text }}>{description}</Text> : null}
      {action ? <Button title={action.label} onPress={runAction} /> : null}
      {progressBar}
    </View>
  )}
/>;
```

```tsx
import { ToastConfigProvider } from 'blip-toast';

<ToastConfigProvider config={{ styles: myToastStyles, renderToast: MyToast }}>
  <App />
  <ToastContainer />
</ToastConfigProvider>;
```

## Features

- Default, success, error, warning, info, and loading states
- Top, bottom, and corner positioning
- Auto-dismiss timers, progress indicators, timestamps, and action buttons
- Custom icons, colors, borders, themes, and animation presets
- Custom layout: `styles` / `slots` / `renderToast` and `<ToastConfigProvider>`
- iOS, Android, and web support through React Native Web

## Documentation

Visit the [Blip Toast website](https://blip-toast.vercel.app) for the full API reference and live playground. The source code is available in the [project repository](https://github.com/joao-tambue/Blip-toast).

## License

[MIT](https://github.com/joao-tambue/Blip-toast/blob/demo-website/LICENSE)
