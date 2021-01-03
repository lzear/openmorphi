import React from 'react'
import styled from 'styled-components'
import { generateAnimationObjets } from '../../AnimationGraph'
import { MojiElem } from './Side'
import { Animated } from '../../AnimationGraph/SvgAnimate'
import { AnimationData } from '../../types'

export const SvgPreview = styled.div`
  width: 130px;
  margin: 5px;
  border: 1px solid brown;
  display: inline-block;

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
  background-position: 0px 0, 5px 5px;
  transform-origin: 0 0 0;
  background-origin: padding-box, padding-box;
  background-clip: border-box, border-box;
  background-size: 10px 10px, 10px 10px;
  transition: none;
  transform: scaleX(1) scaleY(1) scaleZ(1);
`

const AnimationPicker: React.FC<{
  el1: MojiElem
  el2: MojiElem
  select: (a: AnimationData) => void
}> = ({ el1, el2, select }) => (
  <>
    {generateAnimationObjets(el1.el, el2.el)?.map(
      (animation: AnimationData, k) => (
        <SvgPreview
          key={k}
          onClick={() => select(animation)}
          style={{ cursor: 'pointer' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
            <Animated animation={animation} />
          </svg>
        </SvgPreview>
      ),
    )}
  </>
)

export default AnimationPicker
