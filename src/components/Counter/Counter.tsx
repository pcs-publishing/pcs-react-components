import React from 'react'
import styled from 'styled-components'

export interface CounterProps {
  count: number
  size: number
  color?: string
}

const NumberContainer = styled.div<CounterProps>`
  font-size: ${(props) => getFontSize(props.count, props.size)}px;
  background-color: ${(props) => props.color || '#3498db'};
  border-radius: 3px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: table;
  filter: opacity(${(props) => (props.count ? 1 : 0.1)});
`

const Value = styled.span`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
  width: auto;
`

const Counter = (props: CounterProps) => {
  return (
    <NumberContainer {...props}>
      <Value>{props.count}</Value>
    </NumberContainer>
  )
}

export default React.memo(Counter)

function getFontSize(count: number, containerSize: number): number {
  const chars = (count || 0).toString().length
  return Math.round(containerSize / 1.5 - chars * 2)
}
