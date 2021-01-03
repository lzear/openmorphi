import { MorphData } from '../fauna'
import _ from 'lodash'

const presentationAttributes = [
  'alignment-baseline',
  'baseline-shift',
  'clip',
  'clip-path',
  'clip-rule',
  'color',
  'color-interpolation',
  'color-interpolation-filters',
  'color-profile',
  'color-rendering',
  'cursor',
  'direction',
  'display',
  'dominant-baseline',
  'enable-background',
  'fill',
  'fill-opacity',
  'fill-rule',
  'filter',
  'flood-color',
  'flood-opacity',
  'font-family',
  'font-size',
  'font-size-adjust',
  'font-stretch',
  'font-style',
  'font-variant',
  'font-weight',
  'glyph-orientation-horizontal',
  'glyph-orientation-vertical',
  'image-rendering',
  'kerning',
  'letter-spacing',
  'lighting-color',
  'marker-end',
  'marker-mid',
  'marker-start',
  'mask',
  'opacity',
  'overflow',
  'pointer-events',
  'shape-rendering',
  'solid-color',
  'solid-opacity',
  'stop-color',
  'stop-opacity',
  'stroke',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-opacity',
  'stroke-width',
  'text-anchor',
  'text-decoration',
  'text-rendering',
  'transform',
  'unicode-bidi',
  'vector-effect',
  'visibility',
  'word-spacing',
  'writing-mode',
]
const pathAttributes = ['d', 'pathLength']
const polygonAttributes = ['points', 'pathLength']
const lineAttributes = ['x1', 'x2', 'y1', 'y2']
const circleAttributes = ['cx', 'cy', 'r']
const ellipseAttributes = ['cx', 'cy', 'rx', 'ry']
const rectAttributes = ['x', 'y', 'width', 'height', 'rx', 'ry']

export const validAttributes = _.uniq([
  ...presentationAttributes,
  ...pathAttributes,
  ...polygonAttributes,
  ...circleAttributes,
  ...ellipseAttributes,
  ...rectAttributes,
  ...lineAttributes,
])

export const validate = (morph: MorphData) => {
  morph.svgElements.forEach((animationElement) => {
    ;[
      ...Object.keys(animationElement.attributesConstant),
      ...Object.keys(animationElement.attributesToAnimate),
    ].forEach((attributeName) => {
      if (!validAttributes.includes(attributeName))
        throw new Error('invalid attribute name: ' + attributeName)
    })
  })
  return true
}
