import _ from 'lodash';
import { line2pathR } from './Line';
import { polyline2path, rect2polygon } from './Polyline';
import { polygon2polyline } from './Polygon';
import { circle2ellipse } from './Circle';
import { ellipse2path } from './Ellipse';
import { Attributes } from '../types';
import { animationObjectsFromPair } from './SvgAnimate';

interface AbstractElement {
  attributes: Attributes;
}
export interface ElementPath extends AbstractElement {
  readonly tagName: 'path';
}
export interface ElementLine extends AbstractElement {
  readonly tagName: 'line';
}
export interface ElementPolyline extends AbstractElement {
  readonly tagName: 'polyline';
}
export interface ElementPolygon extends AbstractElement {
  readonly tagName: 'polygon';
}
export interface ElementRect extends AbstractElement {
  readonly tagName: 'rect';
}
export interface ElementCircle extends AbstractElement {
  readonly tagName: 'circle';
}
export interface ElementEllipse extends AbstractElement {
  readonly tagName: 'ellipse';
}

export type MojiElement =
  | ElementPath
  | ElementEllipse
  | ElementLine
  | ElementRect
  | ElementCircle
  | ElementPolygon
  | ElementPolyline;

export const derivedElements = (e: MojiElement): MojiElement[] => {
  if (e.tagName === 'path') return [e];
  if (e.tagName === 'line') return [e, line2pathR(e)];
  if (e.tagName === 'polyline')
    return [e, ...derivedElements(polyline2path(e))];
  if (e.tagName === 'polygon')
    return [e, ...derivedElements(polygon2polyline(e))];
  if (e.tagName === 'rect') return [e, ...derivedElements(rect2polygon(e))];
  if (e.tagName === 'ellipse') return [e, ...derivedElements(ellipse2path(e))];
  if (e.tagName === 'circle') return [e, ...derivedElements(circle2ellipse(e))];
  throw Error(`missing element ${e}`);
};

const convertAttrValuesForAnim = (
  values: [string | null, string | null],
  attributeName: string,
) =>
  values.map((value) => {
    if (
      ['fill', 'stroke'].includes(attributeName) &&
      (!value || ['none'].includes(value))
    )
      return 'transparent';
    return value;
  }) as [string | null, string | null];

export const splitAttributes = (
  attributes1: Attributes,
  attributes2: Attributes,
): {
  attributesConstant: Attributes;
  attributesToAnimate: { [atr: string]: [string | null, string | null] };
} => {
  const attributesA = Object.keys(attributes1);
  const attributesB = Object.keys(attributes2);
  const constantAttr = attributesA.filter(
    (k) => attributes2[k] === attributes1[k],
  );
  const attributesToAnimate = _.uniq([...attributesA, ...attributesB])
    .filter((k) => attributes2[k] !== attributes1[k])
    .reduce(
      (
        prev: { [atr: string]: [string | null, string | null] },
        current: string,
      ) => ({
        ...prev,
        [current]: [attributes1[current], attributes2[current]] as [
          string | null,
          string | null,
        ],
      }),
      {} as { [atr: string]: [string | null, string | null] },
    );
  return {
    attributesConstant: _.pick(attributes1, constantAttr),
    attributesToAnimate: _.mapValues(
      attributesToAnimate,
      convertAttrValuesForAnim,
    ),
  };
};

export const generateAnimationObjets = (
  mojiA: MojiElement,
  mojiB: MojiElement,
) => {
  const derivedElements1 = derivedElements(mojiA);
  const derivedElements2 = derivedElements(mojiB);
  return derivedElements1.flatMap((derivedA) =>
    derivedElements2
      .filter((de2) => derivedA.tagName === de2.tagName)
      .flatMap((derivedB) => {
        const {
          attributesConstant,
          attributesToAnimateList,
          tagName,
        } = animationObjectsFromPair(derivedA, derivedB);
        return attributesToAnimateList.map((attributesToAnimate) => ({
          tagName,
          attributesConstant,
          attributesToAnimate,
        }));
      }),
  );
};
