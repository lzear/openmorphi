import React, { useRef } from 'react';
import styled from 'styled-components';
import { useCreateAnimationMutation } from '../../generated/graphql';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { Animated } from '../../AnimationGraph/AniPath';
import { AnimElems } from './AnimateEmojis';

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
  speed: number;
  duration: number;
  width?: number;
}> = ({ animations, speed, duration, hexA, hexB, width = 300 }) => {
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
              speed={speed}
              duration={duration}
            />
          ))}
        </svg>
      </AnimationPreview>
      {animations.length > 0 && (
        <div>
          Proud of your animation?
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
                  if (id) history.replace(`/animation?id=${id}`);
                },
              });
            }}
          >
            Save it!
          </button>
        </div>
      )}
    </>
  );
};

export default FinalRender;
