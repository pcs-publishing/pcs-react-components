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


const Container = styled.div`
  padding: 30px;
  width: 350px;
`

const Template = (props: MarginFieldsProps) => {
  const [value, setValue] = useState<Margin>({ top: 0, bottom: 0, inside: 0, outside: 0 })

  const onChange = (value: Margin) => {
    setValue(value)
    props.onChange(value)
  }

  return <Container>
    <Form>
      <MarginFields {...props} value={value} onChange={onChange} />
    </Form>
  </Container>
}

export const Example = Template.bind({})
Example.args = {}
