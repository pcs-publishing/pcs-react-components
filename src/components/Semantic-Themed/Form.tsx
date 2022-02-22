import { Form } from 'semantic-ui-react'
import styled from '../../theme-styled'

const StyledForm = styled(Form)`
  &.ui.form .field label {
    font-size: 1em;
    color: ${props => props.theme.colors.text.onBase};
  }
`

export default StyledForm

export const FormInput = Form.Input
export const FormField = Form.Field
export const FormGroup = Form.Group
export const FormCheckbox = Form.Checkbox
