import { ElementCircle, ElementEllipse } from './index'

export const circle2ellipse = (e: ElementCircle): ElementEllipse => {
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
