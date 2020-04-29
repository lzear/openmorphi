import React from 'react';
import styled from 'styled-components';
import InitialSvg from '../../components/InitialSvg';
import explore from '../../components/getelems';
import SvgElements from '../../components/SvgElements';
import { MojiElement } from '../../AnimationGraph';

const Container = styled.div`
  flex: 1 1 auto;
`;
export type MojiElem = { idx: number; el: MojiElement };
const Side: React.FC<{
  name: string;
  svg: string;
  selected: MojiElem | null;
  select: (el: MojiElement, idx: number) => void;
  counts: { [p: number]: number };
}> = ({ name, svg, select, selected, counts }) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(svg, 'text/html').body;
  const svgelems = explore(htmlDoc);
  return (
    <Container>
      <InitialSvg name={name} svg={svg} />
      {svgelems && (
        <SvgElements
          counts={counts}
          els={svgelems}
          select={(e, k) => select(e, k)}
          selected={selected?.idx}
        />
      )}
    </Container>
  );
};

export default Side;
