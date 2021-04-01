import React from 'react'
import styled from '../../../theme-styled'

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const ExtraContent = styled.div`
  height: auto;
  width: 100%;
`


const MainContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  justify-items: center;
  align-items: center;
  height: 100%;
`

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`

interface FormContainerProps {
  form: React.ReactElement
  appLogo: React.ReactElement
  header?: React.ReactElement
  footer?: React.ReactElement
}

const FormContainer = (props: FormContainerProps) => {
  return <Container>
    <ExtraContent>
      {props.header || null}
    </ExtraContent>
    <MainContent>
      <FormWrapper>
        {props.form}
      </FormWrapper>
    </MainContent>
    <ExtraContent>
      {props.footer || null}
    </ExtraContent>
  </Container>
}

export default FormContainer
