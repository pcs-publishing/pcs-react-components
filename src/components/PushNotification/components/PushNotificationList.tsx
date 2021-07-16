import React from 'react'
import { PushNotification } from '../../../definitions'
import styled from '../../../theme-styled'
import SinglePushNotification from './SinglePushNotification'

const PushNotificationListContainer = styled.div`
  left: 80%;
  position: absolute !important;
  top: 0 !important;
  z-index: 1000 !important;
  right: 5px;
`

interface PushNotificationListProps {
  notifications: PushNotification[]
  onMarkNotificationAsRead: (notificationId: string) => Promise<void>
  onClose: (notificationId: string) => void
}

const PushNotificationList = ({
  notifications,
  onClose,
  onMarkNotificationAsRead
}: PushNotificationListProps) => {
  return (
    <PushNotificationListContainer>
      {notifications.map((notification) => (
        <SinglePushNotification
          key={notification._id}
          notification={notification}
          onClose={onClose}
          onMarkNotificationAsRead={onMarkNotificationAsRead}
        />
      ))}
    </PushNotificationListContainer>
  )
}

export default PushNotificationList
