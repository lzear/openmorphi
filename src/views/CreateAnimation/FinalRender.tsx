import React, { useRef, useContext } from 'react'
import styled from 'styled-components'
import Slider from 'rc-slider'
import { Animated } from '../../AnimationGraph/SvgAnimate'
import { SpeedContext } from './SpeedContext'
import { useCreateMorphMutation } from '../../generated/graphql'
import { AnimationElement } from '../../types'
import { MorphData } from '../../fauna'
import { validate } from '../../utils/svgsanitize'
import { useNavigate } from 'react-router-dom'

interface Interface {
  readonly widthA?: number
}
export const AnimationPreview = styled.div<Interface>`
  width: ${({ widthA }) => widthA || 300}px;
  height: ${({ widthA }) => widthA || 300}px;
  margin: 3px;
  border: 1px solid black;
`

export const ViewAnimationElements = ({
  animations,
  spline,
  duration,
}: {
  animations: AnimationElement[]
  spline: number
  duration: number
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
    {animations.map((animation, k) => (
      <Animated
        key={k}
        animation={animation}
        spline={spline}
        duration={duration}
      />
    ))}
  </svg>
)

const FinalRender: React.FC<{
  animations: AnimationElement[]
  // morphi: MorphData;
  hexcode1: string
  hexcode2: string
  width?: number
}> = ({ animations, hexcode1, hexcode2, width = 300 }) => {
  const { splineTuple, durationTuple } = useContext(SpeedContext)

  const [save] = useCreateMorphMutation()
  const ref = useRef<HTMLDivElement | null>(null)

  const history = useNavigate()
  return (
    <div>
      <AnimationPreview ref={ref} widthA={width}>
        <ViewAnimationElements
          animations={animations}
          spline={splineTuple[0]}
          duration={durationTuple[0]}
        />
      </AnimationPreview>
      {animations.length > 0 && (
        <>
          <div style={{ marginBottom: 30 }}>
            Duration:
            {/* @ts-ignore */}
            <Slider<number>
              min={200}
              max={10000}
              step={50}
              value={durationTuple[0]}
              onChange={(v: number) => durationTuple[1](v)}
            />
          </div>
          <div style={{ marginBottom: 30 }}>
            Spline steepness:
            {/* @ts-ignore */}
            <Slider<number>
              min={0}
              max={1}
              step={0.01}
              value={splineTuple[0]}
              onChange={(v) => splineTuple[1](v)}
            />
          </div>
          Proud of your animation?
          <br />
          <button
            onClick={() => {
              if (!ref.current) return
              const morphi: MorphData = {
                spline: splineTuple[0],
                duration: durationTuple[0],
                svgElements: animations,
              }
              if (validate(morphi))
                return save({
                  variables: {
                    data: JSON.stringify(morphi),
                    hexcode1: hexcode1,
                    hexcode2: hexcode2,
                  },
                  update: (a, b) => {
                    const id = b.data?.createMorph._id
                    if (id) history(`/animations?id=${id}`, { replace: true })
                  },
                })
            }}
          >
            Save it!
          </button>
        </>
      )}
    </div>
  )
}

export default FinalRender
