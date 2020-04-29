import { ElementEllipse, ElementPath } from './index';

function getD(cx: number, cy: number, rx: number, ry: number) {
  const kappa = 0.5522847498;
  const ox = rx * kappa; // x offset for the control point
  const oy = ry * kappa; // y offset for the control point
  let d = `M${cx - rx},${cy}`;
  d += `C${cx - rx}, ${cy - oy}, ${cx - ox}, ${cy - ry}, ${cx}, ${cy - ry},`;
  d += `C${cx + ox}, ${cy - ry}, ${cx + rx}, ${cy - oy}, ${cx + rx}, ${cy},`;
  d += `C${cx + rx}, ${cy + oy}, ${cx + ox}, ${cy + ry}, ${cx}, ${cy + ry},`;
  d += `C${cx - ox}, ${cy + ry}, ${cx - rx}, ${cy + oy}, ${cx - rx}, ${cy},`;
  d += `z`;
  return d;
}

export const ellipse2path = (e: ElementEllipse) => {
  const { cx, cy, rx, ry, ...props } = e.props;
  return {
    type: 'path',
    props: {
      ...props,
      d: getD(Number(cx), Number(cy), Number(rx), Number(ry)),
    },
  } as ElementPath;
};
