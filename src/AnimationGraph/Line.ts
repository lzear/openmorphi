import { ElementLine, ElementPath } from './index';

export const line2pathR = (line: ElementLine) => {
  const { x1, x2, y1, y2, ...props } = line.props;
  return {
    type: 'path',
    props: { ...props, d: `M ${x1} ${y1}, L ${x2} ${y2}` },
  } as ElementPath;
};
