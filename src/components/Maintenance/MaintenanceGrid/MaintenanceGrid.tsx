import React from 'react'
import MaintenanceContainer from '../components/MaintenanceContainer'
import { ColumnDefinition, PageInfo, SubType } from '../../../definitions'
import DataGrid, { DataGridProps } from '../../DataGrid/DataGrid'
import styled from '../../../theme-styled'
import GridControls from './components/GridControls'

export interface MaintenanceGridProps<T> {
  name: string
  idField: keyof SubType<T, string | number>
  nameField: keyof SubType<T, string>
  records: T[],
  columnDefinitions: ColumnDefinition<T>[]
  pageInfo?: PageInfo
  onPageInfoChange?: (pageInfo: PageInfo) => void
  loading?: boolean
  getFullRecord?: (id: string) => Promise<T>
  onCreate?: (record: T) => Promise<void>
  onEdit?: (record: T) => Promise<void>
  onDelete?: (id: string) => Promise<void>
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`

const Toolbar = styled.div`

`

const MaintenanceGrid = <T extends any>(props: MaintenanceGridProps<T>) => {
  const { idField, records, columnDefinitions, pageInfo, onPageInfoChange } = props

  const onEditClick = (id: string) => void {

  }

  const controls = getControls(props)

  const columnsWithControls = controls ? [controls].concat(columnDefinitions) : columnDefinitions

  const gridProps: DataGridProps<T> = {
    idField,
    data: records,
    columnDefinitions: columnsWithControls,
    pageInfo,
    onPageInfoChange,
    selectionMode: 'single'
  }

  return <MaintenanceContainer name={`${props.name} Maintenance`}>
    <Container>
      <DataGrid {...gridProps} />
    </Container>
  </MaintenanceContainer>
}

function getControls<T extends any>(props: MaintenanceGridProps<T>): ColumnDefinition<T> | undefined {
  if (!props.onEdit || !props.onDelete) {
    return
  }
  return {
    key: 'controls',
    width: 2,
    format: (record: T) => <GridControls idField={props.idField} record={record} onEdit={props.onEdit} onDelete={props.onDelete} />
  }
}


export default MaintenanceGrid
