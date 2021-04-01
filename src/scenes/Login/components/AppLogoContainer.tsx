import React from 'react'
import styled from '../../../theme-styled'

interface AppLogoContainerProps {
  logo: React.ReactElement
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const AppLogoContainer = (props: AppLogoContainerProps) => {
  return <Container>
    {props.logo}
  </Container>
}

export default AppLogoContainer
