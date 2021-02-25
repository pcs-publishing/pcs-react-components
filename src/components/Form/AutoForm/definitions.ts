import { WeekDay } from '../../../definitions'
import { DateRangeOptions } from '../DateRange'

export type FormFieldValue =
  | string
  | number
  | boolean
  | WeekDay
  | DateRangeOptions
  | undefined

export type FormFieldType =
  | 'text'
  | 'color'
  | 'boolean'
  | 'dropdown'
  | 'number'
  | 'filename'
  | 'date'
  | 'time'
  | 'daterange'
  | 'textarea'

export type FormFieldInputType = 'text' | 'number' | 'password'

export type FormValue = { [key: string]: FormFieldValue }

export type FormFieldSetter = (
  fieldKey: string,
  fieldValue: FormFieldValue
) => void

export interface AutoFormProps {
  fields: FieldDefinition[]
  onSave: (formValue: FormValue) => void
  onCancel?: () => void
  defaultValue?: FormValue
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
  compact?: boolean
  clearAfterSave?: boolean
}

type FieldDefinitionErrorPointing = 'below' | 'left' | 'above' | 'right'

export interface FieldDefinitionError {
  content: string
  pointing: FieldDefinitionErrorPointing
}

export interface FieldDefinition {
  key: string
  label: string
  type: FormFieldType
  required?: boolean
  autoFocus?: boolean
  disabled?: boolean
  options?: any
  inputType?: FormFieldInputType
  error?: (
    value: FormFieldValue,
    allvalues: FormValue
  ) => FieldDefinitionError | undefined
  rows?: number
  onChange?: (value: FormFieldValue) => void
}

export interface FieldProps {
  field: FieldDefinition
  value: FormFieldValue
  defaultValue?: FormFieldValue
  onChange: (key: string, value: FormFieldValue) => void
  allValues?: FormValue
}
