import { ElementPolygon, ElementPolyline } from './index'

export const polygon2polyline = (e: ElementPolygon): ElementPolyline => {
  return {
    tagName: 'polyline',
    transformationCost: e.transformationCost + 10,
    transformationList: [...e.transformationList, 'toPolyline'],
    attributes: { ...e.attributes },
  }
}
