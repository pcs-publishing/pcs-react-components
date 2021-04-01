import { isNull } from 'lodash'
import React from 'react'
import Particles from 'react-particles-js'
import styled from '../../theme-styled'
import DefaultForm from './components/DefaultForm'
import FormContainer from './components/FormContainer'
import AppLogoContainer from './components/AppLogoContainer'

const SceneContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(90deg, rgb(43, 77, 130),rgb(40, 144, 172));

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
  particles?: boolean
  appLogo: (large: boolean) => React.ReactElement
  companyLogo: React.ReactElement
}

const Login = (props: LoginProps) => {
  return <SceneContainer>
    {getParticles(props.particles)}
    <FormSide>
      <FormContainer appLogo={props.appLogo(false)} companyLogo={props.companyLogo} form={
        <DefaultForm appName={props.appName} onLogin={props.onLogin} onForgottenPasswordClick={props.onForgottenPasswordClick} />
      } />
    </FormSide>
    <LogoSide>
      <AppLogoContainer logo={props.appLogo(true)} />

    </LogoSide>
  </SceneContainer>
}

export default Login


function getParticles(enableParticles?: boolean) {
  if (!enableParticles) return isNull
  return <StyledParticles
    params={{
      "particles": {
        "number": {
          "value": 160,
          "density": {
            "enable": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "speed": 3,
            "size_min": 0.3
          }
        },
        "line_linked": {
          "enable": false
        },
        "move": {
          "random": true,
          "speed": 1,
          "direction": "top",
          "out_mode": "out"
        }
      }
    }} />
}
