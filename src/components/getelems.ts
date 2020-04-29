import { toMojiElement, MojiElement } from '../AnimationGraph';

export function flatMap<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[],
): U[] {
  return Array.prototype.concat(...array.map(callbackfn));
}

const okTags = [
  'line',
  'path',
  'circle',
  'ellipse',
  'polyline',
  'rect',
  'polygon',
];
export type OkTags =
  | 'line'
  | 'path'
  | 'circle'
  | 'ellipse'
  | 'polyline'
  | 'rect'
  | 'polygon';

export type OkEl =
  | SVGLineElement
  | SVGPathElement
  | SVGCircleElement
  | SVGEllipseElement
  | SVGPolylineElement
  | SVGPolygonElement;

const explore = (el: Element): MojiElement[] => {
  const { tagName } = el;
  if (okTags.includes(tagName.toLowerCase()))
    return [toMojiElement(el as OkEl)];
  if (['defs', 'use', 'clippath'].includes(tagName.toLowerCase())) return [];
  const ch = flatMap(Array.from(el.children), (e: Element) => explore(e));
  if (['svg', 'g', 'div', 'body'].includes(tagName.toLowerCase())) return ch;
  throw new Error(`unhandled type ${tagName}`);
};

export default explore;
