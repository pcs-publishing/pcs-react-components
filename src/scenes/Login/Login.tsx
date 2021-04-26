import React, { useContext } from 'react'
import { IParticlesParams } from 'react-particles-js'
import DefaultForm from './components/DefaultForm'
import { LoginFormProps } from './components/DefaultForm'
import { omit } from 'lodash'
import AuthScene from '../AuthScene'
import { AppInfoContext } from '../../providers/AppInfoProvider';

export interface LoginProps {
onLogin: (username: string, password: string) => void
onForgottenPasswordClick: () => void
  particles?: boolean | IParticlesParams
  form?: React.FunctionComponent<LoginFormProps>
  header?: React.ReactElement
  footer?: React.ReactElement
  message?: string
  messageLevel?: 'error' | 'warn' | 'info'
}

const Login = (props: LoginProps) => {
  const { appName } = useContext(AppInfoContext).appInfo

  const LoginForm = props.form || DefaultForm
  return <AuthScene {...omit(props, ['onLogin', 'onForgottenPasswordClick'])}>
    <LoginForm
      appName={appName}
      onLogin={props.onLogin}
      onForgottenPasswordClick={props.onForgottenPasswordClick}
      message={props.message}
      messageLevel={props.messageLevel}
    />
  </AuthScene>
}

export default Login

