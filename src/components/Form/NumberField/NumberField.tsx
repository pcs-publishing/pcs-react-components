import React, { useState, useEffect } from 'react'
import { Form, Input } from 'semantic-ui-react'
import { omit, isNumber } from 'lodash'

export interface NumberFieldProps {
  value: number
  onChange: (value: number) => void
  label?: string
  fluid?: boolean
  placeholder?: string
  min?: number
  max?: number
  disabled?: boolean
  error?: string
  fallbackValue?: number
  unit?: string
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

function NumberField(props: NumberFieldProps) {
  const { value } = props
  const [internalValue, setInternalValue] = useState<number | undefined>(props.value)

  useEffect(() => {
    if (isNumber(value)) {
      setInternalValue(value)
    }
  }, [value, setInternalValue])

  const onChange = (_e: unknown, component: { value: string }) => {
    let value: number = parseFloat(component.value)
    const hasValue = !isNaN(value)
    setInternalValue(hasValue ? value : undefined)

    if (hasValue) {
      if (isValid(value, props)) {
        props.onChange(value)
      }
    }
  }

  const onBlur = () => {
    let value = internalValue
    value = value ?? props.fallbackValue ?? props.min ?? props.max ?? 0
    value = getValueWithinRange(value, props)

    setInternalValue(value)
    props.onChange(value)
  }

  const unitProps = (props.unit ? { label: { content: props.unit, basic: true, size: 'massive' }, labelPosition: 'right' } : undefined) as { label: { content: string, basic: true }, labelPosition: 'right' } | undefined

  const inputProps = {
    ...omit(props, ['fallbackValue', 'label', 'format', 'error', 'value', 'width']) as Omit<NumberFieldProps, 'fallbackValue' | 'label' | 'format' | 'error' | 'value' | 'width'>,
    ...unitProps,
    value: internalValue,
    onChange,
    onBlur,
    error: !!props.error
  }

  return <Form.Field error={!!props.error || !isValid(internalValue, props)} width={props.width}>
    {props.label ? (<label>{props.label}</label>) : null}
    <Input type="number" {...inputProps} step="any" />
  </Form.Field>
}

function isValid(value: number | undefined, options: { min?: number, max?: number }): boolean {
  if (!isNumber(value) || isNaN(value)) return false
  const withinRangeValue = getValueWithinRange(value, options)
  return value === withinRangeValue
}

function getValueWithinRange(value: number, options: { min?: number, max?: number }): number {
  const { min, max } = options

  if (isNumber(min) && value < min) return min
  if (isNumber(max) && value > max) return max

  return value
}

export default NumberField
