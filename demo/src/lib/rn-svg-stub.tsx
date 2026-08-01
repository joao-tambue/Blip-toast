/* react-native-svg → web shim.
 *
 * blip-toast renders its variant icons with react-native-svg (Svg, Path,
 * Circle, Line). react-native-svg's Fabric build does not run on the web, so
 * the demo aliases the module to this tiny shim that renders plain DOM SVG.
 * Only the primitives blip-toast actually uses are implemented, and RN style
 * objects (including RNW's Animated `transform`) are normalized to CSS.
 */
import { forwardRef } from 'react';

function flatten(style: unknown): Record<string, unknown> {
  if (!style) return {};
  if (Array.isArray(style)) return Object.assign({}, ...style.map(flatten));
  if (typeof style === 'object') return { ...(style as Record<string, unknown>) };
  return {};
}

function toCssTransform(transform: unknown): string | undefined {
  if (typeof transform === 'string') return transform;
  if (Array.isArray(transform)) {
    return transform
      .map((op) => {
        const key = Object.keys(op)[0];
        const value = op[key];
        return `${key}(${typeof value === 'number' ? `${value}px` : value})`;
      })
      .join(' ');
  }
  if (transform && typeof transform === 'object') {
    const key = Object.keys(transform)[0];
    const value = (transform as Record<string, unknown>)[key];
    return `${key}(${typeof value === 'number' ? `${value}px` : value})`;
  }
  return undefined;
}

function toCss(style: unknown): React.CSSProperties {
  const flat = flatten(style);
  const { transform, ...rest } = flat;
  const css: React.CSSProperties = rest as React.CSSProperties;
  const cssTransform = toCssTransform(transform);
  if (cssTransform) css.transform = cssTransform;
  return css;
}

export const Svg = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { style?: unknown }>(
  function Svg({ style, children, ...props }, ref) {
    return (
      <svg ref={ref} {...(props as React.SVGProps<SVGSVGElement>)} style={toCss(style)}>
        {children}
      </svg>
    );
  }
);

const Path = forwardRef<SVGPathElement, React.SVGProps<SVGPathElement>>(function Path(props, ref) {
  return <path ref={ref} {...props} />;
});

const Circle = forwardRef<SVGCircleElement, React.SVGProps<SVGCircleElement>>(
  function Circle(props, ref) {
    return <circle ref={ref} {...props} />;
  }
);

const Line = forwardRef<SVGLineElement, React.SVGProps<SVGLineElement>>(function Line(props, ref) {
  return <line ref={ref} {...props} />;
});

export { Path, Circle, Line };

export default Svg;
