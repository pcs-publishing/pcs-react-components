import React from 'react'
import { Message } from 'semantic-ui-react'

export interface FailedToLoadErrorProps {
  name: string
  description?: string
}

const FailedToLoadError = (props: FailedToLoadErrorProps) => {
  return (
    <Message
      color="red"
      icon="exclamation triangle"
      header="Oops, something has gone wrong"
      content={`Failed to load ${props.name} ${props.description ?? ''}`}
    />
  )
}

export default FailedToLoadError
