import React, { useState } from 'react'
import Button from '../../Buttons/Button'
import ImageLightbox, { ImageLightboxProps } from './ImageLightbox';


export default {
  title: 'Image/ImageLightbox',
  component: ImageLightbox
}

const Template = (props: ImageLightboxProps) => {
  const [open, setOpen] = useState(false)
  return <>
    <Button content="Open" onClick={() => setOpen(true)} />
    <ImageLightbox {...props} open={open} onClose={() => setOpen(false)} />
  </>
}

export const Example = Template.bind({})

Example.args = {
  src: 'https://media.giphy.com/media/oVzm4vXdmYToRbMOZc/giphy.gif'
}
