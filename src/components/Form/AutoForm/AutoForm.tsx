import React, { useState, useCallback, ReactNode } from 'react'
import Button from '../../Semantic-Themed/Button'
import Form from '../../Semantic-Themed/Form'
import Popup from '../../Semantic-Themed/Popup'
import TextField from './fields/TextField'
import ColorField from './fields/ColorField'
import BooleanField from './fields/BooleanField'
import DropdownField from './fields/DropdownField'
import DateField from './fields/DateField'
import TimeField from './fields/TimeField'
import TextAreaField from './fields/TextAreaField'
import FileField from './fields/FileField'
import styled from 'styled-components'
import FilenameFormField from './fields/FilenameFormField'
import {
  AutoFormProps,
  FieldDefinition,
  FormFieldSetter,
  FormFieldValue,
  FormValue
} from './definitions'
import { DateRangeOptions } from '../DateRange'
import DateRange from '../DateRange'

const ButtonContainer = styled.div`
  margin-top: 10px;
`

const AutoForm = (props: AutoFormProps) => {
  const [formValue, setFormValue] = useState<FormValue>(
    props.defaultValue ?? {}
  )
  const [popups, setPopups] = useState<string[]>([])
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
    if (props.clearAfterSave) {
      setFormValue(props.defaultValue ?? {})
    }
  }

  const onOpenPopup = useCallback(
    (open: boolean, key: string) => {
      setPopups((prevState) =>
        open ? [key, ...prevState] : prevState.filter((value) => value !== key)
      )
    },
    [setPopups]
  )

  const isValid = validateForm(fields, formValue)
  const size = props.size || 'tiny'

  return (
    <Form onSubmit={onFormSubmit} size={size}>
      {generateFields(
        fields,
        formValue,
        setFormFieldValue,
        onOpenPopup,
        popups
      )}
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
          <Button
            type="button"
            size={size}
            onClick={onCancel}
            compact={props.compact}
          >
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
  setFormValue: FormFieldSetter,
  onOpenPopup: (open: boolean, key: string) => void,
  popups: string[]
): ReactNode[] {
  return fields.map((fieldDefinition) => {
    const isPopupOpen = !!popups.find((value) => value === fieldDefinition.key)
    return generateField(
      fieldDefinition,
      formValue,
      setFormValue,
      onOpenPopup,
      isPopupOpen
    )
  })
}

function generateField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter,
  onOpenPopup: (oepn: boolean, key: string) => void,
  isPopupOpen: boolean
): ReactNode {
  let fieldComponent: React.ReactNode | null = null

  switch (field.type) {
    case 'text':
      fieldComponent = generateTextField(field, formValue, setFormValue)
      break
    case 'color':
      fieldComponent = generateColorField(field, formValue, setFormValue)
      break
    case 'boolean':
      fieldComponent = generateBooleanField(field, formValue, setFormValue)
      break
    case 'dropdown':
      fieldComponent = generateDropdownField(field, formValue, setFormValue)
      break
    case 'number':
      fieldComponent = generateNumberField(field, formValue, setFormValue)
      break
    case 'filename':
      fieldComponent = generateFileNameField(field, formValue, setFormValue)
      break
    case 'date':
      fieldComponent = generateDateField(field, formValue, setFormValue)
      break
    case 'time':
      fieldComponent = generateTimeField(field, formValue, setFormValue)
      break
    case 'daterange':
      fieldComponent = generateDateRangeField(field, formValue, setFormValue)
      break
    case 'textarea':
      fieldComponent = generateTextAreaField(field, formValue, setFormValue)
      break
    case 'file':
      fieldComponent = generateFileField(field, formValue, setFormValue)
      break
    default:
      fieldComponent = null
      break
  }

  return field.popupContent ? (
    <Popup
      content={field.popupContent}
      trigger={
        <span
          onMouseOver={() => onOpenPopup(true, field.key)} // have to manually control when popup is open otherwise it does not show
          onMouseLeave={() => onOpenPopup(false, field.key)}
        >
          {fieldComponent}
        </span>
      }
      open={isPopupOpen}
    />
  ) : (
    fieldComponent
  )
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
      onChange={(key, value) => {
        if (field.onChange) {
          field.onChange(value)
        }
        setFormValue(key, value)
      }}
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
      onChange={(key, value) => {
        if (field.onChange) {
          field.onChange(value)
        }
        setFormValue(key, value)
      }}
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
      onChange={(key, value) => {
        if (field.onChange) {
          field.onChange(value)
        }
        setFormValue(key, value)
      }}
      allValues={formValue}
    />
  )
}

function generateTextAreaField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = (formValue[field.key] ?? '') as string
  return (
    <TextAreaField
      key={field.key}
      field={field}
      value={value}
      onChange={(key, value) => {
        if (field.onChange) {
          field.onChange(value)
        }
        setFormValue(key, value)
      }}
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
      onChange={(key, value) => {
        if (field.onChange) {
          field.onChange(value)
        }
        setFormValue(key, value)
      }}
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
      onChange={(key, value) => {
        if (field.onChange) {
          field.onChange(value)
        }
        setFormValue(key, value)
      }}
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
      onChange={(key, value) => {
        if (field.onChange) {
          field.onChange(value)
        }
        setFormValue(key, value)
      }}
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
      onChange={(key, value) => {
        if (field.onChange) {
          field.onChange(value)
        }
        setFormValue(key, value)
      }}
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
      onChange={(key, value) => {
        if (field.onChange) {
          field.onChange(value)
        }
        setFormValue(key, value)
      }}
      allValues={formValue}
    />
  )
}

function generateDateRangeField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = (formValue[field.key] as unknown) as
    | DateRangeOptions
    | undefined
  const onChange = (value: DateRangeOptions | undefined) => {
    if (field.onChange) {
      field.onChange(value)
    }
    setFormValue(field.key, value)
  }
  return <DateRange value={value} label={field.label} onChange={onChange} />
}

function generateFileField(
  field: FieldDefinition,
  formValue: FormValue,
  setFormValue: FormFieldSetter
): ReactNode {
  const value = (formValue[field.key] ?? '') as string
  field.inputType = 'file' // to force a file input
  return (
    <FileField
      key={field.key}
      field={field}
      value={value}
      onChange={(key, value) => {
        if (field.onChange) {
          field.onChange(value)
        }
        setFormValue(key, value)
      }}
      allValues={formValue}
    />
  )
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
