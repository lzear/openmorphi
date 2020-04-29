import React, { useState } from 'react';
import { MojiElem } from './Side';
import SvgChildrenPicker from '../../components/SvgChildrenPicker';
import AnimationPicker, { AnimationData } from './AnimationPicker';
import AnimationList from './AnimationsTable';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';
import FinalRender from './FinalRender';
import { H3 } from '../../components/Styled';

export type AnimElems = {
  id: string;
  idx1: number;
  idx2: number;
  animation: AnimationData;
};

export const LastStep = styled.div`
  display: flex;
`;

const randomString = () => `s${Math.random().toString(36).substring(7)}`;

const countI = (es: AnimElems[], key: 'idx1' | 'idx2') =>
  es.reduce((prev, cur) => {
    return { ...prev, [cur[key] as number]: (prev[cur[key]] || 0) + 1 };
  }, {} as { [idx: number]: number });

const AnimateEmojis: React.FC<{
  svgA: { hex: string; svg: string };
  svgB: { hex: string; svg: string };
}> = ({ svgA, svgB }) => {
  const [elemA, setElemA] = useState<MojiElem | null>(null);
  const [elemB, setElemB] = useState<MojiElem | null>(null);
  const [animations, setAnimations] = useState<AnimElems[]>([]);
  const counts: {
    a: { [p: number]: number };
    b: { [p: number]: number };
  } = {
    a: countI(animations, 'idx1'),
    b: countI(animations, 'idx2'),
  };
  return (
    <>
      <H3>2. Create pairs of elements to animate</H3>
      <SvgChildrenPicker
        counts={counts}
        svg1={svgA.svg}
        svg2={svgB.svg}
        selected1={elemA}
        select2={setElemB}
        select1={setElemA}
        selected2={elemB}
      />

      <H3>3. Select animations that look okay</H3>
      {elemA && elemB ? (
        <AnimationPicker
          el1={elemA}
          el2={elemB}
          select={(animation) =>
            setAnimations((animations) => [
              ...animations,
              {
                id: randomString(),
                idx1: elemA.idx,
                idx2: elemB.idx,
                animation,
              },
            ])
          }
        />
      ) : (
        <div>-</div>
      )}

      <H3>
        4. Manage animated element (drag to front, drag to bottom, delete)
      </H3>
      <LastStep>
        <div>
          <FinalRender
            hexA={svgA.hex}
            hexB={svgB.hex}
            animations={animations}
          />
        </div>
        <AnimationList animations={animations} setAnimations={setAnimations} />
      </LastStep>
    </>
  );
};

export default AnimateEmojis;
