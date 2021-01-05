import { ShapeCircle, ShapeEllipse } from './index'

export const circle2ellipse = (e: ShapeCircle): ShapeEllipse => {
  const { r, ...props } = e.attributes
  return {
    tagName: 'ellipse',
    transformationCost: e.transformationCost + 10,
    transformationList: [...e.transformationList, 'toEllipse'],
    attributes: {
      ...props,
      rx: r,
      ry: r,
    },
  }
}
