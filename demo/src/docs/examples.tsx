import toast from 'blip-toast';
import type { AnimationPresetName } from 'blip-toast';
import { Rocket } from 'lucide-react';

/* Each example pairs the snippet shown on the page with the exact call its
 * Run button makes, so what you read is what fires. */

export interface Example {
  filename: string;
  code: string;
  lang?: 'tsx' | 'bash';
  run?: () => void;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const savePost = () =>
  sleep(2200).then(() => ({ title: 'Launch notes', url: '/posts/launch-notes' }));

export const EXAMPLES = {
  setup: {
    filename: 'App.tsx',
    code: `import { ToastContainer } from 'blip-toast';

export default function App() {
  return (
    <>
      <RootNavigator />
      <ToastContainer position="top" />
    </>
  );
}`,
  },

  basic: {
    filename: 'ProfileScreen.tsx',
    code: `import toast from 'blip-toast';

function onSave() {
  toast('Profile updated');
}`,
    run: () => toast('Profile updated'),
  },

  variants: {
    filename: 'variants.ts',
    code: `toast('Draft saved');
toast.success('Payment received');
toast.info('A new version is available');
toast.warning('Storage almost full');
toast.error('Upload failed');`,
    run: () => {
      toast('Draft saved');
      setTimeout(() => toast.success('Payment received'), 250);
      setTimeout(() => toast.info('A new version is available'), 500);
      setTimeout(() => toast.warning('Storage almost full'), 750);
      setTimeout(() => toast.error('Upload failed'), 1000);
    },
  },

  action: {
    filename: 'InboxScreen.tsx',
    code: `toast('Conversation archived', {
  description: 'It moved to the Archive folder.',
  duration: 6000,
  action: {
    label: 'Undo',
    successLabel: 'Restored',
    onPress: () => unarchive(conversation.id),
  },
});`,
    run: () =>
      toast('Conversation archived', {
        description: 'It moved to the Archive folder.',
        duration: 6000,
        action: { label: 'Undo', successLabel: 'Restored', onPress: () => {} },
      }),
  },

  promise: {
    filename: 'EditorScreen.tsx',
    code: `toast.promise(savePost(draft), {
  loading: 'Publishing…',
  success: (post) => \`Published "\${post.title}"\`,
  error: (err) => \`Couldn't publish: \${err.message}\`,
  description: {
    success: 'It is live on your profile.',
  },
});`,
    run: () =>
      toast.promise(savePost(), {
        loading: 'Publishing…',
        success: (post) => `Published "${post.title}"`,
        error: (err) => `Couldn't publish: ${(err as Error).message}`,
        description: {
          success: 'It is live on your profile.',
        },
      }),
  },

  update: {
    filename: 'upload.ts',
    code: `const upload = toast('Uploading video…', { duration: Infinity });

// later, from a progress callback
upload.update({ title: 'Processing video…', variant: 'info' });

// when the job finishes
toast.update(upload.id, {
  title: 'Video ready',
  variant: 'success',
  description: 'Tap to share it.',
});
setTimeout(() => upload.dismiss(), 3000);`,
    run: () => {
      const upload = toast('Uploading video…', { duration: Infinity });
      setTimeout(() => upload.update({ title: 'Processing video…', variant: 'info' }), 1300);
      setTimeout(() => {
        toast.update(upload.id, {
          title: 'Video ready',
          variant: 'success',
          description: 'Tap to share it.',
        });
        setTimeout(() => upload.dismiss(), 3000);
      }, 2600);
    },
  },

  icon: {
    filename: 'deploy.tsx',
    code: `import { Rocket } from 'lucide-react-native';

toast('Build deployed', {
  description: 'Version 2.4.0 is rolling out.',
  icon: <Rocket size={18} color="#1E88E5" />,
});`,
    run: () =>
      toast('Build deployed', {
        description: 'Version 2.4.0 is rolling out.',
        icon: <Rocket size={18} color="#1E88E5" />,
      }),
  },

  headless: {
    filename: 'TabBadge.tsx',
    code: `import { useToasts } from 'blip-toast';

function NotificationsBadge() {
  const toasts = useToasts();
  if (toasts.length === 0) return null;

  return <Badge count={toasts.length} />;
}`,
  },

  positions: {
    filename: 'App.tsx',
    code: `<ToastContainer position="bottom-right" offset={16} />`,
  },

  theming: {
    filename: 'App.tsx',
    code: `const scheme = useAppTheme(); // 'light' | 'dark'

<ToastContainer theme="system" />   // follow the device
<ToastContainer theme={scheme} />   // follow your app's own setting`,
  },

  stacking: {
    filename: 'App.tsx',
    code: `<ToastContainer
  maxVisible={3}  // toasts fully visible at once
  gap={8}         // points between stacked cards
  offset={24}     // extra distance from the edges
/>`,
  },

  rich: {
    filename: 'checkout.ts',
    code: `toast.success('Payment received', {
  description: '$128.00 · Visa ending 4242',
  fillColor: '#0E1114',
  borderColor: '#4ADE80',
  borderWidth: 1.5,
  showProgress: true,
});`,
    run: () =>
      toast.success('Payment received', {
        description: '$128.00 · Visa ending 4242',
        fillColor: '#0E1114',
        borderColor: '#4ADE80',
        borderWidth: 1.5,
        showProgress: true,
      }),
  },

  presets: {
    filename: 'motion.ts',
    code: `toast('Settled', { preset: 'smooth' });
toast('Landed', { preset: 'bouncy' });

// or tune it yourself
toast('Custom spring', {
  spring: true,
  bounce: 0.25,
  timing: { displayDuration: 6000 },
});`,
  },

  styles: {
    filename: 'App.tsx',
    code: `<ToastContainer
  styles={{
    wrapper: { borderRadius: 14, padding: 3 },
    content: { borderRadius: 11 },
    title: { fontFamily: 'Inter-SemiBold', fontSize: 15 },
    description: { color: '#6B7280' },
    actionButton: { borderRadius: 999 },
  }}
/>`,
  },

  slots: {
    filename: 'App.tsx',
    code: `import type { ToastIconSlotProps } from 'blip-toast';

function BrandIcon({ phase, color, size }: ToastIconSlotProps) {
  if (phase === 'loading') return <ActivityIndicator color={color} />;
  return <Logo width={size} height={size} fill={color} />;
}

<ToastContainer slots={{ Icon: BrandIcon }} />`,
  },

  customLayout: {
    filename: 'SoftToast.tsx',
    code: `import { View, Text, Pressable } from 'react-native';
import type { ToastRenderProps } from 'blip-toast';

export function SoftToast({
  title, description, icon, action, colors, isDark,
  progressBar, runAction, dismiss,
}: ToastRenderProps) {
  return (
    <View style={{
      width: 356, maxWidth: '100%', borderRadius: 12, overflow: 'hidden',
      backgroundColor: colors.background, borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13 }}>
        {icon}
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '600', color: isDark ? '#F4F4F5' : '#18181B' }}>
            {title}
          </Text>
          {description ? <Text style={{ color: colors.text }}>{description}</Text> : null}
        </View>
        {action ? (
          <Pressable onPress={runAction}><Text>{action.label}</Text></Pressable>
        ) : null}
        <Pressable onPress={dismiss} accessibilityLabel="Dismiss">
          <Text style={{ color: colors.accent }}>✕</Text>
        </Pressable>
      </View>
      {progressBar}
    </View>
  );
}

<ToastContainer renderToast={SoftToast} />`,
    run: () =>
      toast('Invite sent', {
        description: 'Ana will get an email in a moment.',
        action: { label: 'Copy link', successLabel: 'Link copied', onPress: () => {} },
        showProgress: true,
      }),
  },

  provider: {
    filename: 'App.tsx',
    code: `import { ToastConfigProvider, ToastContainer } from 'blip-toast';

const toastConfig = {
  styles: { title: { fontFamily: 'Inter-SemiBold' } },
  slots: { Icon: BrandIcon },
};

export default function App() {
  return (
    <ToastConfigProvider config={toastConfig}>
      <RootNavigator />
      <ToastContainer position="top" />
    </ToastConfigProvider>
  );
}`,
  },
} satisfies Record<string, Example>;

export function runPreset(preset: AnimationPresetName) {
  toast(`preset: '${preset}'`, { preset, description: 'Watch how it lands.' });
}
