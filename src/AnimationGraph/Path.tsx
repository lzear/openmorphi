/* eslint-disable @typescript-eslint/no-use-before-define */
// @ts-ignore
import parse from 'parse-svg-path';
// @ts-ignore
import abs from 'abs-svg-path';
// @ts-ignore
import { normalize as nn, reverseNormalized } from 'svg-path-reverse';
import _ from 'lodash';
import normalize from '../components/normalize';

interface SingleSubPath {
  readonly isSingleSubPath: true;
}

type ShapeSingleSub = Shape & SingleSubPath;

export class Shape {
  instructions: Instruction[];

  constructor(instructions: Instruction[]) {
    this.instructions = instructions;
  }
  get length() {
    return this.instructions.length;
  }

  toArray() {
    return this.instructions.map(({ letter, values }) => [letter, ...values]);
  }

  toString() {
    return this.instructions
      .map(({ letter, values }) => `${letter} ${values.join(' ')}`)
      .join(' ');
  }

  static fromArray<T extends Shape>(arr: (string | number)[][]): T {
    const instructions = arr.map(
      ([letter, ...values]) => ({ letter, values } as Instruction),
    );
    return new this(instructions) as T;
  }

  static fromString<T extends Shape>(d: string): T {
    const parsed: (string | number)[][] = parse(d);
    return this.fromArray(parsed);
  }

  static fromSvgPathElement(element: SVGPathElement): Shape {
    const d = element.getAttribute('d');
    if (!d) throw Error('d attribute missing from path');
    return this.fromString(d);
  }

  absolute(): AbsoluteShape {
    const abso1: (string | number)[][] = abs(this.toArray());
    return AbsoluteShape.fromArray(abso1) as AbsoluteShape;
  }

  get animationClass() {
    return this.instructions.map(({ letter }) => `${letter}`).join('');
  }

  extend(n: number) {
    return new Shape([
      ...this.instructions,
      ...Array(n).fill({
        letter: 'c',
        values: [0, 0, 0, 0, 0, 0],
      }),
    ]);
  }

  animationCandidates(limit: boolean): NormalizedShape[] {
    const ab = this.absolute();
    const n = ab.normalize();
    if (limit) return [n];
    return [n, Shape.fromString(reverseNormalized(nn(n.toString())))];
  }

  get subPaths() {
    const sub = this.instructions.reduce((prev, curr) => {
      if (['M', 'm'].includes(curr.letter)) return [...prev, [curr]];
      return [...prev.slice(0, -1), [...prev[prev.length - 1], curr]];
    }, [] as Instruction[][]);

    return sub.map((s) => {
      return new Shape(s) as ShapeSingleSub;
    });
  }

  public static adjustLengths<T extends Shape>(n1: T, n2: T): [T, T] {
    const dif = n2.length - n1.length;
    let nn1 = n1;
    let nn2 = n2;
    if (dif > 0) nn1 = n1.extend(dif) as T;
    if (dif < 0) nn2 = n2.extend(-dif) as T;
    return [nn1, nn2];
  }

  static anniSub = (
    j: [ShapeSingleSub, ShapeSingleSub][],
  ): [Shape, Shape][][] => {
    if (j.length === 0) return [];
    const [firstPair, ...pairs] = j;
    const o: [Shape, Shape][][] = Shape.anniSub(pairs);
    return Shape.animateSingleSubPathShape(
      firstPair[0],
      firstPair[1],
    ).flatMap((a) => (o.length ? o.map((oo) => [a, ...oo]) : [[a]]));
  };

  static generateCombinations = (
    j: [ShapeSingleSub, ShapeSingleSub][],
  ): [Shape, Shape][] => {
    if (j.length === 0) return [];
    const [firstPair, ...pairs] = j;
    const o = Shape.generateCombinations(pairs);
    return Shape.animateSingleSubPathShape(
      firstPair[0],
      firstPair[1],
    ).flatMap((a) => [a, ...o]);
  };

  static createSubPathsPairsCombination = (
    shapeA: Shape,
    shapeB: Shape,
  ): [ShapeSingleSub, ShapeSingleSub][][] => {
    const hasAMoreSubPaths = shapeA.subPaths.length >= shapeB.subPaths.length;
    const smallestSubPathsCount = _.range(
      (hasAMoreSubPaths ? shapeB : shapeA).subPaths.length,
    );
    let idxPairs: [number, number][][] = allPairs(
      _.range((hasAMoreSubPaths ? shapeA : shapeB).subPaths.length),
      smallestSubPathsCount,
    );
    idxPairs = idxPairs.filter((pairs) =>
      smallestSubPathsCount.every((v) => pairs.some(([, vv]) => vv === v)),
    );
    if (!hasAMoreSubPaths)
      idxPairs = idxPairs.map((pairs) => pairs.map(([a, b]) => [b, a]));
    return idxPairs.map((pairs) =>
      pairs.map(
        ([a, b]) =>
          [shapeA.subPaths[a], shapeB.subPaths[b]] as [
            ShapeSingleSub,
            ShapeSingleSub,
          ],
      ),
    );
  };

  public static animate = (shapeA: Shape, shapeB: Shape): [Shape, Shape][] => {
    return Shape.createSubPathsPairsCombination(shapeA, shapeB)
      .flatMap(Shape.anniSub)
      .map((shapes) => {
        const dd1 = shapes
          .map((shapePair) => shapePair[0])
          .map((s) => s.toString())
          .join('');
        const dd2 = shapes
          .map((shapePair) => shapePair[1])
          .map((s) => s.toString())
          .join('');
        return [Shape.fromString(dd1), Shape.fromString(dd2)];
      });
  };
  public static animateSingleSubPathShape = (
    singleSubPathShapeA: ShapeSingleSub,
    singleSubPathShapeB: ShapeSingleSub,
  ): [Shape, Shape][] => {
    const candidatesA = singleSubPathShapeA.animationCandidates(false);
    const candidatesB = singleSubPathShapeB.animationCandidates(false);
    return candidatesA.flatMap((candidateA) =>
      candidatesB
        .map((candidateB) => Shape.adjustLengths(candidateA, candidateB))
        .filter(([cA, cB]) => cA.animationClass === cB.animationClass),
    );
  };
}

export class AbsoluteShape extends Shape {
  extend(n: number) {
    return super.extend(n).absolute();
  }

  normalize(): NormalizedShape {
    return new NormalizedShape(normalize(this.instructions));
  }
}

export class NormalizedShape extends AbsoluteShape {
  extend(n: number) {
    return super.extend(n).normalize();
  }
}

export interface Instruction {
  letter: string;
  values: number[];
}

export const animD: (d1: string, d2: string) => [string, string][] = (
  d1: string,
  d2: string,
) =>
  Shape.animate(Shape.fromString(d1), Shape.fromString(d2)).map(([s1, s2]) => [
    s1.toString(),
    s2.toString(),
  ]);

const allPairs = (a: number[], b: number[]): [number, number][][] => {
  if (a.length === 0) return [[]];
  const [a0, ...a1n] = a;
  return b.flatMap((bx) => {
    const pair = [a0, bx] as [number, number];
    return allPairs(a1n, b).map((pairs) => [pair, ...pairs]);
  });
};
