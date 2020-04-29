import _ from 'lodash';
import { OkEl } from '../components/getelems';
import { ElementProps, getProps, animationObjectsFromPair } from './AniPath';
import { line2pathR } from './Line';
import { polyline2path, rect2polygon } from './Polyline';
import { polygon2polyline } from './Polygon';
import { circle2ellipse } from './Circle';
import { ellipse2path } from './Ellipse';

interface AbstractElement {
  props: ElementProps;
}
export interface ElementPath extends AbstractElement {
  readonly type: 'path';
}
export interface ElementLine extends AbstractElement {
  readonly type: 'line';
}
export interface ElementPolyline extends AbstractElement {
  readonly type: 'polyline';
}
export interface ElementPolygon extends AbstractElement {
  readonly type: 'polygon';
}
export interface ElementRect extends AbstractElement {
  readonly type: 'rect';
}
export interface ElementCircle extends AbstractElement {
  readonly type: 'circle';
}
export interface ElementEllipse extends AbstractElement {
  readonly type: 'ellipse';
}

export type MojiElement =
  | ElementPath
  | ElementEllipse
  | ElementLine
  | ElementRect
  | ElementCircle
  | ElementPolygon
  | ElementPolyline;

export const toMojiElement = (e: OkEl): MojiElement => {
  const props = getProps(e);
  if (e.tagName === 'path') return { type: 'path', props };
  if (e.tagName === 'line') return { type: 'line', props };
  if (e.tagName === 'polyline') return { type: 'polyline', props };
  if (e.tagName === 'polygon') return { type: 'polygon', props };
  if (e.tagName === 'rect') return { type: 'rect', props };
  if (e.tagName === 'ellipse') return { type: 'ellipse', props };
  if (e.tagName === 'circle') return { type: 'circle', props };
  throw Error(`missing E ${e.tagName}`);
};

export const derivedElements = (e: MojiElement): MojiElement[] => {
  if (e.type === 'path') return [e];
  if (e.type === 'line') return [e, line2pathR(e)];
  if (e.type === 'polyline') return [e, ...derivedElements(polyline2path(e))];
  if (e.type === 'polygon') return [e, ...derivedElements(polygon2polyline(e))];
  if (e.type === 'rect') return [e, ...derivedElements(rect2polygon(e))];
  if (e.type === 'ellipse') return [e, ...derivedElements(ellipse2path(e))];
  if (e.type === 'circle') return [e, ...derivedElements(circle2ellipse(e))];
  throw Error(`missing element ${e}`);
};

const convertAttrValuesForAnim = (
  values: [string | null, string | null],
  attributeName: string,
) =>
  values.map((value) => {
    if (['fill', 'stroke'].includes(attributeName) && value === 'none')
      return 'transparent';
    return value;
  }) as [string | null, string | null];

export const getAttrsForAnimE: (
  propsA: ElementProps,
  propsB: ElementProps,
) => {
  attributesConstant: ElementProps;
  attributesToAnimate: { [atr: string]: [string | null, string | null] };
} = (propsA: ElementProps, propsB: ElementProps) => {
  const attributesA = Object.keys(propsA);
  const attributesB = Object.keys(propsB);
  const constantAttr = attributesA.filter((k) => propsB[k] === propsA[k]);
  const attributesToAnimate = _.uniq([...attributesA, ...attributesB])
    .filter((k) => propsB[k] !== propsA[k])
    .reduce(
      (
        prev: { [atr: string]: [string | null, string | null] },
        current: string,
      ) => ({
        ...prev,
        [current]: [propsA[current], propsB[current]] as [
          string | null,
          string | null,
        ],
      }),
      {} as { [atr: string]: [string | null, string | null] },
    );
  return {
    attributesConstant: _.pick(propsA, constantAttr),
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
  const derivedListA = derivedElements(mojiA);
  const derivedListB = derivedElements(mojiB);
  return derivedListA.flatMap((derivedA) =>
    derivedListB
      .filter((de2) => derivedA.type === de2.type)
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
