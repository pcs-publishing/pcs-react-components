import React, { useState } from 'react'
import Slider, { SliderProps } from './Slider'

export default {
  title: 'Slider',
  component: Slider,
  argTypes: { onChange: { action: 'change' } }
}

export const Example = (props: SliderProps) => {
  const [value, setValue] = useState(3)
  const onChange = (value: number) => {
    props.onChange(value)
    setValue(value)
  }
  return <Slider {...props} value={value} onChange={onChange} />
}

Example.args = {
  min: 0,
  max: 10,
  step: 1
}