import { ElementPolygon, ElementPolyline } from './index';

export const polygon2polyline = (line: ElementPolygon): ElementPolyline => {
  return {
    tagName: 'polyline',
    attributes: { ...line.attributes },
  };
};
