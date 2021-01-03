import { ElementLine, ElementPath } from './index'

export const line2pathR = (line: ElementLine): ElementPath => {
  const { x1, x2, y1, y2, ...props } = line.attributes
  return {
    tagName: 'path',
    transformationCost: line.transformationCost + 10,
    transformationList: [...line.transformationList, 'toPath'],
    attributes: { ...props, d: `M ${x1} ${y1}, L ${x2} ${y2}` },
  }
}
