import React, { useState } from 'react'
import { Margin } from '../../../definitions'
import styled from '../../../theme-styled'
import MarginFields from './MarginFields'
import { Form } from 'semantic-ui-react'
import { MarginFieldsProps } from './MarginFields'


export default {
  title: 'Form/Margin Fields',
  component: MarginFields,
  argTypes: { onChange: { action: 'onChange' } }
}


const LargeContainer = styled.div`
  padding: 30px;
  width: 380px;
`

const SmallContainer = styled.div`
  padding: 30px;
  width: 275px;
`


export const WithinLargeContainer = () => {
  const [value, setValue] = useState<Margin>({ top: 0, bottom: 0, inside: 0, outside: 0 })

  const onChange = (value: Margin) => {
    setValue(value)
  }

  return <LargeContainer>
    <Form>
      <MarginFields value={value} onChange={onChange} />
    </Form>
  </LargeContainer>
}

export const WithinSmallContainer = () => {
  const [value, setValue] = useState<Margin>({ top: 0, bottom: 0, inside: 0, outside: 0 })

  const onChange = (value: Margin) => {
    setValue(value)
  }

  return <SmallContainer>
    <Form>
      <MarginFields value={value} onChange={onChange} />
    </Form>
  </SmallContainer>
}
