import React from 'react'
import { History } from 'history'
import { useLocation } from 'react-router-dom'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { addQueryParam, useLoadFromHexcode } from '../../useRedir'
import SVG from '../../components/SVG'
import { OpenMoji } from '../../withOpenMoji'
import styled from 'styled-components'

const Container = styled.div`
  width: 60px;
  position: relative;
  display: inline-block;
  margin: 15px;
`
const HoverChoice = styled.div`
  visibility: hidden;
  bottom: 0;
  position: absolute;
  text-align: center;
  ${Container}:hover & {
    visibility: visible;
  }
`
const Button = styled.button`
  cursor: pointer;
`
const MojiSelect: React.FC<{ moji: OpenMoji; history: History }> = ({
  moji,
  history,
}) => {
  const svg = useLoadFromHexcode(moji.hexcode)
  const location = useLocation()
  return (
    <Container>
      <HoverChoice>
        <Button
          onClick={() => addQueryParam('a', moji.hexcode, history, location)}
        >
          <ArrowLeftOutlined />
        </Button>
        <Button
          onClick={() => addQueryParam('b', moji.hexcode, history, location)}
        >
          <ArrowRightOutlined />
        </Button>
      </HoverChoice>
      <SVG svg={svg} />
    </Container>
  )
}

export default MojiSelect
