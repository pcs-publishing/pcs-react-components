import React from 'react'
import { Modal, Header, SemanticCOLORS } from 'semantic-ui-react'
import Button from '../../Button'
import useCallOnEnterUp from '../../../hooks/useCallOnEnterUp'
import useCallOnEscapeUp from '../../../hooks/useCallOnEscapeUp'
import { isString } from 'lodash'

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
      <Header content={props.title} />
      <Modal.Content>
        {isString(props.message) ? <p>{props.message}</p> : props.message}
      </Modal.Content>
      <Modal.Actions>
        <Button
          primary={!props.confirmButtonColor}
          color={props.confirmButtonColor}
          onClick={onConfirm}
        >
          {props.confirmButtonText || 'Yes'}
        </Button>
        <Button color={props.cancelButtonColor} onClick={onCancel}>{props.cancelButtonText || 'No'}</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default React.memo(Confirm)
