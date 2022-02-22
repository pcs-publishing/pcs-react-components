import React from 'react'
import { Progress } from 'semantic-ui-react'
import Modal, { ModalContent } from '../../Semantic-Themed/Modal'
import { ProcessingState } from '../../../definitions'
import styled from '../../../theme-styled'
import Alert from '../Alert'

export interface LoadingModalProps {
  processingState: ProcessingState
  clearProcessingState: () => void
  loadingMessage?: string
  failedTitle?: string
}

const StyledProgress = styled(Progress)`
  .bar {
    background-color: ${props => props.theme.colors.primary} !important;

    .progress {
      color: ${props => props.theme.colors.text.onPrimary} !important;
    }
  }
`

const LoadingModal = (props: LoadingModalProps) => {
  const processingState = props.processingState

  if (!processingState.running) {
    return null
  }

  if (processingState.error) {
    return (
      <Alert
        open
        title={props.failedTitle || 'Unexpected Error'}
        message={processingState.error}
        close={props.clearProcessingState}
      />
    )
  }

  const percent = Math.round(
    (100 / (processingState.totalSteps || 1)) *
    (processingState.currentStep || 0)
  )
  return (
    <Modal open={true} closeOnDimmerClick={false} size="tiny">
      <ModalContent>
        <StyledProgress
          percent={percent}
          autoSuccess
          progress="percent"
          size="large"
          active
        >
          {props.loadingMessage || 'Loading'}
        </StyledProgress>
      </ModalContent>
    </Modal>
  )
}

export default LoadingModal
