import React from 'react'
import Counter, { CounterProps } from './Counter'

export default {
  title: 'Counter',
  component: Counter
}

const Template = (props: CounterProps) => <Counter {...props} />

export const Basic = Template.bind({})

Basic.args = {
  count: 20,
  size: 30
}

export const CustomColor = Template.bind({})

CustomColor.args = {
  count: 100,
  size: 30,
  color: '#44bd32'
}