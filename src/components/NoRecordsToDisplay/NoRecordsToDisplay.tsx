import React from 'react'
import { Message } from 'semantic-ui-react'

export interface NoRecordsToDisplayProps {
  name: string
}

const NoRecordsToDisplay = (props: NoRecordsToDisplayProps) => {
  return (
    <Message
      size="large"
      icon="search"
      header="Nothing to display!"
      content={`No ${props.name} records found`}
    />
  )
}

export default NoRecordsToDisplay
