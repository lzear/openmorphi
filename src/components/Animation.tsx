import React from 'react'
import { Animated } from '../AnimationGraph/SvgAnimate'
import styled from 'styled-components'
import { AnimationElement } from '../types'

const Divv = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
`
const Animation: React.FC<{ anim: AnimationElement; width: number }> = ({
  anim,
  width,
}) => {
  return (
    <Divv width={width}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
        <Animated animation={anim} />
      </svg>
    </Divv>
  )
}

export default Animation
