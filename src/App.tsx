import React from 'react';
import { useRedir, useMojiHtml } from './useRedir';
import AnimationMaker from './views/CreateAnimation/AnimationMaker';
import Emojinput from './components/Emojinput';
import Spinner from './components/Spinner';
import { Link } from 'react-router-dom';
import { H2, H3 } from './components/Styled';
import InitialSvg from './components/InitialSvg';

const App: React.FC = () => {
  useRedir();
  const svg1 = useMojiHtml('a');
  const svg2 = useMojiHtml('b');
  return (
    <>
      <p>
        <Link to="/">Back</Link>
      </p>
      <H2>Animate Emojis</H2>
      <H3>1. Find emoji pair to animate</H3>
      <Emojinput />
      <div>
        {svg1 && (
          <div style={{ float: 'left' }}>
            <InitialSvg name="a" svg={svg1.svg} />
          </div>
        )}
        {svg2 && (
          <div style={{ float: 'right' }}>
            <InitialSvg name="b" svg={svg2.svg} />
          </div>
        )}
        <div style={{ clear: 'both' }} />
      </div>
      {svg1 && svg2 ? (
        <AnimationMaker
          key={`${svg1.hex}-${svg2.hex}`}
          svg1={svg1}
          svg2={svg2}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default App;
