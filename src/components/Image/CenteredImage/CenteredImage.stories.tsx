import React from 'react'
import CenteredImage, { CenteredImageProps } from './CenteredImage';

export default {
  title: 'Image/CenteredImage',
  component: CenteredImage,
  argTypes: { onClick: { action: 'click' }}
}

const Template = (props: CenteredImageProps) => <CenteredImage {...props} />

export const Example = Template.bind({})

Example.args = {
  src: 'https://media4.giphy.com/media/J1j6wzyprIjN0dFZoc/giphy.gif',
  alt: 'alt',
  title: 'title',
  maxWidth: 500,
  maxHeight: 300
}

