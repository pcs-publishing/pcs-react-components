import React from 'react'
import Login, { LoginProps } from './Login'
import SVGLogo from '../../components/SVGLogo/SVGLogo'

export default {
  title: 'Scenes/Login',
  component: Login,
  argTypes: {}
}

const Template = (props: LoginProps) => {
  return <Login {...props} />
}


export const NoParticles = Template.bind({})

NoParticles.args = {
  appName: 'Knowledge Planning',
  appLogo: (large: boolean) => <SVGLogo src="/react-2.svg" size={large ? 300 : 50} />
}

export const WithParticles = Template.bind({})

WithParticles.args = {
  particles: true,
  appName: 'Knowledge Pulse',
  appLogo: (large: boolean) => <SVGLogo src="/react-2.svg" size={large ? 300 : 50} />
}
