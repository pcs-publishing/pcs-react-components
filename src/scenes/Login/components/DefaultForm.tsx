import React, { useState } from 'react'
import { Form, Header, Message, SemanticCOLORS } from 'semantic-ui-react';
import styled from '../../../theme-styled'
import Button from '../../../components/Button'
import { ReactElement } from 'react';

export interface LoginFormProps {
  className?: string
  onLogin: (username: string, password: string) => void
  onForgottenPasswordClick: () => void
  appName: string
  message?: string
  messageLevel?: 'error' | 'warn' | 'info'
}

const StyledLink = styled.span`
  color: ${props => props.theme.colors.text.onFullScreenScene};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`

const StyledForm = styled(Form)`
  width: 100%;

  label, .header {
    color: ${props => props.theme.colors.text.onFullScreenScene} !important;
  }
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

  return <StyledForm className={props.className} onSubmit={submitForm}>
    <Header size="large">Login to your account</Header>
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
    {getMessage(props.message, props.messageLevel)}
    <ButtonContainer>
      <Button primary size="large" type="submit" content={`Login to ${props.appName}`} />
    </ButtonContainer>
    <LinkContainer>
      <StyledLink onClick={() => props.onForgottenPasswordClick()}>Forgot Your Password?</StyledLink>
    </LinkContainer>
  </StyledForm>
}

function getMessage(message?: string, messageLevel?: 'error' | 'warn' | 'info'): ReactElement | null {
  if (!message || !messageLevel) return null
  let color: SemanticCOLORS = 'blue'
  if (messageLevel === 'error') {
    color = 'red'
  } else if (messageLevel === 'warn') {
    color = 'yellow'
  }
  return <Message content={message} color={color} />
}

export default DefaultForm
