import React from 'react'
import { Modal, Header } from 'semantic-ui-react'
import Button from '../../Buttons/Button'
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
      <Header content={props.title} />
      <Modal.Content>
        {isString(message) ? <p>{props.message}</p> : message}
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={props.close}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default React.memo(Alert)
