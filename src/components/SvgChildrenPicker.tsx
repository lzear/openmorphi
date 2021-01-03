import React from 'react'
import styled from 'styled-components'
import Side, { MojiElem } from '../views/CreateAnimation/Side'

const Main = styled.div`
  height: 100%;
  display: flex;
`
const Border = styled.div`
  flex: 0 0 0px;
  border: solid 4px grey;
`
const SvgChildrenPicker: React.FC<{
  counts: {
    a: { [p: number]: number }
    b: { [p: number]: number }
  }
  svg1: string
  svg2: string
  selected1: MojiElem | null
  selected2: MojiElem | null
  select1: (a: MojiElem | null) => void
  select2: (a: MojiElem | null) => void
}> = ({ svg2, svg1, select1, select2, selected1, selected2, counts }) => {
  return (
    <Main>
      <Side
        counts={counts.a}
        svg={svg1}
        selected={selected1}
        select={(el, idx) => select1({ idx, el })}
      />
      <Border />
      <Side
        counts={counts.b}
        svg={svg2}
        selected={selected2}
        select={(el, idx) => select2({ idx, el })}
      />
    </Main>
  )
}

export default SvgChildrenPicker
