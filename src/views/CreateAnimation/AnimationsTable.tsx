import React, { SetStateAction, Dispatch } from 'react'
import { arrayMoveImmutable } from 'array-move'

import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { DeleteOutlined } from '@ant-design/icons'
import Animation from '../../components/Animation'
import styled from 'styled-components'
import { AnimationElement } from '../../types'

const Container = styled.div`
  margin: 5px;
`
const Element = styled.div`
  margin: 5px;
  cursor: pointer;
  // display: inline-block;
`

type Reversed = AnimationElement & { i: number }

const SList = ({
  items,
  del,
}: {
  items: Reversed[]
  del: (id: string) => void
}) => (
  <ul>
    {items.map((value, index) => (
      <SortableItem key={value.id} index={index} value={value} del={del} />
    ))}
  </ul>
)

const SEl = ({
  value,
  del,
}: {
  value: Reversed
  del: (id: string) => void
}) => (
  <Element key={value.id}>
    <button style={{ position: 'absolute' }} onClick={() => del(value.id)}>
      <DeleteOutlined />
    </button>
    <Animation anim={value} width={80} />
  </Element>
)

const SortableItem = SortableElement<{
  value: Reversed
  del: (id: string) => void
}>(SEl)

const AnimationList: React.FC<{
  animations: AnimationElement[]
  setAnimations: Dispatch<SetStateAction<AnimationElement[]>>
}> = ({ animations, setAnimations }) => {
  const reversed: Reversed[] = animations.map((a, i) => ({ ...a, i })).reverse()
  const S = SortableContainer<{
    items: Reversed[]
    del: (id: string) => void
  }>(SList)
  return (
    <Container>
      <S
        distance={1}
        del={(id: string) => setAnimations((a) => a.filter((b) => b.id !== id))}
        items={reversed}
        axis="y"
        onSortEnd={({ oldIndex, newIndex }) =>
          setAnimations(
            arrayMoveImmutable(
              animations,
              reversed[oldIndex].i,
              reversed[newIndex].i,
            ),
          )
        }
      />
    </Container>
  )
}

export default AnimationList
