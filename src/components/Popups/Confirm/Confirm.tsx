import React from 'react'
import { SemanticCOLORS } from 'semantic-ui-react'
import Button from '../../Semantic-Themed/Button'
import useCallOnEnterUp from '../../../hooks/useCallOnEnterUp'
import useCallOnEscapeUp from '../../../hooks/useCallOnEscapeUp'
import { isString } from 'lodash'
import Modal, { ModalActions, ModalContent, ModalHeader } from '../../Semantic-Themed/Modal'
import Header from '../../Semantic-Themed/Header'

export interface ConfirmProps {
  title: string
  message: string | React.ReactElement
  open: boolean
  close: () => void
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonColor?: SemanticCOLORS
  cancelButtonColor?: SemanticCOLORS
  onConfirmCallback?: () => void
  onCancelCallback?: () => void
}

const Confirm = (props: ConfirmProps) => {
  const closeAndCall = (fn: (() => void) | undefined) => {
    return () => {
      if (!props.open) return
      props.close()
      if (fn) fn()
    }
  }

  const onConfirm = closeAndCall(props.onConfirmCallback)
  const onCancel = closeAndCall(props.onCancelCallback)

  useCallOnEnterUp(onConfirm)
  useCallOnEscapeUp(onCancel)

  return (
    <Modal size="tiny" open={props.open} onClose={props.close}>
      <ModalHeader>
        <Header content={props.title} />
      </ModalHeader>
      <ModalContent>
        {isString(props.message) ? <p>{props.message}</p> : props.message}
      </ModalContent>
      <ModalActions>
        <Button
          primary={!props.confirmButtonColor}
          color={props.confirmButtonColor}
          onClick={onConfirm}
        >
          {props.confirmButtonText || 'Yes'}
        </Button>
        <Button color={props.cancelButtonColor} onClick={onCancel}>{props.cancelButtonText || 'No'}</Button>
      </ModalActions>
    </Modal>
  )
}

export default React.memo(Confirm)
