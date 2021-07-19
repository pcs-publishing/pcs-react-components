import React from 'react'
import { PushNotification } from '../../definitions'
import PushNotificationList from './components/PushNotificationList'
import { Portal } from 'semantic-ui-react'

export interface PushNotificationProps {
  notifications: PushNotification[]
  onMarkNotificationAsRead: (notificationId: string) => Promise<void>
  onClose: (notificationId: string) => void
}

export default ({
  notifications,
  onClose,
  onMarkNotificationAsRead
}: PushNotificationProps) => {
  return (
    <Portal open={true}>
      <PushNotificationList
        notifications={notifications}
        onClose={onClose}
        onMarkNotificationAsRead={onMarkNotificationAsRead}
      />
    </Portal>
  )
}
