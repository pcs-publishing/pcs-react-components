import React from 'react'
import { IParticlesParams } from 'react-particles-js'
import styled from '../../theme-styled'
import FullScreenScene from '../FullScreenScene'
import AppLogoContainer from './components/AppLogoContainer'
import FormContainer from './components/FormContainer'

const SceneContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
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

export interface AuthSceneProps {
  appName: string
  appLogo: (large: boolean) => React.ReactElement
  particles?: boolean | IParticlesParams
  header?: React.ReactElement
  footer?: React.ReactElement
}

const AuthScene: React.FunctionComponent<AuthSceneProps> = (props) => {
  return <FullScreenScene particles={props.particles}>
    <SceneContainer>
      <FormSide>
        <FormContainer appLogo={props.appLogo(false)} header={props.header} footer={props.footer}>
          {props.children}
        </FormContainer>
      </FormSide>
      <LogoSide>
        <AppLogoContainer logo={props.appLogo(true)} />
      </LogoSide>
    </SceneContainer>
  </FullScreenScene>
}

export default AuthScene
