import React from 'react'
import styled, { useTheme } from '../../theme-styled'
import { Button, ButtonProps } from 'semantic-ui-react'

const WrappedButton = styled(Button)`
  &.button {
    background-color: ${props => props.theme.colors.button.standard};
    color: ${props => props.theme.colors.button.standardText};

    &:hover {
      background-color: ${props => props.theme.colors.button.standardHover};
      color: ${props => props.theme.colors.button.standardText};
    }

    &:focus {
      background-color: ${props => props.theme.colors.button.standard};
        color: ${props => props.theme.colors.button.standardText};
    }
  }

  &.primary.button {
    background-color: ${props => props.theme.colors.primary};

    &:hover {
      background-color: ${props => props.theme.colors.primaryHover};
      color: ${props => props.theme.colors.text.onPrimary};
    }

    &:focus {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.text.onPrimary};
    }
  }
`

const StyledButton = (props: ButtonProps) => {
  const theme = useTheme()
  const invert = props.inverted || (theme.invert && props.basic)

  return <WrappedButton {...props} inverted={invert} />
}

export const ButtonGroup = Button.Group

export default StyledButton
