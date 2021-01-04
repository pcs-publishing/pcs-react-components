import React, { useState } from 'react'
import { FilterDefinition, FilterValue, DateRange } from '../../definitions/filter'
import SearchDrawer, { SearchDrawerProps } from './SearchDrawer'
import styled from '../../theme-styled'

export default {
  title: 'Search Drawer',
  component: SearchDrawer,
  argTypes: { singleFilterChangeHandler: { action: 'singleFilterChange' } }
}

interface ExampleFilter {
  identifier: string
  dateRange: DateRange
}

const Container = styled.div`
  height: 700px;
`

export const DefaultFieldTypes = (props: SearchDrawerProps<ExampleFilter, 'textfield' | 'daterange'>) => {
  const [filter, setFilter] = useState<Partial<ExampleFilter>>({})

  const filterDefinitions: FilterDefinition<ExampleFilter, 'textfield' | 'daterange'>[] = [{
    type: 'textfield',
    name: 'identifier',
  }, {
    type: 'daterange',
    name: 'dateRange',
    label: 'Date Range'
  }]

  const onFilterChange = (name: keyof ExampleFilter, value: FilterValue) => {
    props.singleFilterChangeHandler(name, value)
    setFilter(filter => ({ ...filter, [name]: value }))
  }

  return (
    <Container>
      <SearchDrawer
        title="Default Field Types"
        filterDefinitions={filterDefinitions}
        singleFilterChangeHandler={onFilterChange}
        currentFilter={filter}
      />
    </Container>

  )
}