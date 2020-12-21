import React, { useState, useCallback, ReactNode } from 'react'
import { Form } from 'semantic-ui-react'
import Button from '../../Button'
import TextField from './fields/TextField'
import ColorField from './fields/ColorField'
import BooleanField from './fields/BooleanField'
import DropdownField from './fields/DropdownField'
import DateField from './fields/DateField'
import TimeField from './fields/TimeField'
import styled from 'styled-components'
import FilenameFormField from './fields/FilenameFormField'
import { AutoFormProps, FieldDefinition, FormFieldSetter, FormFieldValue, FormValue } from './definitions'
import { DateRangeOptions } from '../DateRange'
import DateRange from '../DateRange'

const ButtonContainer = styled.div`
  margin-top: 10px;
`

const AutoForm = (props: AutoFormProps) => {
  const [formValue, setFormValue] = useState<FormValue>(
    props.defaultValue ?? {}
  )
  const { onSave, onCancel, fields } = props

  const setFormFieldValue = useCallback(
    (fieldKey: string, fieldValue: FormFieldValue) => {
      setFormValue((formValue) => {
        const newFormValue = {
          ...formValue,
          [fieldKey]: fieldValue
        } as FormValue
        return newFormValue
      })
    },
    [setFormValue]
  )

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onSave(formValue)
  }

  const isValid = validateForm(fields, formValue)
  const size = props.size || 'tiny'

  return (
    <Form onSubmit={onFormSubmit} size={size}>
      {generateFields(fields, formValue, setFormFieldValue)}
      <ButtonContainer>
        <Button
          type="submit"
          size={size}
          primary
          disabled={!isValid}
          compact={props.compact}
        >
          Save
        </Button>
        {props.onCancel ? (
          <Button size={size} onClick={onCancel} compact={props.compact}>
            Cancel
          </Button>
        ) : null}
      </ButtonContainer>
    </Form>
  )
}

export default AutoForm

function generateFields(
  fields: FieldDefinition[],
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode[] {
  return fields.map((fieldDefinition) =>
    generateField(fieldDefinition, formValue, setFormValue)
  )
}

function generateField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  switch (field.type) {
    case 'text':
      return generateTextField(field, formValue, setFormValue)
    case 'color':
      return generateColorField(field, formValue, setFormValue)
    case 'boolean':
      return generateBooleanField(field, formValue, setFormValue)
    case 'dropdown':
      return generateDropdownField(field, formValue, setFormValue)
    case 'number':
      return generateNumberField(field, formValue, setFormValue)
    case 'filename':
      return generateFileNameField(field, formValue, setFormValue)
    case 'date':
      return generateDateField(field, formValue, setFormValue)
    case 'time':
      return generateTimeField(field, formValue, setFormValue)
    case 'daterange':
      return generateDateRangeField(field, formValue, setFormValue)

    default:
      return null
  }
}

function generateDateField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = (formValue[field.key] ?? '') as string
  return (
    <DateField
      key={field.key}
      field={field}
      value={value}
      onChange={setFormValue}
      allValues={formValue}
    />
  )
}

function generateTimeField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = (formValue[field.key] ?? '') as string
  return (
    <TimeField
      key={field.key}
      field={field}
      value={value}
      onChange={setFormValue}
      allValues={formValue}
    />
  )
}

function generateTextField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = (formValue[field.key] ?? '') as string
  return (
    <TextField
      key={field.key}
      field={field}
      value={value}
      onChange={setFormValue}
      allValues={formValue}
    />
  )
}

function generateNumberField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = (formValue[field.key] ?? '') as string
  field.inputType = 'number' // to force a number input
  return (
    <TextField
      key={field.key}
      field={field}
      value={value}
      onChange={setFormValue}
      allValues={formValue}
    />
  )
}

function generateBooleanField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = formValue[field.key] ?? false
  return (
    <BooleanField
      key={field.key}
      field={field}
      value={!!value}
      onChange={setFormValue}
    />
  )
}

function generateDropdownField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = formValue[field.key] ?? false
  return (
    <DropdownField
      key={field.key}
      field={field}
      value={!!value}
      defaultValue={value}
      onChange={setFormValue}
      allValues={formValue}
    />
  )
}

function generateColorField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = (formValue[field.key] ?? '#1abc9c') as string
  return (
    <ColorField
      key={field.key}
      field={field}
      value={value}
      onChange={setFormValue}
    />
  )
}

function generateFileNameField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = formValue[field.key] as string
  return (
    <FilenameFormField
      key={field.key}
      field={field}
      value={value}
      onChange={setFormValue}
      allValues={formValue}
    />
  )
}

function generateDateRangeField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = (formValue[field.key] as unknown) as DateRangeOptions | undefined
  const onChange = (value: DateRangeOptions | undefined) => setFormValue(field.key, value)
  return <DateRange value={value} label={field.label} onChange={onChange} />
}

function validateForm(
  fields: FieldDefinition[],
  formValue: FormValue
): boolean {
  let valid = true

  fields.forEach((field) => {
    if (!valid) return
    if (field.required) {
      valid = !!formValue[field.key]
    }
    const error = field.error
      ? field.error(formValue[field.key], formValue)
      : undefined
    if (error) {
      valid = false
    }
  })

  return valid
}
