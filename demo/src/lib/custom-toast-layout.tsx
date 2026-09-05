import { View, Text, Pressable } from 'react-native';
import type { ToastRenderProps } from 'blip-toast';

const MONO = '"JetBrains Mono Variable", ui-monospace, SFMono-Regular, monospace';

export function DemoCustomToast({
  phase,
  title,
  description,
  colors,
  icon,
  action,
  timestamp,
  progressBar,
  runAction,
  dismiss,
}: ToastRenderProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: 360,
        maxWidth: '100%',
        backgroundColor: '#080911',
        borderWidth: 1,
        borderColor: `${colors.accent}44`,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <View style={{ width: 3, backgroundColor: colors.accent }} />

      <View style={{ flex: 1, paddingVertical: 11, paddingHorizontal: 13, gap: 7 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 3,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${colors.accent}1F`,
            }}
          >
            {icon}
          </View>
          <Text
            style={{
              flex: 1,
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: 2,
              color: colors.accent,
            }}
          >
            {(phase === 'default' ? 'system' : phase).toUpperCase()}
            {'  ·  '}
            {timestamp}
          </Text>
          <Pressable onPress={dismiss} accessibilityLabel="Dismiss" hitSlop={10}>
            <Text style={{ fontFamily: MONO, fontSize: 13, color: '#5b6274' }}>✕</Text>
          </Pressable>
        </View>

        <Text style={{ fontFamily: MONO, fontSize: 13, color: '#e7e9f2' }}>{title}</Text>

        {description ? (
          <Text style={{ fontFamily: MONO, fontSize: 12, lineHeight: 17, color: '#878da3' }}>
            {description}
          </Text>
        ) : null}

        {action ? (
          <Pressable onPress={runAction} style={{ alignSelf: 'flex-start', marginTop: 1 }}>
            <Text
              style={{ fontFamily: MONO, fontSize: 12, letterSpacing: 1, color: colors.accent }}
            >
              {`[ ${action.label.toUpperCase()} ]`}
            </Text>
          </Pressable>
        ) : null}

        {progressBar}
      </View>
    </View>
  );
}
