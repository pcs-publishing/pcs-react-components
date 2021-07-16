import React from 'react'
import ReactDOM from 'react-dom'
import { PushNotification } from '../../definitions'
import PushNotificationList from './components/PushNotificationList'

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
  const body = document.getElementsByTagName('body')[0]

  return ReactDOM.createPortal(
    <PushNotificationList
      notifications={notifications}
      onClose={onClose}
      onMarkNotificationAsRead={onMarkNotificationAsRead}
    />,
    body
  )
}
