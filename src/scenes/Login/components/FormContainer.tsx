import React from 'react'
import styled from '../../../theme-styled'
import AppLogoContainer from './AppLogoContainer'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  height: auto;
  width: 100%;
`

const Footer = styled.div`
  height: 50px;
  width: 100%;
`

const MainContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  justify-items: center;
`

const FormWrapper = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  width: 350px;
  transform: translateY(-50%);
`

const LogoContainer = styled.div`
  display: relative;
  height: 100px;

  /* display: none;

  @media (max-width: 750px) {
      display: relative;
  } */
`

interface FormContainerProps {
  form: React.ReactElement
  appLogo: React.ReactElement
  companyLogo: React.ReactElement
}

const FormContainer = (props: FormContainerProps) => {
  return <Container>
    <Header>
    </Header>
    <MainContent>
      <FormWrapper>
        {props.form}
      </FormWrapper>
    </MainContent>
    <Footer>

    </Footer>
  </Container>
}

export default FormContainer
