import React, { useMemo, useState, useCallback } from 'react'
import DataGrid, { DataGridProps } from './DataGrid'
import _ from 'lodash'
import faker from 'faker'
import styled from 'styled-components'
import { ColumnDefinition, PageInfo, SortDirection } from '../../definitions'

export default {
  title: 'Data/Data Grid',
  component: DataGrid
}

const GridContainer = styled.div`
  height: 500px;
  width: 100%;
`

interface Record {
  id: number
  name: string
  product: string
  email: string
  phone: string
}

const records: Record[] = generateTestData()

const columnDefinitions: ColumnDefinition<Record>[] = [{
    key: 'name'
  }, {
    key: 'product'
  }, {
    key: 'email'
  }, {
    key: 'phone'
}]

const Template = (props: DataGridProps<Record, never>) => {
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    pageSize: 20,
    totalPages: 7,
    totalRecords: 125
  })

  const [sort, setSort] = useState<{ column: string, direction: SortDirection}>({
    column: 'name',
    direction: 'ascending'
  })

  const data = useMemo(() => getRecordsForPage(pageInfo.page, pageInfo.pageSize, sort.column, sort.direction, records), [pageInfo, sort, records])

  const onPageInfoChange = useCallback(newInfo => {
    setPageInfo((current) => ({ ...current, ...newInfo }))
  }, [setPageInfo])

  const onSortChange = useCallback((column, direction) => {
    setSort({ column: column.key, direction })
  }, [setSort])


  return <GridContainer>
    <DataGrid {...props} data={data} columnDefinitions={columnDefinitions} onPageInfoChange={onPageInfoChange} onSortChange={onSortChange} pageInfo={pageInfo} idField="id"/>
  </GridContainer>

 }

export const Basic = Template.bind({})

Basic.args = {
  compact: false,
  selectionMode: 'single',
  loading: false
}

function generateTestData() {
  return _.times(125, (i: number) => ({
    id: i,
    name: faker.name.findName(),
    product: faker.commerce.product(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  }))
}

function getRecordsForPage(page: number, pageSize: number, sortColumn: string, sortDirection: SortDirection, data: Record[]): Record[] {
  const startIndex = (page - 1) * pageSize
  const sortedData = _.orderBy(data, [sortColumn], [sortDirection === 'ascending' ? 'asc' : 'desc'])

  return sortedData.slice(startIndex, startIndex + pageSize)
}
