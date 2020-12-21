import React from 'react'
import useTheme from '../../hooks/useTheme'
import styled from '../../theme-styled'

export interface SummaryValueProps {
  label: string
  tag?: boolean
  value: number | string
  color?: string
}

const Container = styled.div`
  padding: 3px;
`

const Label = styled.label`
  color: ${(props) => props.theme.colors.text.onBase};
  font-size: 1.3em;
  margin-right: 3px;
`

const Tag = styled.div<{ color: string }>`
  display: inline-block;
  background-color: ${(props) => props.color};
  color: white;
  padding-top: 3px;
  font-size: 0.9em;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  text-align: center;
  position: relative;
  top: -2px;
`

const TextValue = styled.span<{ color: string }>`
  font-size: 1.3em;
  color: ${(props) => props.color};
`

const SummaryValue = (props: SummaryValueProps) => {
  const theme = useTheme()
  const color = props.color || theme.colors.primary
  return (
    <Container>
      <Label>{`${props.label}:`}</Label>
      {props.tag ? (
        <Tag color={color}>{props.value}</Tag>
      ) : (
          <TextValue color={color}>{props.value}</TextValue>
        )}
    </Container>
  )
}

export default SummaryValue
