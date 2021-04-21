import React from 'react'
import { IParticlesParams } from 'react-particles-js'
import DefaultForm from './components/DefaultForm'
import { LoginFormProps } from './components/DefaultForm'
import { omit } from 'lodash'
import AuthScene from '../AuthScene'

export interface LoginProps {
  appName: string
  onLogin: (username: string, password: string) => void
  onForgottenPasswordClick: () => void
  appLogo: (large: boolean) => React.ReactElement
  particles?: boolean | IParticlesParams
  form?: React.FunctionComponent<LoginFormProps>
  header?: React.ReactElement
  footer?: React.ReactElement
}

const Login = (props: LoginProps) => {
  const LoginForm = props.form || DefaultForm
  return <AuthScene {...omit(props, ['onLogin', 'onForgottenPasswordClick'])}>
    <LoginForm appName={props.appName} onLogin={props.onLogin} onForgottenPasswordClick={props.onForgottenPasswordClick} />
  </AuthScene>
}

export default Login

