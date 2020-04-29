import React from 'react';
import DOMPurify from 'dompurify';
import Spinner from './Spinner';

const SVG: React.FC<{ svg: string | null }> = ({ svg }) =>
  svg ? (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(svg, {
          USE_PROFILES: { svg: true, svgFilters: true },
          ADD_TAGS: ['animate'],
        }),
      }}
    />
  ) : (
    <Spinner />
  );

export default SVG;
