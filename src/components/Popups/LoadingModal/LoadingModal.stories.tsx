import React from 'react'
import LoadingModal, { LoadingModalProps } from './LoadingModal'

export default {
  title: 'Popups/Loading Modal',
  component: LoadingModal
}

export const Example = (props: LoadingModalProps) => {
  return <LoadingModal {...props} clearProcessingState={() => undefined} />
}

Example.args = {
  processingState: {
    running: true,
    error: undefined,
    totalSteps: 10,
    currentStep: 4
  },
  loadingMessage: 'Loading...'
}