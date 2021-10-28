import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import useDrag from './useDrag'

export default {
  title: 'hooks/useDrag',
  component: useDrag
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const SvgContainer = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 1px solid black;
`
export const Example = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const element = { width: 35, height: 28 }
  const container = { width: 600, height: 600 }

  const ref = useDrag(
    'x',
    'y',
    {
      container,
      element
    },
    undefined,
    (x, y) => setPosition({ x, y })
  )

  return (
    <Container>
      <SvgContainer width={container.width} height={container.height}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${container.height} ${container.width}`}
        >
          <foreignObject
            ref={ref}
            x={position.x}
            y={position.y}
            height={element.height}
            width={element.width}
          >
            <Icon.Group size="big">
              <Icon name="comment alternate outline" color="red" />
              <Icon name="pencil" corner color="red" />
            </Icon.Group>
          </foreignObject>
        </svg>
      </SvgContainer>
    </Container>
  )
}
