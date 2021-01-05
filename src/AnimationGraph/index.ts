import _ from 'lodash'
import { line2pathR } from './Line'
import { polyline2path, rect2polygon } from './Polyline'
import { polygon2polyline } from './Polygon'
import { circle2ellipse } from './Circle'
import { ellipse2path } from './Ellipse'
import { Attributes } from '../types'
import { animationObjectsFromPair } from './SvgAnimate'

interface AbstractShape {
  attributes: Attributes
  transformationCost: number
  transformationList: string[]
}
export interface ShapePath extends AbstractShape {
  readonly tagName: 'path'
}
export interface ShapeLine extends AbstractShape {
  readonly tagName: 'line'
}
export interface ShapePolyline extends AbstractShape {
  readonly tagName: 'polyline'
}
export interface ShapePolygon extends AbstractShape {
  readonly tagName: 'polygon'
}
export interface ShapeRect extends AbstractShape {
  readonly tagName: 'rect'
}
export interface ShapeCircle extends AbstractShape {
  readonly tagName: 'circle'
}
export interface ShapeEllipse extends AbstractShape {
  readonly tagName: 'ellipse'
}

export type Shape =
  | ShapePath
  | ShapeEllipse
  | ShapeLine
  | ShapeRect
  | ShapeCircle
  | ShapePolygon
  | ShapePolyline

export const derivedElements = (e: Shape): Shape[] => {
  if (e.tagName === 'path') return [e]
  if (e.tagName === 'line') return [e, line2pathR(e)]
  if (e.tagName === 'polyline') return [e, ...derivedElements(polyline2path(e))]
  if (e.tagName === 'polygon')
    return [e, ...derivedElements(polygon2polyline(e))]
  if (e.tagName === 'rect') return [e, ...derivedElements(rect2polygon(e))]
  if (e.tagName === 'ellipse') return [e, ...derivedElements(ellipse2path(e))]
  if (e.tagName === 'circle') return [e, ...derivedElements(circle2ellipse(e))]
  throw Error(`missing element ${e}`)
}

const convertAttrValuesForAnim = (
  values: [string | null, string | null],
  attributeName: string,
) =>
  values.map((value) => {
    if (
      ['fill', 'stroke'].includes(attributeName) &&
      (!value || ['none'].includes(value))
    )
      return 'transparent'
    return value
  }) as [string | null, string | null]

export const splitAttributes = (
  attributes1: Attributes,
  attributes2: Attributes,
): {
  attributesConstant: Attributes
  attributesToAnimate: { [atr: string]: [string | null, string | null] }
} => {
  const attributesA = Object.keys(attributes1)
  const attributesB = Object.keys(attributes2)
  const constantAttr = attributesA.filter(
    (k) => attributes2[k] === attributes1[k],
  )
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
    )
  return {
    attributesConstant: _.pick(attributes1, constantAttr),
    attributesToAnimate: _.mapValues(
      attributesToAnimate,
      convertAttrValuesForAnim,
    ),
  }
}

export const generateAnimationObjets = (shapeA: Shape, shapeB: Shape) => {
  const derivedShapes1 = derivedElements(shapeA)
  const derivedShapes2 = derivedElements(shapeB)
  return derivedShapes1.flatMap((derivedA) =>
    derivedShapes2
      .filter((de2) => derivedA.tagName === de2.tagName)
      .flatMap((derivedB) => {
        const {
          attributesConstant,
          attributesToAnimateList,
          tagName,
        } = animationObjectsFromPair(derivedA, derivedB)
        return attributesToAnimateList.map((attributesToAnimate) => ({
          tagName,
          attributesConstant,
          attributesToAnimate,
        }))
      }),
  )
}
