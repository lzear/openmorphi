import React from 'react';
import _ from 'lodash';
import { animD } from './Path';
import { getAttrsForAnimE, MojiElement } from '.';
import { adjustPointsLength } from './Poly';
import { OkTags } from '../components/getelems';
import { AnimationData } from '../views/CreateAnimation/AnimationPicker';

const attributeNameJSX = (key: string) =>
  key.startsWith('data-') ? key : _.camelCase(key);

export const getProps = (e: Element) => {
  const attriis = e.getAttributeNames();
  return attriis.reduce(
    (prev, cur) => ({
      ...prev,
      [attributeNameJSX(cur)]: e.getAttribute(cur),
    }),
    {} as { [s: string]: string | null },
  );
};

const animateValues = (
  attributeName: string,
  [value1, value2]: [string | null, string | null],
) => `${value1};${value2};${value1}`;

const Animate: React.FC<{
  attributeName: string;
  speed: number;
  duration: number;
  values: [string | null, string | null];
}> = ({ attributeName, values, speed, duration }) => (
  <animate
    attributeName={attributeName}
    dur={`${duration}ms`}
    repeatCount="indefinite"
    keyTimes="0;0.5;1"
    calcMode="spline"
    keySplines={`${speed} 0 0 ${speed}; ${speed} 0 0 ${speed}`}
    values={animateValues(attributeName, values)}
  />
);

export type ElementProps = { [atr: string]: string | null };

export const Animated: React.FC<{
  animation: AnimationData;
  speed?: number;
  duration?: number;
}> = ({
  animation: { tagName, attributesConstant, attributesToAnimate },
  speed = 0.5,
  duration = 5000,
}) => {
  return React.createElement(
    tagName,
    attributesConstant,
    Object.keys(attributesToAnimate).map((atr) => (
      <Animate
        key={atr}
        attributeName={atr}
        values={attributesToAnimate[atr]}
        duration={duration}
        speed={speed}
      />
    )),
  );
};

export const DisplayE: React.FC<{ el: MojiElement }> = ({ el }) =>
  React.createElement(el.type, el.props);

export const animationObjectsPath = (e1: ElementProps, e2: ElementProps) => {
  const { attributesConstant, attributesToAnimate } = getAttrsForAnimE(e1, e2);
  const d1 = e1.d;
  const d2 = e2.d;
  const attributesToAnimateList: {
    [atr: string]: [string | null, string | null];
  }[] =
    d1 && d2
      ? animD(d1, d2).map((d) => ({ ...attributesToAnimate, d }))
      : [attributesToAnimate];
  return {
    tagName: 'path' as 'path',
    attributesConstant: attributesConstant,
    attributesToAnimateList,
  };
};

export const animationObjectsSimple = (
  tagName: OkTags,
  e1: ElementProps,
  e2: ElementProps,
) => {
  const { attributesConstant, attributesToAnimate } = getAttrsForAnimE(e1, e2);
  const attributesToAnimateList: {
    [atr: string]: [string | null, string | null];
  }[] = [attributesToAnimate];
  return {
    tagName,
    attributesConstant: attributesConstant,
    attributesToAnimateList,
  };
};

export const animationObjectsPolyline = (
  e1: ElementProps,
  e2: ElementProps,
) => {
  const { attributesConstant, attributesToAnimate } = getAttrsForAnimE(e1, e2);
  const p1 = e1.points;
  const p2 = e2.points;
  const toAnimateList: { [atr: string]: [string | null, string | null] }[] =
    p1 && p2
      ? adjustPointsLength(p1, p2).map((points) => ({
          ...attributesToAnimate,
          points,
        }))
      : [attributesToAnimate];
  return {
    tagName: 'polyline' as 'polyline',
    attributesConstant: attributesConstant,
    attributesToAnimateList: toAnimateList,
  };
};

export const animationObjectsPolygon = (
  e1: ElementProps,
  e2: ElementProps,
): {
  attributesConstant: ElementProps;
  attributesToAnimateList: { [p: string]: [string | null, string | null] }[];
  tagName: 'polygon';
} => {
  const { attributesToAnimate, attributesConstant } = getAttrsForAnimE(e1, e2);
  const p1 = e1.points;
  const p2 = e2.points;
  const attributesToAnimateList: {
    [atr: string]: [string | null, string | null];
  }[] =
    p1 && p2
      ? adjustPointsLength(p1, p2).map((points) => ({
          ...attributesToAnimate,
          points,
        }))
      : [attributesToAnimate];
  return { tagName: 'polygon', attributesConstant, attributesToAnimateList };
};

export const animationObjectsFromPair = (
  e1: MojiElement,
  e2: MojiElement,
): {
  attributesConstant: ElementProps;
  attributesToAnimateList: { [p: string]: [string | null, string | null] }[];
  tagName: OkTags;
} => {
  if (e1.type !== e2.type) throw Error('non matching svgelem type');
  if (e1.type === 'polygon') return animationObjectsPolygon(e1.props, e2.props);
  if (e1.type === 'polyline')
    return animationObjectsPolyline(e1.props, e2.props);
  if (e1.type === 'path') return animationObjectsPath(e1.props, e2.props);
  if (['ellipse', 'circle', 'rect', 'line'].includes(e1.type))
    return animationObjectsSimple(e1.type, e1.props, e2.props);
  throw Error('non matching svgelem type');
};
