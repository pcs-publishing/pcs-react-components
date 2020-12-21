import React, { useState } from 'react'
import SplitButton, { SplitButtonProps } from './SplitButton'

export default {
  component: SplitButton,
  title: 'Split Button',
  argTypes: {
    onChange: { action: 'change' }
  }
}



const Template = (props: SplitButtonProps<string>) => {
  const [value, setValue] = useState(props.items[0].value)
  const handleChange = (value: string) => {
    setValue(value)
    props.onChange(value)
  }

  return <SplitButton {...props} value={value} onChange={handleChange} />
}

export const Double = Template.bind({})

Double.args = {
  primary: true,
  items: [{
    value: 'First'
  }, {
    value: 'Second'
  }],
  basic: false
}

export const Triple = Template.bind({})

Triple.args = {
  primary: true,
  items: [{
    value: 'First'
  }, {
    value: 'Second'
  }, {
    value: 'Three'
  }],
  basic: false
}

export const CustomColor = Template.bind({})

CustomColor.args = {
  color: 'green',
  items: [{
    value: 'First'
  }, {
    value: 'Second'
  }],
  basic: false
}