import React from 'react'
import Steps from '../../Steps'
import styled from '../../../theme-styled'
import Button from '../../Semantic-Themed/Button'
import { Header } from 'semantic-ui-react'
import { StepConfig } from '../../Steps/Steps'


const StyledStepView = styled(Steps)`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .step-content {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
`

const FooterContainer = styled.div`
  padding: 10px;
  padding-left: 0;
`

export interface StepFormProps {
  header: string
  submitButtonText: string
  steps: StepConfig[]
  valid: boolean
  loading: boolean
  onSubmit: () => void
  stepsMaxWidth?: number
}

const StepForm = (props: StepFormProps) => {
  const { valid, loading, onSubmit, steps, header, submitButtonText } = props
  return <StyledStepView
    header={<Header textAlign="center" size="large">{header}</Header>}
    stepsMaxWidth={props.stepsMaxWidth}
    steps={steps}
    footer={
      <FooterContainer>
        <Button size="large" content={submitButtonText} primary loading={loading} disabled={!valid} onClick={onSubmit} />
      </FooterContainer>
    } />

}

export default StepForm
