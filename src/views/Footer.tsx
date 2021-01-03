import React from 'react'
import styled from 'styled-components'

const F = styled.div`
  text-align: center;
`
const Footer: React.FC = () => {
  return (
    <F>
      <p style={{ fontSize: '0.857em', color: 'darkgray' }}>
        All emojis designed by <a href="https://openmoji.org/">OpenMoji</a> –
        the open-source emoji and icon project. License:{' '}
        <a href="https://creativecommons.org/licenses/by-sa/4.0/#">
          CC BY-SA 4.0
        </a>
      </p>
      <p>
        <a href="https://github.com/lzear/openmorphi">GitHub</a> |{' '}
        <a href="https://www.elzear.de">Author</a>
      </p>
    </F>
  )
}

export default Footer
