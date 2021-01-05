import { ShapePath, ShapePolygon, ShapePolyline, ShapeRect } from './index'

export const polyline2path = (line: ShapePolyline): ShapePath => {
  const { points, ...props } = line.attributes
  return {
    transformationCost: line.transformationCost + 10,
    transformationList: [...line.transformationList, 'toPath'],
    tagName: 'path',
    attributes: { ...props, d: `M${points}` },
  }
}

// export const rect2polygons = (rect: ShapeRect): ShapePolygon[] => {
//   const { x, y, height, width, ...props } = rect.attributes
//   const x1 = Number(x)
//   const x2 = x1 + Number(width)
//   const y1 = Number(y)
//   const y2 = y1 + Number(height)
//   const points1 = [x1, y1, x2, y1, x2, y2, x1, y2, x1, y1].join(' ')
//   const points2 = [x1, y1, x1, y2, x2, y2, x2, y1, x1, y1].join(' ')
//   return [
//     {
//       transformationCost: rect.transformationCost + 10,
//       transformationList: [...rect.transformationList, 'toPolygon1'],
//       tagName: 'polygon',
//       attributes: { ...props, points: points1 },
//     },
//     {
//       transformationCost: rect.transformationCost + 10,
//       transformationList: [...rect.transformationList, 'toPolygon2'],
//       tagName: 'polygon',
//       attributes: { ...props, points: points2 },
//     },
//   ]
// }

export const rect2polygon = (rect: ShapeRect): ShapePolygon => {
  const { x, y, height, width, ...props } = rect.attributes
  const x1 = Number(x)
  const x2 = x1 + Number(width)
  const y1 = Number(y)
  const y2 = y1 + Number(height)
  const points = [x1, y1, x2, y1, x2, y2, x1, y2, x1, y1].join(' ')
  return {
    transformationCost: rect.transformationCost + 10,
    transformationList: [...rect.transformationList, 'toPolygon'],
    tagName: 'polygon',
    attributes: { ...props, points },
  }
}
