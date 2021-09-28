import React, { useState, useMemo } from 'react'
import styled from '../../theme-styled'
import { Step } from 'semantic-ui-react'
import { omit } from 'lodash'

export interface StepsProps {
  steps: StepConfig[]
  stepsMaxWidth?: number
  header?: React.ReactElement | null
  footer?: React.ReactElement | null
  className?: string
}

export interface StepConfig {
  key: string
  title: string
  icon: string
  description?: string
  completed?: boolean
  stepContent: React.ReactElement
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`

const StepGroup = styled(Step.Group) <{ $maxWidth?: number }>`
  ${props => props.$maxWidth ? `max-width: ${props.maxWidth}px;` : 'width: 100%;'}

  .step.active {
    background-color:${props => props.theme.colors.primary} !important;

    .title, .description, .icon {
      color: ${props => props.theme.colors.text.onPrimary} !important;
    }

    :after {
      background-color:${props => props.theme.colors.primary} !important;
    }
  }
`

const StepContent = styled.div``

const Steps = (props: StepsProps) => {
  const [activeStepKey, setActiveStepKey] = useState<string | undefined>(props.steps[0]?.key)
  const { header, footer } = props

  const steps = useMemo(() => props.steps.map(step => ({
    ...step,
    active: step.key === activeStepKey,
    onClick: () => setActiveStepKey(step.key)
  })), [props.steps, activeStepKey])

  const content = props.steps.find(step => step.key === activeStepKey)?.stepContent

  return <Container className={props.className}>
    {header}
    <StepContainer>
      <StepGroup $maxWidth={props.stepsMaxWidth} size={'tiny'} items={steps.map(step => omit(step, 'stepContent'))} />
    </StepContainer>
    <StepContent className="step-content">
      {content}
    </StepContent>
    {footer}
  </Container>
}

export default Steps
