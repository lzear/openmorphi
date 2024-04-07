/* eslint-disable @typescript-eslint/no-use-before-define */
// @ts-ignore
import parse from 'parse-svg-path'
// @ts-ignore
import abs from 'abs-svg-path'
// @ts-ignore
import { normalize as nn, reverseNormalized } from 'svg-path-reverse'
import _ from 'lodash'
import normalize from '../components/normalize'

type PathMono = Path & {
  readonly pathMono: true
}

export class Path {
  instructions: Instruction[]

  constructor(instructions: Instruction[]) {
    this.instructions = instructions
  }
  get length() {
    return this.instructions.length
  }

  toArray() {
    return this.instructions.map(({ letter, values }) => [letter, ...values])
  }

  toString() {
    return this.instructions
      .map(({ letter, values }) => `${letter} ${values.join(' ')}`)
      .join(' ')
  }

  static fromArray<T extends Path>(arr: (string | number)[][]): T {
    const instructions = arr.map(
      ([letter, ...values]) => ({ letter, values }) as Instruction,
    )
    return new this(instructions) as T
  }

  static fromString<T extends Path>(d: string): T {
    const parsed: (string | number)[][] = parse(d)
    return this.fromArray(parsed)
  }

  static fromSvgPathElement(element: SVGPathElement): Path {
    const d = element.getAttribute('d')
    if (!d) throw Error('d attribute missing from path')
    return this.fromString(d)
  }

  absolute(): AbsoluteShape {
    // @ts-ignore
    const abso1: (string | number)[][] = abs(this.toArray())
    return AbsoluteShape.fromArray(abso1) as AbsoluteShape
  }

  get animationClass() {
    return this.instructions.map(({ letter }) => `${letter}`).join('')
  }

  extend(n: number) {
    return new Path([
      ...this.instructions,
      ...Array(n).fill({
        letter: 'c',
        values: [0, 0, 0, 0, 0, 0],
      }),
    ])
  }

  animationCandidates(limit: boolean): NormalizedShape[] {
    const ab = this.absolute()
    const n = ab.normalize()
    if (limit) return [n]
    try {
      const reversed: NormalizedShape = Path.fromString(
        reverseNormalized(nn(n.toString())),
      )
      return [n, reversed]
    } catch (e) {
      console.error(e)
      return [n]
    }
  }

  get subPaths(): PathMono[] {
    const sub = this.instructions.reduce((prev, curr) => {
      if (['M', 'm'].includes(curr.letter)) return [...prev, [curr]]
      return [...prev.slice(0, -1), [...prev[prev.length - 1], curr]]
    }, [] as Instruction[][])

    return sub.map((s) => {
      return new Path(s) as PathMono
    })
  }

  public static adjustLengths<T extends Path>(n1: T, n2: T): [T, T] {
    const dif = n2.length - n1.length
    let nn1 = n1
    let nn2 = n2
    if (dif > 0) nn1 = n1.extend(dif) as T
    if (dif < 0) nn2 = n2.extend(-dif) as T
    return [nn1, nn2]
  }

  static anniSub = (j: [PathMono, PathMono][]): [Path, Path][][] => {
    if (j.length === 0) return []
    const [firstPair, ...pairs] = j
    const o: [Path, Path][][] = Path.anniSub(pairs)
    return Path.animateSingleSubPathShape(firstPair[0], firstPair[1]).flatMap(
      (a) => (o.length ? o.map((oo) => [a, ...oo]) : [[a]]),
    )
  }

  static generateCombinations = (j: [PathMono, PathMono][]): [Path, Path][] => {
    if (j.length === 0) return []
    const [firstPair, ...pairs] = j
    const o = Path.generateCombinations(pairs)
    return Path.animateSingleSubPathShape(firstPair[0], firstPair[1]).flatMap(
      (a) => [a, ...o],
    )
  }

  static createSubPathsPairsCombination = (
    shapeA: Path,
    shapeB: Path,
  ): [PathMono, PathMono][][] => {
    const hasAMoreSubPaths = shapeA.subPaths.length >= shapeB.subPaths.length
    const smallestSubPathsCount = _.range(
      (hasAMoreSubPaths ? shapeB : shapeA).subPaths.length,
    )
    let idxPairs: [number, number][][] = allPairs(
      _.range((hasAMoreSubPaths ? shapeA : shapeB).subPaths.length),
      smallestSubPathsCount,
    )
    idxPairs = idxPairs.filter((pairs) =>
      smallestSubPathsCount.every((v) => pairs.some(([, vv]) => vv === v)),
    )
    if (!hasAMoreSubPaths)
      idxPairs = idxPairs.map((pairs) => pairs.map(([a, b]) => [b, a]))
    return idxPairs.map((pairs) =>
      pairs.map(
        ([a, b]) =>
          [shapeA.subPaths[a], shapeB.subPaths[b]] as [PathMono, PathMono],
      ),
    )
  }

  public static animate = (shapeA: Path, shapeB: Path): [Path, Path][] => {
    return Path.createSubPathsPairsCombination(shapeA, shapeB)
      .flatMap(Path.anniSub)
      .map((shapes) => {
        const dd1 = shapes
          .map((shapePair) => shapePair[0])
          .map((s) => s.toString())
          .join('')
        const dd2 = shapes
          .map((shapePair) => shapePair[1])
          .map((s) => s.toString())
          .join('')
        return [Path.fromString(dd1), Path.fromString(dd2)]
      })
  }
  public static animateSingleSubPathShape = (
    singleSubPathShapeA: PathMono,
    singleSubPathShapeB: PathMono,
  ): [Path, Path][] => {
    const candidatesA = singleSubPathShapeA.animationCandidates(false)
    const candidatesB = singleSubPathShapeB.animationCandidates(false)
    return candidatesA.flatMap((candidateA) =>
      candidatesB
        .map((candidateB) => Path.adjustLengths(candidateA, candidateB))
        .filter(([cA, cB]) => cA.animationClass === cB.animationClass),
    )
  }
}

export class AbsoluteShape extends Path {
  extend(n: number) {
    return super.extend(n).absolute()
  }

  normalize(): NormalizedShape {
    return new NormalizedShape(normalize(this.instructions))
  }
}

export class NormalizedShape extends AbsoluteShape {
  extend(n: number) {
    return super.extend(n).normalize()
  }
}

export interface Instruction {
  letter: string
  values: number[]
}

export const animD: (d1: string, d2: string) => [string, string][] = (
  d1: string,
  d2: string,
) =>
  Path.animate(Path.fromString(d1), Path.fromString(d2)).map(([s1, s2]) => [
    s1.toString(),
    s2.toString(),
  ])

const allPairs = (a: number[], b: number[]): [number, number][][] => {
  if (a.length === 0) return [[]]
  const [a0, ...a1n] = a
  return b.flatMap((bx) => {
    const pair = [a0, bx] as [number, number]
    return allPairs(a1n, b).map((pairs) => [pair, ...pairs])
  })
}
