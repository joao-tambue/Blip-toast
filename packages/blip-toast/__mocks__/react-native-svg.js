const React = require('react');

const Svg = React.forwardRef((props, ref) => React.createElement('Svg', { ...props, ref }));
Svg.displayName = 'Svg';

const Path = (props) => React.createElement('Path', props);
const Circle = (props) => React.createElement('Circle', props);
const G = (props) => React.createElement('G', props);
const Defs = (props) => React.createElement('Defs', props);
const ClipPath = (props) => React.createElement('ClipPath', props);
const Rect = (props) => React.createElement('Rect', props);
const Line = (props) => React.createElement('Line', props);

module.exports = {
  __esModule: true,
  default: Svg,
  Svg,
  Path,
  Circle,
  G,
  Defs,
  ClipPath,
  Rect,
  Line,
};
