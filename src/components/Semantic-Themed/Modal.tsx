import React from 'react'
import styled from '../../theme-styled'
import { Modal, ModalProps } from 'semantic-ui-react'

const StyledModal = styled(Modal)`
  ${props => props.theme.modal || ''}
`

const ThemedModal = (props: ModalProps) => {
  return <StyledModal {...props}>
    {props.children}
  </StyledModal>
}

export const ModalHeader = Modal.Header
export const ModalContent = Modal.Content
export const ModalActions = Modal.Actions


export default ThemedModal
