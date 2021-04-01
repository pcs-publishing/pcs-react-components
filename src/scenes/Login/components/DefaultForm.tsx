import React, { useState } from 'react'
import { Form, Header } from 'semantic-ui-react'
import styled from '../../../theme-styled'
import Button from '../../../components/Button'

interface LoginFormProps {
  className?: string
  onLogin: (username: string, password: string) => void
  onForgottenPasswordClick: () => void
  appName: string
}

const StyledLink = styled.span`
  color: white;
  cursor: pointer;
`

const StyledForm = styled(Form)`
  width: 100%;

`

const LinkContainer = styled.div`
  margin-top: 15px;
`

const ButtonContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`

const DefaultForm = (props: LoginFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = () => {
    props.onLogin(username, password)
  }

  return <StyledForm inverted className={props.className} onSubmit={submitForm}>
    <Header inverted size="large">Login to your account</Header>
    <Form.Input
      label="Username"
      autoFocus
      className="username-field"
      key="username"
      icon="user"
      iconPosition="left"
      placeholder="Enter Your Username"
      fluid
      value={username}
      autoComplete="username"
      size="large"
      onChange={(e) => {
        setUsername(e.target.value)
      }}
    />
    <Form.Input
      label="Password"
      className="password-field"
      key="password"
      icon="key"
      iconPosition="left"
      placeholder="Enter Your Password"
      type="password"
      fluid
      value={password}
      autoComplete="current-password"
      size="large"
      onChange={(e) => {
        setPassword(e.target.value)
      }}
    />
    <ButtonContainer>
      <Button primary size="large" type="submit" content={`Login to ${props.appName}`} />
    </ButtonContainer>
    <LinkContainer>
      <StyledLink onClick={() => props.onForgottenPasswordClick()}>Forgot Your Password?</StyledLink>
    </LinkContainer>
  </StyledForm>
}

export default DefaultForm
