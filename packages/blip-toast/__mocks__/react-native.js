const React = require('react');

const View = (props) => React.createElement('View', props);
const Text = (props) => React.createElement('Text', props);
const TouchableOpacity = (props) => React.createElement('TouchableOpacity', props);
const StyleSheet = {
  create: (styles) => styles,
};
const Platform = {
  OS: 'ios',
  select: (obj) => obj.ios || obj.default,
};
const useColorScheme = () => 'light';

class AnimatedValue {
  constructor(val) {
    this._value = val;
  }
  setValue(val) {
    this._value = val;
  }
  stopAnimation(callback) {
    callback && callback(this._value);
  }
  interpolate() {
    return { inputRange: [], outputRange: [] };
  }
}

const timing = () => ({ start: (cb) => cb && cb() });
const spring = () => ({ start: (cb) => cb && cb() });
const parallel = () => ({ start: (cb) => cb && cb() });
const sequence = () => ({ start: (cb) => cb && cb() });
const loop = () => ({ start: (cb) => cb && cb() });

const createAnimatedComponent = (Component) => {
  const HostType = Component === View ? 'View' : Component === Text ? 'Text' : undefined;
  if (HostType) {
    return (props) => React.createElement(HostType, props);
  }
  return React.forwardRef((props, ref) => {
    const { style, ...rest } = props;
    return React.createElement(Component, { ...rest, style, ref });
  });
};

const Animated = {
  View: (props) => React.createElement('View', props),
  Text: (props) => React.createElement('Text', props),
  Value: AnimatedValue,
  timing,
  spring,
  parallel,
  sequence,
  loop,
  createAnimatedComponent,
};

const Easing = {
  linear: (t) => t,
  out: () => (t) => t,
  in: () => (t) => t,
  inOut: () => (t) => t,
};

module.exports = {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useColorScheme,
  Animated,
  Easing,
};
