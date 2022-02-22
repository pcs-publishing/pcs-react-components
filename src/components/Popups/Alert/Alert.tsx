import React from 'react'
import Modal, { ModalContent, ModalActions, ModalHeader } from '../../Semantic-Themed/Modal'
import Header from '../../Semantic-Themed/Header'
import Button from '../../Semantic-Themed/Button'
import { isString } from 'lodash'
import useCallOnEnterUp from '../../../hooks/useCallOnEnterUp'

export interface AlertProps {
  title: string
  message: string | React.ReactElement
  close: () => void
  open: boolean
}

const Alert = (props: AlertProps) => {
  const { message, open, close } = props
  const onEnter = () => {
    if (open) close()
  }

  useCallOnEnterUp(onEnter)

  return (
    <Modal size="tiny" open={props.open} onClose={props.close}>
      <ModalHeader>
        <Header content={props.title} />
      </ModalHeader>
      <ModalContent>
        {isString(message) ? <p>{props.message}</p> : message}
      </ModalContent>
      <ModalActions>
        <Button primary onClick={props.close}>
          OK
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default React.memo(Alert)
