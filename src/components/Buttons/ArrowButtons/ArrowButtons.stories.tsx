import React from 'react'
import ArrowButtons, { ArrowButtonsProps } from './ArrowButtons'

export default {
  component: ArrowButtons,
  title: 'Buttons/Arrow Buttons',
  argTypes: {
    onUp: { action: 'onUp' },
    onDown: { action: 'onDown' },
    onLeft: { action: 'onLeft' },
    onRight: { action: 'onRight' }
  }
}

const Template = (props: ArrowButtonsProps) => {
  return <ArrowButtons {...props} />
}

export const Example = Template.bind({})
Example.args = {
  inverted: false
}
