import React from 'react';
import styled from 'styled-components';

const F = styled.div`
  text-align: center;
`;
const Footer: React.FC<{}> = () => {
  return (
    <F>
      <p>
        <a href="https://github.com/lzear/openmorphi">GitHub</a> |{' '}
        <a href="https://www.elzear.de">Author</a>
      </p>
    </F>
  );
};

export default Footer;
