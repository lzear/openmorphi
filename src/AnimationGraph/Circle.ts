import { ElementCircle, ElementEllipse } from './index';

export const circle2ellipse = (e: ElementCircle): ElementEllipse => {
  const { r, ...props } = e.attributes;
  return {
    tagName: 'ellipse',
    attributes: {
      ...props,
      rx: r,
      ry: r,
    },
  };
};
