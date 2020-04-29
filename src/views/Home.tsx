import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Devil } from './examples/devil.svg';
import { ReactComponent as Youtube } from './examples/youtube.svg';
import { ReactComponent as Peach } from './examples/peach.svg';
import { ReactComponent as Chart } from './examples/chart.svg';
import { ReactComponent as Recy } from './examples/recy.svg';
import SavedAnimations from './SavedAnimations';
import { H3 } from '../components/Styled';

const H1 = styled.h1``;
const SvgW = styled.div`
  display: inline-block;
  width: 220px;
`;

const ButtonLink = styled.span`
  padding: 8px 20px;
  background: blue;
  color: white;
  font-size: 20px;
  text-decoration: none !important;
`;

const Home: React.FC<{}> = () => {
  return (
    <div>
      <H1>OpenMorphi</H1>
      <p>
        <strong>
          Build SVG animations between 2 emojis from{' '}
          <a href="https://openmoji.org/">OpenMoji</a>
        </strong>
      </p>
      <p>
        This project is only a small playground and many SVG elements are not
        animated correctly. If you notice a bug or a missing feature that
        saddens you, feel free to{' '}
        <a href="https://github.com/lzear/openmorphi">create an issue</a>.
      </p>
      <p>
        <Link to="/create">
          <ButtonLink>Create a new animation</ButtonLink>
        </Link>
      </p>
      <H3>Examples</H3>
      <>
        <SvgW>
          <Youtube />
        </SvgW>
        <SvgW>
          <Devil />
        </SvgW>
        <SvgW>
          <Peach />
        </SvgW>
        <SvgW>
          <Recy />
        </SvgW>
        <SvgW>
          <Chart />
        </SvgW>
      </>
      <H3>Recent</H3>
      <SavedAnimations />
    </div>
  );
};

export default Home;
