import React, { useState } from 'react'
import PushNotification from './PushNotification'
import { PushNotification as Notification } from '../../definitions'

export default {
  title: 'Push Notification',
  component: PushNotification
}

const Template = () => {
  const [notifcations, setNotifications] = useState<Notification[]>([
    {
      createdAt: new Date(),
      message: 'Notification 1',
      _id: '1',
      from: 'Matt',
      title: 'Notification 1',
      avatarUrl: 'https://semantic-ui.com/images/avatar2/large/matthew.png'
    },
    {
      createdAt: new Date(),
      message: 'Notification 2',
      _id: '2',
      from: 'Elliot',
      title: 'Notification 2',
      avatarUrl: 'https://semantic-ui.com/images/avatar/large/elliot.jpg'
    },
    {
      createdAt: new Date(),
      message: 'Notification 3',
      _id: '3',
      from: 'Kirsty',
      title: 'Notification 3',
      avatarUrl: 'https://semantic-ui.com/images/avatar2/large/kristy.png'
    }
  ])

  return (
    <PushNotification
      notifications={notifcations}
      onClose={(notificationId) =>
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== notificationId
          )
        )
      }
      onMarkNotificationAsRead={async (notificationId) =>
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== notificationId
          )
        )
      }
    />
  )
}

export const Example = Template.bind({})
