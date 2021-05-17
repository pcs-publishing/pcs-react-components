import React from 'react'
import SVGLogo, { SVGLogoProps } from './SVGLogo'

export default {
  title: 'SVG Logo',
  component: SVGLogo
}

const Template = (props: SVGLogoProps) => {
  return <SVGLogo {...props} />
}

export const RedisIcon = Template.bind({})

RedisIcon.args = {
  size: 200,
  src: '/redis.svg'
}

export const ReactIcon = Template.bind({})

ReactIcon.args = {
  size: 400,
  src: '/react-2.svg'
}





