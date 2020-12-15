import React from 'react'
import FailedToLoadError, { FailedToLoadErrorProps } from './FailedToLoadError';


export default {
  title: 'Failed To Load Error'
}

export const Example =  (props: FailedToLoadErrorProps) => {
  return <FailedToLoadError {...props} />
}

Example.args = {
  name: 'user details',
  description: ''
}
