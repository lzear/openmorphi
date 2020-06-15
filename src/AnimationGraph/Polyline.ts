import {
  ElementPath,
  ElementPolygon,
  ElementPolyline,
  ElementRect,
} from './index';

export const polyline2path = (line: ElementPolyline): ElementPath => {
  const { points, ...props } = line.attributes;
  return {
    tagName: 'path',
    attributes: { ...props, d: `M${points}` },
  };
};

export const rect2polygons = (rect: ElementRect): ElementPolygon[] => {
  const { x, y, height, width, ...props } = rect.attributes;
  const x1 = Number(x);
  const x2 = x1 + Number(width);
  const y1 = Number(y);
  const y2 = y1 + Number(height);
  const points1 = [x1, y1, x2, y1, x2, y2, x1, y2, x1, y1].join(' ');
  const points2 = [x1, y1, x1, y2, x2, y2, x2, y1, x1, y1].join(' ');
  return [
    {
      tagName: 'polygon',
      attributes: { ...props, points: points1 },
    },
    {
      tagName: 'polygon',
      attributes: { ...props, points: points2 },
    },
  ];
};

export const rect2polygon = (rect: ElementRect): ElementPolygon => {
  const { x, y, height, width, ...props } = rect.attributes;
  const x1 = Number(x);
  const x2 = x1 + Number(width);
  const y1 = Number(y);
  const y2 = y1 + Number(height);
  const points = [x1, y1, x2, y1, x2, y2, x1, y2, x1, y1].join(' ');
  return {
    tagName: 'polygon',
    attributes: { ...props, points },
  };
};
