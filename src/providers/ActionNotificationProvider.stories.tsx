import React from 'react'
import { ActionNotificationProvider, useActionNotification } from './ActionNotificationProvider';
import { Button } from 'semantic-ui-react'

export default {
  title: 'hooks/useActionNotification',
  component: ActionNotificationProvider
}

export const Example = () => {
  return <ActionNotificationProvider>
    <ExampleComponent />
  </ActionNotificationProvider>
}

const ExampleComponent = () => {
  const showNotification = useActionNotification()
  const onInfoClick = () => {
    showNotification({
      message: 'Take off!',
      displaying: 'message'
    })
  }
  const onErrorClick = () => {
    showNotification({
      message: 'Failed to take off, abort! abort!!!',
      displaying: 'error'
    })
  }
  const onWarnClick = () => {
    showNotification({
      message: 'Warning! Fuel leak detected',
      displaying: 'warning'
    })
  }

  return <>
    <Button icon="rocket" content="Info" color="blue" onClick={onInfoClick} />
    <Button icon="rocket" content="Error" color="red" onClick={onErrorClick} />
    <Button icon="rocket" content="Warning" color="yellow" onClick={onWarnClick} />
  </>
}
