import { ElementPolygon, ElementPolyline } from './index';

export const polygon2polyline = (line: ElementPolygon) => {
  return {
    type: 'polyline',
    props: { ...line.props },
  } as ElementPolyline;
};
