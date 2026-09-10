import { Platform, StyleSheet } from 'react-native';

export const MAX_TOAST_WIDTH =
  Platform.OS === 'web' ? ('min(380px, calc(100vw - 48px))' as unknown as number) : 380;

/**
 * The built-in toast layout styles. Consumers restyle individual slots through
 * the `styles` prop / `ToastConfig.styles`, which is merged over these.
 */
export const defaultToastStyles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    maxWidth: MAX_TOAST_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  content: {
    padding: 12,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrapper: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  timestamp: {
    fontSize: 11,
    color: '#999',
    marginLeft: 'auto',
  },
  body: {
    marginTop: 8,
  },
  description: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
  },
  actionButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressBar: {
    marginTop: 8,
  },
});
