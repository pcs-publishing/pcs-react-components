import React from 'react'
import { isBoolean } from 'lodash'
import styled from '../../theme-styled'
import Particles, { IParticlesParams } from 'react-particles-js'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  ${props => props.theme.backgrounds.fullScreenScene};
`

const StyledParticles = styled(Particles)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`

export interface FullScreenSceneProps {
  particles?: boolean | IParticlesParams
}

const FullScreenScene: React.FunctionComponent<FullScreenSceneProps> = (props) => {
  return <Container>
    {getParticles(props.particles)}
    {props.children}
  </Container>
}

export default FullScreenScene


function getParticles(particles?: boolean | IParticlesParams) {
  if (!particles) return null
  const config = isBoolean(particles) ? defaultParticlesConfig : particles
  return <StyledParticles
    params={config} />
}

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
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      }
    }
  }
}
