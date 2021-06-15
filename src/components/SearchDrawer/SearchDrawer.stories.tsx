import React, { useState } from 'react'
import { FilterDefinition, FilterValue, DateRange, InputType } from '../../definitions/filter'
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
  date: Date
}

const Container = styled.div`
  height: 700px;
  display: flex;
`

const MainArea = styled.div`
  width: 70%;
`

export const DefaultFieldTypes = (props: SearchDrawerProps<ExampleFilter, InputType>) => {
  const [filter, setFilter] = useState<Partial<ExampleFilter>>({ date: new Date() })

  const filterDefinitions: FilterDefinition<ExampleFilter, InputType>[] = [{
    type: 'textfield',
    name: 'identifier',
  }, {
    type: 'daterange',
    name: 'dateRange',
    label: 'Date Range'
  }, {
    type: 'date',
    name: 'date',
    label: 'Date'
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
        onClear={() => setFilter({})}
      />
      <MainArea />
    </Container>
  )
}
