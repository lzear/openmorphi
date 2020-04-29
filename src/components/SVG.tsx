import React from 'react';
import Spinner from './Spinner';

const SVG: React.FC<{ svg: string | null }> = ({ svg }) =>
  svg ? (
    <div dangerouslySetInnerHTML={svg ? { __html: svg } : undefined} />
  ) : (
    <Spinner />
  );

export default SVG;
