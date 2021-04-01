import { isBoolean, isNull } from 'lodash'
import React from 'react'
import Particles, { IParticlesParams } from 'react-particles-js'
import styled from '../../theme-styled'
import DefaultForm from './components/DefaultForm'
import FormContainer from './components/FormContainer'
import AppLogoContainer from './components/AppLogoContainer'
import { LoginFormProps } from './components/DefaultForm';

const SceneContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  ${props => props.theme.backgrounds.login};
  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const FormSide = styled.div`
  flex: 3;
  padding: 1%;
`

const LogoSide = styled.div`
  flex: 4;
  position: relative;

  @media (max-width: 900px) {
    order: -1;
    flex: 1;
  }
`

const StyledParticles = styled(Particles)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`

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
  return <SceneContainer>
    {getParticles(props.particles)}
    <FormSide>
      <FormContainer appLogo={props.appLogo(false)} header={props.header} footer={props.footer} form={
        <LoginForm appName={props.appName} onLogin={props.onLogin} onForgottenPasswordClick={props.onForgottenPasswordClick} />
      } />
    </FormSide>
    <LogoSide>
      <AppLogoContainer logo={props.appLogo(true)} />
    </LogoSide>
  </SceneContainer>
}

export default Login

const defaultParticlesConfig: IParticlesParams = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 3,
        size_min: 0.3
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      random: true,
      speed: 1,
      direction: 'top',
      out_mode: 'out'
    }
  }
}


function getParticles(particles?: boolean | IParticlesParams) {
  if (!particles) return null
  const config = isBoolean(particles) ? defaultParticlesConfig : particles
  return <StyledParticles
    params={config} />
}
