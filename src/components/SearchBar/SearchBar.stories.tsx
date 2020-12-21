import React from 'react'
import SearchBar, { SearchBarProps } from './SearchBar'

export default {
  title: 'Search Bar',
  component: SearchBar,
  argTypes: { onSearchChange: { action: 'searchChange' } }
}

export const Example = (props: SearchBarProps) => <SearchBar {...props} />

Example.args = {
  placeholder: 'Search for something...',
  disabled: false,
  size: 'large'
}