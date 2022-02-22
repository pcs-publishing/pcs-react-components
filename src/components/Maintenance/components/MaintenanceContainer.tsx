import React from 'react'
import styled from '../../../theme-styled'
import Header from '../../Semantic-Themed/Header'

interface MaintenanceContainerProps {
  name: string
  children: React.ReactNode
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const HeaderContainer = styled.div`
  text-align: center;
  flex-grow: 0;
  padding: 5px;

  * {
    color: ${(props) => props.theme.colors.text.onBase} !important;
  }
`

const Content = styled.div`
  align-self: stretch;
  flex-grow: 1;
  overflow-y: auto;
  align-items: baseline;
`

const MaintenanceContainer: React.FunctionComponent<MaintenanceContainerProps> = (props) => {
  return (
    <Container>
      <HeaderContainer>
        <Header as="h1">{props.name}</Header>
      </HeaderContainer>
      <Content>{props.children}</Content>
    </Container>
  )
}

export default MaintenanceContainer
