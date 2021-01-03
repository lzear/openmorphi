import React, { useContext } from 'react'
import _ from 'lodash'
import { ReloadOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'
import { History } from 'history'
import { OpenMojiContext } from '../withOpenMoji'
import { addQueryParam } from '../useRedir'
import SVG from './SVG'

const Container = styled.div`
  width: 100px;
  flex: 1 0 auto;
  margin: auto;
  border: solid 4px darkgrey;
`

const InitialSvg: React.FC<{
  name: string
  svg: string
}> = ({ name, svg }) => {
  const history: History = useHistory()
  const location = useLocation()
  const json = useContext(OpenMojiContext)
  return (
    <Container>
      {json && (
        <button
          onClick={() =>
            addQueryParam(name, _.sample(json)!.hexcode, history, location)
          }
        >
          <ReloadOutlined />
        </button>
      )}
      <SVG svg={svg} />
    </Container>
  )
}

export default InitialSvg
