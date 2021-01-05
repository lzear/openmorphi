import React from 'react'
import styled from 'styled-components'
import SvgElements from '../../components/SvgElements'
import { Shape } from '../../AnimationGraph'
import { explore } from '../../AnimationGraph/parse'

const Container = styled.div`
  flex: 1 1 auto;
`
export type MojiElem = { idx: number; el: Shape }
const Side: React.FC<{
  svg: string
  selected: MojiElem | null
  select: (el: Shape, idx: number) => void
  counts: { [p: number]: number }
}> = ({ svg, select, selected, counts }) => {
  const parser = new DOMParser()
  const htmlDoc = parser.parseFromString(svg, 'text/html').body
  const svgElements = explore(htmlDoc)
  return (
    <Container>
      {svgElements && (
        <SvgElements
          counts={counts}
          els={svgElements}
          select={(e, k) => select(e, k)}
          selected={selected?.idx}
        />
      )}
    </Container>
  )
}

export default Side
