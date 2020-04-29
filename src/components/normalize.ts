/* eslint-disable */

// module.exports = normalize;

// @ts-ignore
import arcToCurve from "svg-arc-to-cubic-bezier";

type Command = { letter: string, values: number[] }

export default function normalize(commands: Command[]) {
  // init state
  let prev;
  const result: Command[] = [];
  let bezierX = 0;
  let bezierY = 0;
  let startX = 0;
  let startY = 0;
  let quadX = 0;
  let quadY = 0;
  let x = 0;
  let y = 0;

  for (let i = 0, len = commands.length; i < len; i++) {
    let seg = commands[i];
    const command = seg.letter;

    switch (command) {
      case 'M':
        startX = seg.values[0];
        startY = seg.values[1];
        break;
      case 'A':
        let curves = arcToCurve({
          px: x,
          py: y,
          cx: seg.values[5],
          cy: seg.values[6],
          rx: seg.values[0],
          ry: seg.values[1],
          xAxisRotation: seg.values[2],
          largeArcFlag: seg.values[3],
          sweepFlag: seg.values[4],
        });

        // null-curves
        if (!curves.length) continue;

        let j = 0, c;
        for (; j < curves.length; j++) {
          c = curves[j];
          seg = {
            letter: 'C',
            values: [c.x1, c.y1, c.x2, c.y2, c.x, c.y]
          }
          if (j < curves.length - 1) result.push(seg);
        }

        break;
      case 'S':
        // default control point
        let cx = x;
        let cy = y;
        if (prev == 'C' || prev == 'S') {
          cx += cx - bezierX; // reflect the previous command's control
          cy += cy - bezierY; // point relative to the current point
        }
        seg = {
          letter: 'C',
          values: [cx, cy, seg.values[0], seg.values[1], seg.values[2], seg.values[3]]
        }
        break;
      case 'T':
        if (prev == 'Q' || prev == 'T') {
          quadX = x * 2 - quadX; // as with 'S' reflect previous control point
          quadY = y * 2 - quadY;
        } else {
          quadX = x;
          quadY = y;
        }
        seg = quadratic(x, y, quadX, quadY, seg.values[0], seg.values[1]);
        break;
      case 'Q':
        quadX = seg.values[0];
        quadY = seg.values[1];
        seg = quadratic(x, y, seg.values[0], seg.values[1], seg.values[2], seg.values[3]);
        break;
      case 'L':
        seg = line(x, y, seg.values[0], seg.values[1]);
        break;
      case 'H':
        seg = line(x, y, seg.values[0], y);
        break;
      case 'V':
        seg = line(x, y, x, seg.values[0]);
        break;
      case 'Z':
        seg = line(x, y, startX, startY);
        break;
    }

    // update state
    prev = command;
    x = seg.values[seg.values.length - 2];
    y = seg.values[seg.values.length - 1];
    if (seg.values.length > 3) {
      bezierX = seg.values[seg.values.length - 4];
      bezierY = seg.values[seg.values.length - 3];
    } else {
      bezierX = x;
      bezierY = y;
    }
    result.push(seg);
  }

  return result;
}

function line(x1: number, y1: number, x2: number, y2: number) {
  return {
    letter: 'C',
    values: [x1, y1, x2, y2, x2, y2]
  }
}

function quadratic(x1: number, y1: number, cx: number, cy: number, x2: number, y2: number) {
  return {
    letter: 'C',
    values: [
      x1 / 3 + (2 / 3) * cx,
      y1 / 3 + (2 / 3) * cy,
      x2 / 3 + (2 / 3) * cx,
      y2 / 3 + (2 / 3) * cy,
      x2,
      y2,]
  }
}
