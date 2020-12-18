import React from 'react'
import styled from '../../theme-styled'

export interface KeyValueGroupProps {
  keyValues: { key: string; value?: string }[]
  lineHeight?: number
}

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 3px 10px;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
`

const SubContainer = styled.div`
  padding: 3px;
`

const Keys = styled(SubContainer)`
  font-weight: bold;
  width: 40%;
  text-overflow: elipsis;
  white-space: nowrap;
`

const Values = styled(SubContainer)`
  text-overflow: elipsis;
  overflow: hidden;
  line-break: none;
  white-space: nowrap;
  border-left: 1px solid #ddd;
  padding-left: 10px;
`

const Row = styled.div<{ lineHeight?: number }>`
  line-height: ${(props) => props.lineHeight ?? 1.8}em;
`

const KeyValueGroup = (props: KeyValueGroupProps) => {
  return (
    <Container>
      <Keys>
        {props.keyValues.map((keyValue) => (
          <Row key={keyValue.key} lineHeight={props.lineHeight}>
            {keyValue.key}:
          </Row>
        ))}
      </Keys>
      <Values>
        {props.keyValues.map((keyValue) => (
          <Row key={keyValue.key} lineHeight={props.lineHeight}>
            {keyValue.value || '-'}
          </Row>
        ))}
      </Values>
    </Container>
  )
}

export default React.memo(KeyValueGroup)
