import React, { useState } from 'react'
import { MojiElem } from './Side'
import SvgChildrenPicker from '../../components/SvgChildrenPicker'
import AnimationPicker from './AnimationPicker'
import AnimationList from './AnimationsTable'
import styled from 'styled-components'
import 'rc-slider/assets/index.css'
import FinalRender from './FinalRender'
import { H3 } from '../../components/Styled'
import { AnimationElement } from '../../types'

export const LastStep = styled.div`
  display: flex;
`

export const randomString = () => `s${Math.random().toString(36).substring(7)}`

const countMojiElementUsages = (
  animationElements: AnimationElement[],
  key: 'idx1' | 'idx2',
) =>
  animationElements.reduce(
    (prev, cur) => ({
      ...prev,
      [cur[key] as number]: (prev[cur[key]] || 0) + 1,
    }),
    {} as { [idx: number]: number },
  )

const AnimationMaker: React.FC<{
  svg1: { hex: string; svg: string }
  svg2: { hex: string; svg: string }
}> = ({ svg1, svg2 }) => {
  const [selectedElement1, selectElement1] = useState<MojiElem | null>(null)
  const [selectedElement2, selectElement2] = useState<MojiElem | null>(null)
  const [animations, setAnimations] = useState<AnimationElement[]>([])
  const counts: {
    a: { [p: number]: number }
    b: { [p: number]: number }
  } = {
    a: countMojiElementUsages(animations, 'idx1'),
    b: countMojiElementUsages(animations, 'idx2'),
  }
  return (
    <>
      <H3>2. Select pairs of elements to animate</H3>
      <SvgChildrenPicker
        counts={counts}
        svg1={svg1.svg}
        svg2={svg2.svg}
        selected1={selectedElement1}
        selected2={selectedElement2}
        select1={selectElement1}
        select2={selectElement2}
      />

      {selectedElement1 && selectedElement2 && (
        <>
          <H3>3. Select an animation that looks okay</H3>
          <AnimationPicker
            el1={selectedElement1}
            el2={selectedElement2}
            select={(animation) =>
              setAnimations((animations) => [
                ...animations,
                {
                  id: randomString(),
                  idx1: selectedElement1.idx,
                  idx2: selectedElement2.idx,
                  ...animation,
                },
              ])
            }
          />

          {!!animations.length && (
            <>
              <H3 style={{ marginTop: 5 }}>
                4. Repeat step 2. until all desired animations are selected.
              </H3>
              <H3>
                5. Reorder animated element by dragging (top = front ; bottom =
                background)
              </H3>
              <LastStep>
                <FinalRender
                  hexcode1={svg1.hex}
                  hexcode2={svg2.hex}
                  animations={animations}
                />
                <AnimationList
                  animations={animations}
                  setAnimations={setAnimations}
                />
              </LastStep>
            </>
          )}
        </>
      )}
    </>
  )
}

export default AnimationMaker
