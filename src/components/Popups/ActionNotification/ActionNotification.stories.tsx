import React, { useState } from 'react'
import Button from '../../Buttons/Button'
import ActionNotification from './ActionNotification'

export default {
  title: 'Popups/Action Notification',
  component: ActionNotification
}

export const PersistantNotification = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setShowNotification(true)}>
        Show persistant notification
      </Button>
      <ActionNotification
        message={'This is a persistant notification. Click to close it!'}
        displaying="message"
        persist={true}
        close={() => setShowNotification(false)}
        show={showNotification}
      />
    </>
  )
}

export const Warning = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setShowNotification(true)}>Show warning</Button>
      <ActionNotification
        message={'This is a warning. It will only last 500ms.'}
        displaying="warning"
        close={() => setShowNotification(false)}
        show={showNotification}
        displayForMs={500}
      />
    </>
  )
}

export const Success = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setShowNotification(true)}>Show success</Button>
      <ActionNotification
        message={
          'This is a success message. It is a message you not often get on Knowledge Prospect so I will keep it open for 6 seconds'
        }
        displaying="success"
        close={() => setShowNotification(false)}
        show={showNotification}
        displayForMs={6000}
      />
    </>
  )
}

export const Error = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setShowNotification(true)}>Show error</Button>
      <ActionNotification
        message={'This is an error message. Welcome to Knowledge Prospect'}
        displaying="error"
        close={() => setShowNotification(false)}
        show={showNotification}
      />
    </>
  )
}

export const PositionedOnTheLeft = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setShowNotification(true)}>
        Show on the left
      </Button>
      <ActionNotification
        message="Look at me, I'm over here on the left"
        displaying="message"
        position="left"
        close={() => setShowNotification(false)}
        show={showNotification}
      />
    </>
  )
}

export const PositionedOnTheRight = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setShowNotification(true)}>
        Show on the right
      </Button>
      <ActionNotification
        message="Look at me, I'm over here on the right"
        displaying="message"
        position="right"
        close={() => setShowNotification(false)}
        show={showNotification}
      />
    </>
  )
}
