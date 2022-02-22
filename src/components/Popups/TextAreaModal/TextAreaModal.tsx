import React, { useState } from 'react'
import { Modal, TextArea, Label } from 'semantic-ui-react'
import Button from '../../Semantic-Themed/Button'
import styled from '../../../theme-styled'
import { isEmpty } from 'lodash'

const CustomTextArea = styled(TextArea) <{ height: number }>`
  ${(props) => `height: ${props.height}px !important;`}
  width: 100%;
  resize: none !important;
  padding: 10px;
`

export interface TextAreaModalProps {
  header: string
  height?: number
  placeholder?: string
  onSubmit: (value: string) => void
  open: boolean
  close: () => void
  isFormValid?: (value: string) => boolean
  validationMessage?: string
}

const TextAreaModal = (props: TextAreaModalProps) => {
  const [value, setValue] = useState('')
  const [isSubmitValid, setIsSubmitValid] = useState<boolean>(false)
  const DEFAULT_VALIDATION_MESSAGE = 'Please enter a valid value'
  const [showValidationMessage, setValidationMessage] = useState<string>(
    DEFAULT_VALIDATION_MESSAGE
  )
  const { isFormValid, validationMessage } = props
  const onChange = (_e: unknown, { value }: { value: string }) => {
    setValue(value)
    if (isFormValid) {
      const isValid = isFormValid(value)
      setIsSubmitValid(isValid)
      if (!isValid && validationMessage) {
        setValidationMessage(validationMessage)
      }
    } else {
      setIsSubmitValid(!isEmpty(value))
    }
  }
  const handleSubmit = () => {
    props.onSubmit(value)
    props.close()
  }

  return (
    <Modal size="tiny" onClose={props.close} open={props.open}>
      <Modal.Header>{props.header}</Modal.Header>
      <Modal.Content>
        <CustomTextArea
          placeholder={props.placeholder ? props.placeholder : null}
          height={props.height || 200}
          onChange={onChange}
          value={value}
        />
        {!isSubmitValid ? (
          <Label basic color="red" pointing>
            {showValidationMessage}
          </Label>
        ) : null}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleSubmit} primary disabled={!isSubmitValid}>
          Submit
        </Button>
        <Button onClick={props.close}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default TextAreaModal
