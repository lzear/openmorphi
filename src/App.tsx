import React from 'react';
import { useRedir, useMojiHtml } from './useRedir';
import AnimateEmojis from './views/CreateAnimation/AnimateEmojis';
import Emojinput from './components/Emojinput';
import Spinner from './components/Spinner';
import { Link } from 'react-router-dom';
import { H2, H3 } from './components/Styled';

const App: React.FC = () => {
  useRedir();
  const svgA = useMojiHtml('a');
  const svgB = useMojiHtml('b');
  return (
    <>
      <p>
        <Link to="/">Back</Link>
      </p>
      <H2>Animate Emojis</H2>
      <H3>1. Find emoji pair to animate</H3>
      <Emojinput />
      {svgA && svgB ? (
        <AnimateEmojis
          key={`${svgA.hex}-${svgB.hex}`}
          svgA={svgA}
          svgB={svgB}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default App;
