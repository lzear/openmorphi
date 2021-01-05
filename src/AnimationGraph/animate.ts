import { derivedElements, Shape } from './index'
import { parse } from './parse'
import { animationObjectsFromPair } from './SvgAnimate'
import { Attributes, OkTagNames } from '../types'

export const zipperSkew = <T extends any>(
  longer: T[],
  shorter: T[],
): [T, T][] => {
  const ratio = shorter.length / longer.length
  if (ratio > 1)
    return zipperSkew(shorter, longer).map((e) => e.reverse() as [T, T])
  return longer.reduce((acc, lon, k) => {
    const sho: T = shorter[Math.floor(k * ratio)]
    return [...acc, [lon, sho] as [T, T]]
  }, [] as [T, T][])
}

const animPairs: (
  s1: Shape,
  s2: Shape,
) => {
  attributesConstant: Attributes
  transformationCost: number
  tagName: OkTagNames
  attributesToAnimate: { [p: string]: [string | null, string | null] }
}[] = (s1: Shape, s2: Shape) => {
  const derivedShapes1 = derivedElements(s1)
  const derivedShapes2 = derivedElements(s2)

  return derivedShapes1
    .flatMap((derivedA) =>
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
            transformationCost:
              derivedA.transformationCost + derivedA.transformationCost,
          }))
        }),
    )
    .sort((a, b) => a.transformationCost - b.transformationCost)
  // return
  // const ff = d1
  //   .flatMap((dd1) =>
  //     d2
  //       .filter((dd2) => dd1.type === dd2.type)
  //       .map((dd2) => [dd1, dd2] as [OE, OE]),
  //   )
  //   .sort(
  //     (a, b) =>
  //       a[0].transCost + a[1].transCost - b[0].transCost + b[1].transCost,
  //   )
  // return ff[0]
}

export const buildAnimation = (svg1: string, svg2: string) => {
  const shapes1 = parse(svg1)
  const shapes2 = parse(svg2)
  const pairs = zipperSkew(shapes1, shapes2)
  return pairs.map(
    ([a, b]) => animPairs(a, b).filter((e) => e.tagName === 'path')[0],
  )
}
