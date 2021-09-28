import { Button as SemanticButton, ButtonProps as SemanticButtonProps } from 'semantic-ui-react';
import styled from '../../theme-styled'

const ThemedButton = styled(SemanticButton) <SemanticButtonProps>`
  ${props => {
    if (!props.primary) {
      return
    }
    return `
      background-color: ${props.theme.colors.primary} !important;
      color: ${props.theme.colors.text.onPrimary} !important;
    `
  }}

  ${props => props.theme.prospectButtonColor}
`

export default ThemedButton
export type ButtonProps = SemanticButtonProps