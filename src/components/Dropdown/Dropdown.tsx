import React from 'react'
import {
  DropdownItemProps,
  FormDropdownProps,
  Form,
  Dropdown as SemanticDropdown
} from 'semantic-ui-react'

export type DropdownValue =
  | string
  | number
  | boolean
  | (string | number | boolean)[]
  | undefined

export interface DropdownProps {
  options: DropdownItemProps[]
  value: DropdownValue
  onChange: (value: DropdownValue) => void
  dropdownProps?: FormDropdownProps
  label?: string
  className?: string
}

const Dropdown = ({
  dropdownProps,
  onChange,
  value,
  options,
  label,
  className
}: DropdownProps) => {
  return (
    <Form.Field className={className}>
      {label && <label>{label}</label>}
      <SemanticDropdown
        selection
        options={options}
        onChange={(_, { value }) => onChange(value)}
        value={value}
        {...dropdownProps}
      />
    </Form.Field>
  )
}
export default Dropdown
