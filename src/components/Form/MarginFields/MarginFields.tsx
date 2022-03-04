import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import LinkButton from '../../Buttons/LinkButton'
import NumberField from '../NumberField'
import styled from '../../../theme-styled'
import { Margin } from '../../../definitions'
import useElementSize from '../../../hooks/useElementSize'

export interface MarginFieldsProps {
  value: Margin,
  onChange: (margin: Margin) => void
  label?: string
  className?: string
}

const Container = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  padding-bottom: 0px;

  label {
    font-weight: bold !important;
  }
`

const Label = styled.div`
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`

const MarginFields = (props: MarginFieldsProps) => {
  const [linkVertically, setLinkVertically] = useState(props.value.top === props.value.bottom)
  const [linkHorizontally, setLinkHorizontally] = useState(props.value.inside === props.value.outside)

  const [containerRef, { width: containerWidth }] = useElementSize()

  const getLinkedFields = (field: keyof Margin): (keyof Margin)[] => {
    const verticalFields: (keyof Margin)[] = ['top', 'bottom']
    const horizontalFields: (keyof Margin)[] = ['inside', 'outside']

    if (linkVertically && verticalFields.includes(field)) {
      return verticalFields.filter(f => f !== field)
    }
    if (linkHorizontally && horizontalFields.includes(field)) {
      return horizontalFields.filter(f => f !== field)
    }

    return []
  }

  const getOnChangeHandler = (field: keyof Margin) => (value: number) => {
    const fields = [field].concat(getLinkedFields(field))
    const marginValue = { ...props.value }
    for (let marginField of fields) {
      marginValue[marginField] = value
    }
    props.onChange(marginValue)
  }


  const getFieldProps = (field: keyof Margin) => ({
    value: props.value[field],
    onChange: getOnChangeHandler(field)
  })

  const isLarge = containerWidth > 300

  const commonProps = {
    min: 0,
    max: 100,
    fallbackValue: 0,
    unit: isLarge ? 'mm' : undefined,
    size: 'small'
  }

  const getLabel = (value: string) => {
    return isLarge ? value : `${value} (mm)`
  }

  return <div ref={containerRef}>
    <Container className={props.className}>
      <Label>{props.label || 'Margin'}</Label>
      <Form.Group widths="equal">
        <NumberField label={getLabel('Top')} {...commonProps} {...getFieldProps('top')} width={8} />
        <LinkButton linked={linkVertically} onChange={setLinkVertically} />
        <NumberField label={getLabel('Bottom')} {...commonProps} {...getFieldProps('bottom')} width={8} />
      </Form.Group>
      <Form.Group widths="equal">
        <NumberField label={getLabel('Inside')} {...commonProps} {...getFieldProps('inside')} width={8} />
        <LinkButton linked={linkHorizontally} onChange={setLinkHorizontally} />
        <NumberField label={getLabel('Outside')} {...commonProps} {...getFieldProps('outside')} width={8} />
      </Form.Group>
    </Container>
  </div>
}



export default MarginFields
