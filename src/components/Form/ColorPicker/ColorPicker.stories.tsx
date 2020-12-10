import React, { useState } from 'react'
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import ColorPicker, { ColorPickerProps } from './ColorPicker';


const StyledForm = styled(Form)`
  width: 300px;
`

export default {
  title: 'Form/ColorPicker',
  component: ColorPicker,
  argTypes: { onChange: { action: 'change' } }
}

const Template = (props: Omit<ColorPickerProps, 'value' | 'onChange'>) => {
  const [value, setValue] = useState('red')

  return <StyledForm>
    <ColorPicker value={value} onChange={setValue} {...props}  />
    </StyledForm>
}

export const Example = Template.bind({})

Example.args = {
  label: 'Color Picker',
  presetColors: ['red', 'green', 'blue']
}