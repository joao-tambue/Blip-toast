import { View, Text, Pressable } from 'react-native';
import type { ToastRenderProps } from 'blip-toast';

export function DemoCustomToast({
  toast,
  title,
  description,
  colors,
  isDark,
  icon,
  action,
  timestamp,
  progressBar,
  runAction,
  dismiss,
}: ToastRenderProps) {
  const showTimestamp = toast.options.showTimestamp !== false;

  const accent = colors.accent;
  const titleColor = isDark ? '#F4F4F5' : '#18181B';
  const descriptionColor = isDark ? '#A1A1AA' : '#52525B';
  const muted = isDark ? '#A1A1AA' : '#71717A';
  const actionBg = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  const actionColor = isDark ? '#E4E4E7' : '#18181B';
  const defaultBorder = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
  const hasRichBorder = colors.border && colors.border !== 'transparent';

  return (
    <View
      style={{
        width: 356,
        maxWidth: '100%',
        borderRadius: 12,
        backgroundColor: colors.background,
        borderWidth: hasRichBorder ? 1.5 : 1,
        borderColor: hasRichBorder ? colors.border : defaultBorder,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: isDark ? 0.45 : 0.18,
        shadowRadius: isDark ? 32 : 20,
        shadowOffset: { width: 0, height: 12 },
        elevation: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingTop: 13,
          paddingLeft: 14,
          paddingRight: 10,
          paddingBottom: progressBar ? 0 : 13,
        }}
      >
        <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </View>

        <View style={{ flex: 1, gap: 3, minWidth: 0 }}>
          <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '600', color: titleColor }}>
            {title}
            {showTimestamp ? (
              <Text style={{ fontSize: 11, fontWeight: '400', color: muted }}>
                {'  ·  '}
                {timestamp}
              </Text>
            ) : null}
          </Text>
          {description ? (
            <Text style={{ fontSize: 13, lineHeight: 18, color: descriptionColor }}>
              {description}
            </Text>
          ) : null}
        </View>

        {action ? (
          <Pressable
            onPress={runAction}
            hitSlop={6}
            accessibilityRole="button"
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 6,
              backgroundColor: actionBg,
            }}
          >
            <Text style={{ fontSize: 12.5, fontWeight: '600', color: actionColor }}>
              {action.label}
            </Text>
          </Pressable>
        ) : null}

        <Pressable
          onPress={dismiss}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 12, color: accent }}>✕</Text>
        </Pressable>
      </View>

      {progressBar ? <View>{progressBar}</View> : null}
    </View>
  );
}
