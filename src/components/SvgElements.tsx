import React from 'react'
import styled from 'styled-components'
import { Shape } from '../AnimationGraph'
import { DisplaySvgElement } from '../AnimationGraph/SvgAnimate'

const SvgContainer = styled.div<{
  selected: boolean
}>`
  cursor: pointer;
  width: 85px;
  margin: 3px;
  border: 1px solid lightgray;
  outline: ${({ selected }) =>
    selected ? '3px solid gray' : '3px solid transparent'};
`
const FlexContainer = styled.div`
  display: flex;
  min-width: 100px;
  flex: 1 1 auto;
  flex-wrap: wrap;
  border: 1px solid lightgray;
`
const Checkered = styled.div`
  background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.0980392) 25%,
      transparent 25%,
      transparent 75%,
      rgba(0, 0, 0, 0.0980392) 75%,
      rgba(0, 0, 0, 0.0980392) 0
    ),
    linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.0980392) 25%,
      transparent 25%,
      transparent 75%,
      rgba(0, 0, 0, 0.0980392) 75%,
      rgba(0, 0, 0, 0.0980392) 0
    ),
    white;
  background-repeat: repeat, repeat;
  background-position:
    0px 0,
    5px 5px;
  transform-origin: 0 0 0;
  background-origin: padding-box, padding-box;
  background-clip: border-box, border-box;
  background-size:
    10px 10px,
    10px 10px;
  transition: none;
  transform: scaleX(1) scaleY(1) scaleZ(1);
`
const SvgElements: React.FC<{
  els: Shape[]
  select: (el: Shape, k: number) => void
  selected: number | undefined
  counts: { [p: number]: number }
}> = ({ els, select, selected, counts }) => (
  <FlexContainer>
    {els.map((e, k) => (
      <SvgContainer
        key={k}
        onClick={() => select(e, k)}
        selected={selected === k}
      >
        <div style={{ color: 'grey' }}>
          <span>{e.tagName}</span>
          <span
            style={{
              float: 'right',
              fontWeight: counts[k] ? 'normal' : 'bold',
              color: counts[k] ? 'inherit' : 'black',
            }}
          >
            {counts[k] || 0}
          </span>
        </div>
        <Checkered>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
            <DisplaySvgElement el={e} />
          </svg>
        </Checkered>
      </SvgContainer>
    ))}
  </FlexContainer>
)

export default SvgElements
