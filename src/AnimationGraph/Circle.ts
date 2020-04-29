import { ElementCircle, ElementEllipse } from './index';

export const circle2ellipse = (e: ElementCircle) => {
  const { r, ...props } = e.props;
  return {
    type: 'ellipse',
    props: {
      ...props,
      rx: r,
      ry: r,
    },
  } as ElementEllipse;
};
