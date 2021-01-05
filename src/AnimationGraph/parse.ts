import { OkTagNames } from '../types'
import { Path } from './Path'
import { getAttributes } from './SvgAnimate'
import { Shape } from './'

export function flatMap<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[],
): U[] {
  return Array.prototype.concat(...array.map(callbackfn))
}

const okTags = [
  'line',
  'path',
  'circle',
  'ellipse',
  'polyline',
  'rect',
  'polygon',
]

export const explore = (el: Element): Shape[] => {
  const { tagName } = el
  if (tagName === 'path') {
    const attributes = getAttributes(el)
    const d = el.getAttribute('d')
    if (!d) return []
    return Path.fromString(d).subPaths.map((p) => ({
      tagName: 'path',
      attributes: { ...attributes, d: p.toString() },
      transformationList: [],
      transformationCost: 0,
    }))
  }
  if (okTags.includes(tagName.toLowerCase()))
    return [
      {
        tagName: tagName as OkTagNames,
        attributes: getAttributes(el),
        transformationList: [],
        transformationCost: 0,
      },
    ]
  if (['defs', 'use', 'clippath'].includes(tagName.toLowerCase())) return []
  const ch = flatMap(Array.from(el.children), (e: Element) => explore(e))
  if (['svg', 'g', 'div', 'body'].includes(tagName.toLowerCase())) return ch
  throw new Error(`unhandled type ${tagName}`)
}

export const parse = (svgString: string) => {
  const parser = new DOMParser()
  const parsed = parser.parseFromString(svgString, 'image/svg+xml')
  return explore(parsed.documentElement)
}
