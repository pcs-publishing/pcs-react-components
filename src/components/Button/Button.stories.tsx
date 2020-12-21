import React from 'react'
import Button, { ButtonProps } from './Button'

export default {
  component: Button,
  title: 'Button',
  argTypes: {
    onClick: { action: 'click' }
  }
}

export const Default = (props: ButtonProps) => {
  return <Button content="Default Button" {...props} />
}

export const Primary = (props: ButtonProps) => {
  return <Button primary content="Primary Button" {...props} />
}