import { MojiElement } from '../AnimationGraph';
import { OkTagNames } from '../types';
import { getAttributes } from '../AnimationGraph/SvgAnimate';

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

const explore = (el: Element): MojiElement[] => {
  const { tagName } = el;
  if (okTags.includes(tagName.toLowerCase()))
    return [{ tagName: tagName as OkTagNames, attributes: getAttributes(el) }];
  if (['defs', 'use', 'clippath'].includes(tagName.toLowerCase())) return [];
  const ch = flatMap(Array.from(el.children), (e: Element) => explore(e));
  if (['svg', 'g', 'div', 'body'].includes(tagName.toLowerCase())) return ch;
  throw new Error(`unhandled type ${tagName}`);
};

export default explore;
