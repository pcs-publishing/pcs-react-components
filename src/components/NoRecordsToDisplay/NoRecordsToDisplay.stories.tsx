import React from 'react'
import NoRecordsToDisplay, { NoRecordsToDisplayProps } from './NoRecordsToDisplay'

export default {
  component: NoRecordsToDisplay,
  title: 'No Records To Display'
}

export const Example = (props: NoRecordsToDisplayProps) => {
  return <NoRecordsToDisplay {...props} />
}

Example.args = {
  name: 'personel'
}