import React from 'react'
import { Input, InputProps } from 'semantic-ui-react'

export interface SearchBarProps extends InputProps {
  onSearchChange: (searchValue: string) => void
}

const SearchBar = (props: SearchBarProps) => {
  const { onSearchChange, ...otherProps } = props

  return (
    <Input
      {...otherProps}
      icon="search"
      onChange={(_e: unknown, inputProps: InputProps) => {
        props.onSearchChange(inputProps.value)
      }}
    />
  )
}

export default SearchBar
