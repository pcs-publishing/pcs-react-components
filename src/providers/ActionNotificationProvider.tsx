import React, { useState } from 'react'
import ActionNotification, { ActionNotificationProps } from '../components/Popups/ActionNotification/ActionNotification'

type ActionNotificationOptions = Omit<ActionNotificationProps, 'show' | 'close'>
type ShowNotificationFn = (input: ActionNotificationOptions) => void

const ActionNotificationContext = React.createContext<React.Dispatch<React.SetStateAction<ActionNotificationOptions | null>> | null>(null)

export const ActionNotificationProvider: React.FunctionComponent = ({ children }) => {
  const [value, setValue] = useState<ActionNotificationOptions | null>(null)

  const removeActionNotification = () => {
    setValue(null)
  }

  return <ActionNotificationContext.Provider value={setValue}>
    {value ? <ActionNotification show={!!value} close={removeActionNotification} {...value} /> : null}
    {children}
  </ActionNotificationContext.Provider >
}

export function useActionNotification(): ShowNotificationFn {
  const setActionNotifications = React.useContext(ActionNotificationContext)
  if (!setActionNotifications) {
    throw new Error('useActionNotification must be used within a ActionNotificationProvider')
  }

  return (input: ActionNotificationOptions) => {
    setActionNotifications(input)
  }
}
