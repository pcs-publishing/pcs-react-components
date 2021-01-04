import React from 'react'
import { Modal } from 'semantic-ui-react'
import styled from '../../../theme-styled'

export interface TextViewerProps {
  name: string
  textContent?: string
  onClose: () => void
  width?: string
}

const Text = styled.p`
  white-space: pre-line;
`

const StyledModal = styled(Modal) <{ width?: string }>`
  ${(props) => (props.width ? `width: ${props.width} !important` : '')};
`

const TextViewer = ({ name, onClose, textContent, width }: TextViewerProps) => {
  return (
    <StyledModal
      centered={false}
      width={width}
      open={true}
      onClose={onClose}
      closeIcon
    >
      <Modal.Header>Text for file: {name}</Modal.Header>
      <Modal.Content>
        <Text>{textContent}</Text>
      </Modal.Content>
    </StyledModal>
  )
}

export default TextViewer
