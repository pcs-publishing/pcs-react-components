import React from 'react'
import PopoverButton, { PopoverButtonProps } from './PopoverButton'
import CenteredImage from '../../Image/CenteredImage'
import Button from '../../Button'

export default {
  title: 'Popups/Popover Button',
  component: PopoverButton
}

const Template = (props: PopoverButtonProps) => {
  return <PopoverButton {...props} />
}

const ImagePopover = (props: { onClose: () => void }) => {
  return <CenteredImage
    onClick={props.onClose}
    src="https://media.tenor.com/images/5b1322f7a843028bb51feda3d40bbeb7/tenor.gif"
    alt="image_popover"
    maxWidth="100%"
    maxHeight={200}
  />
}

const ButtonPopover = (props: { onClose: () => void }) => {
  return <Button postivive content="buy" onClick={props.onClose} />
}

export const ImageExample = Template.bind({})

ImageExample.args = {
  icon: 'image',
  primary: true,
  content: 'Click me',
  size: 'large',
  popover: ImagePopover
}

export const ButtonExample = Template.bind({})

ButtonExample.args = {
  icon: 'btc',
  primary: true,
  content: 'Open',
  size: 'large',
  popover: ButtonPopover
}
