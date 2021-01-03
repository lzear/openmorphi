import React from 'react'
import _ from 'lodash'
import { animD } from './Path'
import { splitAttributes, MojiElement } from '.'
import { adjustPointsLength } from './Poly'
import { AnimationData, Attributes, OkTagNames } from '../types'

const convertAttributeNameForJsx = (key: string) =>
  key.startsWith('data-') ? key : _.camelCase(key)

const convertAttributesForJsx = <T extends any>(attributes: {
  [key: string]: T
}) => _.mapKeys(attributes, (value, key) => convertAttributeNameForJsx(key))

export const getAttributes = (e: Element) => {
  const attriis = e.getAttributeNames()
  return attriis.reduce(
    (prev, cur) => ({
      ...prev,
      [cur]: e.getAttribute(cur),
    }),
    {} as { [s: string]: string | null },
  )
}

const animateValues = (
  attributeName: string,
  [value1, value2]: [string | null, string | null],
) => `${value1};${value2};${value1}`

const Animate: React.FC<{
  attributeName: string
  spline: number
  duration: number
  values: [string | null, string | null]
}> = ({ attributeName, values, spline, duration }) => (
  <animate
    attributeName={attributeName}
    dur={`${duration}ms`}
    repeatCount="indefinite"
    keyTimes="0;0.5;1"
    calcMode="spline"
    keySplines={`${spline} 0 0 ${spline}; ${spline} 0 0 ${spline}`}
    values={animateValues(attributeName, values)}
  />
)

export const Animated: React.FC<{
  animation: AnimationData
  spline?: number
  duration?: number
}> = ({
  animation: { tagName, attributesConstant, attributesToAnimate },
  spline = 0.5,
  duration = 5000,
}) =>
  React.createElement(
    tagName,
    convertAttributesForJsx(attributesConstant),
    Object.keys(attributesToAnimate).map((atr) => (
      <Animate
        key={atr}
        attributeName={atr}
        values={attributesToAnimate[atr]}
        duration={duration}
        spline={spline}
      />
    )),
  )

export const DisplaySvgElement: React.FC<{ el: MojiElement }> = ({ el }) =>
  React.createElement(el.tagName, convertAttributesForJsx(el.attributes))

export const animationObjectsPath = (
  attributes1: Attributes,
  attributes2: Attributes,
) => {
  const { attributesConstant, attributesToAnimate } = splitAttributes(
    attributes1,
    attributes2,
  )
  const d1 = attributes1.d
  const d2 = attributes2.d
  const attributesToAnimateList: {
    [atr: string]: [string | null, string | null]
  }[] =
    d1 && d2
      ? animD(d1, d2).map((d) => ({ ...attributesToAnimate, d }))
      : [attributesToAnimate]
  return {
    tagName: 'path' as const,
    attributesConstant: attributesConstant,
    attributesToAnimateList,
  }
}

export const animationObjectsSimple = (
  tagName: OkTagNames,
  e1: Attributes,
  e2: Attributes,
) => {
  const { attributesConstant, attributesToAnimate } = splitAttributes(e1, e2)
  const attributesToAnimateList: {
    [atr: string]: [string | null, string | null]
  }[] = [attributesToAnimate]
  return {
    tagName,
    attributesConstant: attributesConstant,
    attributesToAnimateList,
  }
}

export const animationObjectsPolyline = (e1: Attributes, e2: Attributes) => {
  const { attributesConstant, attributesToAnimate } = splitAttributes(e1, e2)
  const p1 = e1.points
  const p2 = e2.points
  const toAnimateList: { [atr: string]: [string | null, string | null] }[] =
    p1 && p2
      ? adjustPointsLength(p1, p2).map((points) => ({
          ...attributesToAnimate,
          points,
        }))
      : [attributesToAnimate]
  return {
    tagName: 'polyline' as const,
    attributesConstant: attributesConstant,
    attributesToAnimateList: toAnimateList,
  }
}

export const animationObjectsPolygon = (
  attributes1: Attributes,
  attributes2: Attributes,
): {
  attributesConstant: Attributes
  attributesToAnimateList: { [p: string]: [string | null, string | null] }[]
  tagName: 'polygon'
} => {
  const { attributesToAnimate, attributesConstant } = splitAttributes(
    attributes1,
    attributes2,
  )
  const p1 = attributes1.points
  const p2 = attributes2.points
  const attributesToAnimateList: {
    [atr: string]: [string | null, string | null]
  }[] =
    p1 && p2
      ? adjustPointsLength(p1, p2).map((points) => ({
          ...attributesToAnimate,
          points,
        }))
      : [attributesToAnimate]
  return { tagName: 'polygon', attributesConstant, attributesToAnimateList }
}

export const animationObjectsFromPair = (
  e1: MojiElement,
  e2: MojiElement,
): {
  attributesConstant: Attributes
  attributesToAnimateList: { [p: string]: [string | null, string | null] }[]
  tagName: OkTagNames
} => {
  if (e1.tagName !== e2.tagName) throw Error('non matching svgelem type')
  if (e1.tagName === 'polygon')
    return animationObjectsPolygon(e1.attributes, e2.attributes)
  if (e1.tagName === 'polyline')
    return animationObjectsPolyline(e1.attributes, e2.attributes)
  if (e1.tagName === 'path')
    return animationObjectsPath(e1.attributes, e2.attributes)
  if (['ellipse', 'circle', 'rect', 'line'].includes(e1.tagName))
    return animationObjectsSimple(e1.tagName, e1.attributes, e2.attributes)
  throw Error('non matching svgelem type')
}
