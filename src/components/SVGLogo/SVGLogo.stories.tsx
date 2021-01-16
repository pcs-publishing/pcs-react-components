import React from 'react'
import SVGLogo, { SVGLogoProps } from './SVGLogo'

export default {
  title: 'SVG Logo',
  component: SVGLogo
}

const Template = (props: SVGLogoProps) => {
  return <SVGLogo {...props} />
}

export const InDesign = Template.bind({})

InDesign.args = {
  size: 200,
  src: '/indesign-cc.svg'
}

export const Photoshop = Template.bind({})

Photoshop.args = {
  size: 400,
  src: '/photoshop-cc.svg'
}





