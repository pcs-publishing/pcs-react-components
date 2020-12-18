import React from 'react'
import LazyDropdown, { LazyDropdownProps } from './LazyDropdown'
import faker from 'faker'
import { times } from 'lodash'
import styled from '../../theme-styled'

export default {
  title: 'Lazy Dropdown',
  component: LazyDropdown
}

const Container = styled.div`
  width: 400px;
`

const records = times(50, (i) => ({
  id: i,
  name: `${faker.name.firstName(i % 2)} ${faker.name.lastName(i % 2)}`
}))

const getRecordsByName = async (searchTerm: string) => records.filter(r => r.name.includes(searchTerm))
const getRecordsForIds = async (ids: number[]) => records.filter(r => ids.includes(r.id))

export const Example = (props: LazyDropdownProps) => {
  return <Container>
    <LazyDropdown {...props} recordIdProp={'id'} recordTextProp={'name'} searchForRecords={getRecordsByName} getSelectedRecords={getRecordsForIds} />
  </Container>
}

Example.args = {
  searchDelay: 200,
  dropdownProps: {
    compact: false,
    fluid: true,
    search: true,
    selection: true,
    placeholder: 'Search for a person...'
  }
}

