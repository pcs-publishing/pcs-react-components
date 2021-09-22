import React, { useState } from 'react'
import styled from '../../../theme-styled'
import NumberField, { NumberFieldProps } from './NumberField'


export default {
  title: 'Form/Number Field',
  component: NumberField,
}


const Container = styled.div`
  padding: 30px;
  width: 100vw;
`

const Template = (props: NumberFieldProps) => {
  const [value, setValue] = useState<number>(100)
  return <Container>
    <NumberField value={value} onChange={setValue} {...props} />
  </Container>
}

export const Example = Template.bind({})

Example.args = {
  min: 1,
  max: 1000,
  label: 'Battery Size: ',
  unit: 'kW/h',
  disabled: false,
  error: '',
  fallbackValue: 24,
  placeholder: 'Enter battery size'
}
