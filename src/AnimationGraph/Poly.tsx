import { Shape, Instruction } from './Path';

const extendPoly = (p1: Shape, n: number) => {
  const values = p1.instructions[p1.instructions.length - 1].values || [0, 0];
  return new Shape([
    ...p1.instructions,
    ...Array(n).fill({
      letter: 'L',
      values,
    }),
  ]);
};

const adjustLengths = (n1: Shape, n2: Shape) => {
  const dif = n2.length - n1.length;
  let nn1 = n1;
  let nn2 = n2;
  if (dif > 0) nn1 = extendPoly(n1, dif);
  if (dif < 0) nn2 = extendPoly(n2, -dif);
  return [nn1, nn2];
};

const instructions2Points = (i: Instruction[]) =>
  i.map((ii) => ii.values.join(' ')).join(' ');

export const adjustPointsLength: (
  p1: string,
  p2: string,
) => [string, string][] = (p1: string, p2: string) => {
  const [s1, s2] = adjustLengths(
    Shape.fromString(`M${p1}`),
    Shape.fromString(`M${p2}`),
  );
  return [
    [
      instructions2Points(s1.instructions),
      instructions2Points(s2.instructions),
    ],
  ];
};
