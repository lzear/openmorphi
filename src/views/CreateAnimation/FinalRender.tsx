import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { Animated } from '../../AnimationGraph/AniPath';
import { AnimElems } from './AnimateEmojis';
import Slider from 'rc-slider';
import { SpeedContext } from './SpeedContext';
import { useCreateAnimationMutation } from '../../generated/graphql';

interface Interface {
  readonly widthA?: number;
}
export const AnimationPreview = styled.div<Interface>`
  width: ${({ widthA }) => widthA || 300}px;
  height: ${({ widthA }) => widthA || 300}px;
  margin: 3px;
  border: 1px solid black;
`;

const FinalRender: React.FC<{
  animations: AnimElems[];
  hexA: string;
  hexB: string;
  width?: number;
}> = ({ animations, hexA, hexB, width = 300 }) => {
  const { speed, duration } = useContext(SpeedContext);

  const [save] = useCreateAnimationMutation();
  const ref = useRef<HTMLDivElement | null>(null);

  const history: History = useHistory();
  return (
    <>
      <AnimationPreview ref={ref} widthA={width}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
          {animations.map((animation, k) => (
            <Animated
              key={k}
              animation={animation.animation}
              speed={speed[0]}
              duration={duration[0]}
            />
          ))}
        </svg>
      </AnimationPreview>
      {animations.length > 0 && (
        <>
          <div style={{ marginBottom: 30 }}>
            Duration:
            <Slider
              min={200}
              max={10000}
              step={50}
              value={duration[0]}
              onChange={(v) => duration[1](v)}
            />
          </div>
          <div style={{ marginBottom: 30 }}>
            Spline steepness:
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={speed[0]}
              onChange={(v) => speed[1](v)}
            />
          </div>
          Proud of your animation?
          <br />
          <button
            onClick={() => {
              if (!ref.current) return;
              return save({
                variables: {
                  html: ref.current.innerHTML,
                  hexcode1: hexA,
                  hexcode2: hexB,
                },
                update: (a, b) => {
                  const id = b.data?.createAnimation._id;
                  if (id) history.replace(`/animations?id=${id}`);
                },
              });
            }}
          >
            Save it!
          </button>
        </>
      )}
    </>
  );
};

export default FinalRender;
