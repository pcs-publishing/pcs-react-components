import React, { ReactNode } from 'react'
import { Form } from 'semantic-ui-react'
import { FilterDefinition, GetFilterComponentFn, InputType, SingleFilterChangeHandler } from '../../definitions/filter';
import styled from '../../theme-styled'
import CollapsiblePanel from '../CollapsiblePanel'
import Box from '../Styled/Box'
import { ReactElement } from 'react';
import DateRangeFilter from './fields/DateRangeFilter';
import TextFilter from './fields/TextFilter';

const Container = styled(Box)`
  box-shadow: none;
  height: 100%;
  width: auto;
  padding: 0;
  margin: 0;
  margin-right: 5px;
`

const CollapsibleSearchPanel = styled(CollapsiblePanel)<{
  width: number | undefined
}>`
  width: ${(props) => props.width || 370}px;
  padding: 5px;
  margin: 0;
  margin-right: 5px;
  margin-bottom: 4px;
  height: 100% !important;
`

const FilterContainer = styled.div``

export interface SearchDrawerProps<T, U extends InputType> {
  title?: string
  width?: number
  header?: ReactNode
  children?: ReactNode
  filterDefinitions: FilterDefinition<T, U>[]
  singleFilterChangeHandler: SingleFilterChangeHandler<T>
  currentFilter: Partial<T>
  onClear?: () => void
  getFilterComponent?: GetFilterComponentFn<T, U>
}

const StyledForm = styled(Form)`
  flex-grow: 1;
  height: 0;
`
const SearchDrawer = <T extends any, U extends InputType>(props: SearchDrawerProps<T, U>) => {
  return (
    <Container>
      <CollapsibleSearchPanel
        onClear={props.onClear}
        title={props.title}
        width={props.width}
        header={props.header}
      >
        <FilterContainer>
          <StyledForm>
            {getFilterComponents(
              props.filterDefinitions,
              props.singleFilterChangeHandler,
              props.currentFilter || {},
              props.getFilterComponent
            )}
            {props.children}
          </StyledForm>
        </FilterContainer>
      </CollapsibleSearchPanel>
    </Container>
  )
}

export default SearchDrawer

function getFilterComponents<T, U extends InputType>(filterDefinitions: FilterDefinition<T, U>[], singleFilterChangeHandler: SingleFilterChangeHandler<T>, currentFilter: Partial<T>, getFilterComponent?: GetFilterComponentFn<T, U>) : ReactElement[] {
  return filterDefinitions.map(filterDefinition => {
    let filter: ReactElement | undefined
    if (getFilterComponent) {
      filter = getFilterComponent(filterDefinition, singleFilterChangeHandler, currentFilter)
    }
    if (!filter) {
      filter = getBaseFilterComponent(filterDefinition, singleFilterChangeHandler, currentFilter)
    }

    return filter
  })
}

function getBaseFilterComponent<T, U extends InputType>(filterDefinition: FilterDefinition<T, U>, changeHandler: SingleFilterChangeHandler<T>, currentFilter: Partial<T>) : ReactElement {
  const props = {
    key: filterDefinition.name as string,
    value: currentFilter[filterDefinition.name],
    filterDefinition,
    changeHandler,
    type: filterDefinition.type
  }
  switch (filterDefinition.type) {
    case 'textfield':
      return <TextFilter {...props} />
    case 'daterange':
      return <DateRangeFilter {...props} />
    default:
      return <div key={filterDefinition.name as string}>Unknown filter type {filterDefinition.type}.</div>
  }  
}

