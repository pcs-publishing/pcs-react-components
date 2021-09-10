import React, { useState, useMemo } from 'react'
import { ColumnDefinition, PageInfo } from '../../../definitions'
import MaintenanceGrid from './MaintenanceGrid'
import { times } from 'lodash'
import faker from 'faker'
import styled from '../../../theme-styled'
import { FieldDefinition } from '../../Form/AutoForm/definitions'

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
  height: 90vh;
`

const totalRecords = Math.ceil(Math.random() * 50)
let initialRecords: ExampleRecord[] = times(totalRecords, () => ({
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

const formFieldDefinition: FieldDefinition[] = [{
  key: 'name',
  label: 'Name',
  required: true,
  type: 'text'
}, {
  key: 'cost',
  label: 'Cost (£)',
  type: 'number',
  required: true
}, {
  key: 'created',
  label: 'Created Date',
  type: 'date',
  required: true
}]

export const Example = () => {
  const [records, setRecords] = useState(initialRecords)
  const [search, setSearch] = useState('')

  const searchedRecords = useMemo(() => {
    if (!search) return records

    return records.filter(record => record.name.includes(search))
  }, [search, records])

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    pageSize,
    totalPages: Math.ceil(searchedRecords.length / pageSize),
    totalRecords: searchedRecords.length
  })

  const pagedRecords = useMemo(() => {
    return getRecords(searchedRecords, pageInfo)
  }, [searchedRecords, pageInfo])

  async function createNewRecord(newRecord: Omit<ExampleRecord, '_id'>) {
    setRecords(records => records.concat([{
      ...newRecord,
      _id: faker.random.alphaNumeric(10)
    }]))
  }

  const editRecord = async (updatedRecord: ExampleRecord) => {
    setRecords(records => records.map(record => {
      if (record._id === updatedRecord._id) {
        return updatedRecord
      }

      return record
    }))
  }

  const deleteRecord = async (id: string | number) => {
    setRecords(records => records.filter(record => record._id !== id))
  }

  return <Container>
    <MaintenanceGrid
      idField="_id"
      nameField="name"
      name="Example Grid"
      columnDefinitions={columnDefinitions}
      records={pagedRecords}
      pageInfo={pageInfo}
      onPageInfoChange={setPageInfo}
      onCreate={createNewRecord}
      onEdit={editRecord}
      onSearch={setSearch}
      onDelete={deleteRecord}
      formFieldDefinition={formFieldDefinition}
    />
  </Container>
}

function getRecords(records: ExampleRecord[], pageInfo: PageInfo): ExampleRecord[] {
  return records.slice((pageInfo.page - 1) * pageInfo.pageSize, (pageInfo.page * pageInfo.pageSize) - 1)
}
