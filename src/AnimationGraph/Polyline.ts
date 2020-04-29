import {
  ElementPath,
  ElementPolygon,
  ElementPolyline,
  ElementRect,
} from './index';

export const polyline2path = (line: ElementPolyline) => {
  const { points, ...props } = line.props;
  return {
    type: 'path',
    props: { ...props, d: `M${points}` },
  } as ElementPath;
};

export const rect2polygons = (rect: ElementRect) => {
  const { x, y, height, width, ...props } = rect.props;
  const x1 = Number(x);
  const x2 = x1 + Number(width);
  const y1 = Number(y);
  const y2 = y1 + Number(height);
  const points1 = [x1, y1, x2, y1, x2, y2, x1, y2, x1, y1].join(' ');
  const points2 = [x1, y1, x1, y2, x2, y2, x2, y1, x1, y1].join(' ');
  return [
    {
      type: 'polygon',
      props: { ...props, points: points1 },
    },
    {
      type: 'polygon',
      props: { ...props, points: points2 },
    },
  ] as ElementPolygon[];
};

export const rect2polygon = (rect: ElementRect) => {
  const { x, y, height, width, ...props } = rect.props;
  const x1 = Number(x);
  const x2 = x1 + Number(width);
  const y1 = Number(y);
  const y2 = y1 + Number(height);
  const points = [x1, y1, x2, y1, x2, y2, x1, y2, x1, y1].join(' ');
  return {
    type: 'polygon',
    props: { ...props, points },
  } as ElementPolygon;
};
