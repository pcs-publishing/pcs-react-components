import React from 'react'
import styled from '../../theme-styled'
import KeyValueGroup, { KeyValueGroupProps } from './KeyValueGroup'

export default {
  title: 'Key Value Group',
  component: KeyValueGroup
}

const Container = styled.div`
  width: 460px;
`

export const Example = (props: KeyValueGroupProps) => {
  return <Container>
    <KeyValueGroup {...props} />
  </Container>
}

Example.args = {
  keyValues: [{
    key: 'Cyberpunk Bug Count',
    value: 'Approximately 43 million bugs'
  }, {
    key: 'Prospect Bug Count',
    value: 'Approximately 9 million bugs'
  }]
}