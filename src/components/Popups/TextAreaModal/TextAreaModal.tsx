import React, { useState, ChangeEvent } from 'react'
import { Modal, TextArea, Button } from 'semantic-ui-react'
import styled from '../../../theme-styled'



const CustomTextArea = styled(TextArea) <{ height: number }>`
  ${(props) => `height: ${props.height}px !important;`}
  width: 100%;
  resize: none !important;
  padding: 10px;
`

interface TextAreaModalProps {
  header: string,
  height?: number
  placeholder?: string
  onSubmit: (value: string) => void
  open: boolean
  close: () => void
}

const TextAreaModal = (props: TextAreaModalProps) => {
  const [value, setValue] = useState('')
  const onChange = (_e: unknown, { value }: { value: string }) => {
    setValue(value)
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
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleSubmit} primary>
          Submit
        </Button>
        <Button secondary onClick={props.close}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default TextAreaModal
