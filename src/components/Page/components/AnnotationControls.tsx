import React from 'react'
import styled from 'styled-components'
import { Annotation, AnnotationColor } from '../../../definitions'
import Button from '../../Buttons/Button'
import EditableLabel from '../../EditableLabel'
import Swatch from '../../Styled/Swatch'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

interface AnnotationControlsProps {
  content: string
  onChange: (annotation: Partial<Annotation>) => void
  onDelete: () => void
}

const availableColors: AnnotationColor[] = [
  'black',
  'cyan',
  'magenta',
  'yellow'
]

const ColorsContainer = styled.div`
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: center;
`

const StyledSwatch = styled(Swatch)`
  margin-left: 5px;
  margin-right: 5px;
  width: 30px !important;
  height: 30px !important;
  cursor: pointer;
`

const AnnotationControls = (props: AnnotationControlsProps) => {
  const { content } = props
  return (
    <Container>
      <EditableLabel
        canResize={false}
        defaultOpen={content === ''}
        asTextArea={true}
        value={content}
        onChange={(value) => props.onChange({ content: value })}
      />
      <ColorsContainer>
        {availableColors.map((color) => (
          <StyledSwatch
            onClick={() => props.onChange({ color })}
            key={color}
            color={color}
          />
        ))}
      </ColorsContainer>
      <Button icon="trash" color="red" onClick={() => props.onDelete()} />
    </Container>
  )
}

export default AnnotationControls
