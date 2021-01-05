import { ShapePolygon, ShapePolyline } from './index'

export const polygon2polyline = (e: ShapePolygon): ShapePolyline => {
  return {
    tagName: 'polyline',
    transformationCost: e.transformationCost + 10,
    transformationList: [...e.transformationList, 'toPolyline'],
    attributes: { ...e.attributes },
  }
}
