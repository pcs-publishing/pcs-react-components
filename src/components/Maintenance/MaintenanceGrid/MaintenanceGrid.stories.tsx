import React, { useState, useMemo } from 'react'
import { ColumnDefinition, PageInfo } from '../../../definitions'
import MaintenanceGrid from './MaintenanceGrid'
import { times } from 'lodash'
import faker from 'faker'
import styled from '../../../theme-styled'

export default {
  title: 'Maintenance/Maintenance Grid',
  component: MaintenanceGrid
}

type ExampleRecord = {
  _id: string
  name: string
  cost: number
  created: Date
}

const Container = styled.div`
  width: 100%;
  height: 95vh;
`

const totalRecords = Math.ceil(Math.random() * 1000)
const records: ExampleRecord[] = times(totalRecords, () => ({
  _id: faker.random.alphaNumeric(10),
  name: faker.company.companyName(),
  cost: faker.random.number(10_000),
  created: faker.date.future()
}))
const pageSize = 20

const columnDefinitions: ColumnDefinition<ExampleRecord>[] = [{
  key: 'name'
}, {
  key: 'cost'
}, {
  type: 'date',
  key: 'created'
}]

export const Example = () => {

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    pageSize,
    totalPages: Math.ceil(records.length / pageSize),
    totalRecords: records.length
  })

  const pagedRecords = useMemo(() => {
    return getRecords(records, pageInfo)
  }, [records, pageInfo])

  return <Container>
    <MaintenanceGrid
      idField="_id"
      nameField="name"
      name="Example Grid"
      columnDefinitions={columnDefinitions}
      records={pagedRecords}
      pageInfo={pageInfo}
      onPageInfoChange={setPageInfo}
      onCreate={async (record: ExampleRecord) => console.log('onCreate called with: ', record)}
      onEdit={async (record: ExampleRecord) => console.log('onEdit called with: ', record)}
      onDelete={async (id: string | number) => console.log('onDelete called with: ', id)}
    />
  </Container>
}

function getRecords(records: ExampleRecord[], pageInfo: PageInfo): ExampleRecord[] {
  return records.slice((pageInfo.page - 1) * pageInfo.pageSize, (pageInfo.page * pageInfo.pageSize) - 1)
}
