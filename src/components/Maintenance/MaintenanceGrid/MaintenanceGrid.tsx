import React, { useState } from 'react'
import MaintenanceContainer from '../components/MaintenanceContainer'
import { ColumnDefinition, PageInfo, SubType } from '../../../definitions'
import DataGrid, { DataGridProps } from '../../DataGrid/DataGrid'
import styled from '../../../theme-styled'
import GridControls from './components/GridControls'
import CreateEditFormModal from './components/CreateEditFormModal'
import Button from '../../Button'
import { FieldDefinition } from '../../Form/AutoForm/definitions'
import SearchBar from '../../SearchBar'
import { ReactElement } from 'react';

export interface MaintenanceGridProps<T> {
  name: string
  idField: keyof SubType<T, string | number>
  nameField: keyof SubType<T, string>
  records: T[],
  columnDefinitions: ColumnDefinition<T>[]
  pageInfo?: PageInfo
  onPageInfoChange?: (pageInfo: PageInfo) => void
  loading?: boolean
  getFullRecord?: (id: string | number) => Promise<T>
  onCreate?: (record: T) => Promise<void>
  onFormOpen?: (record: T) => void
  onEdit?: (record: T) => Promise<void>
  onDelete?: (id: string | number) => Promise<void>
  onSearch?: (search: string) => void
  formFieldDefinition?: FieldDefinition[]
  toolbar?: React.ReactElement
  toolbarClassName?: string
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`


const GridContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
`

const Toolbar = styled.div`
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
`

const MaintenanceGrid = <T extends any>(props: MaintenanceGridProps<T>) => {
  const { idField, records, columnDefinitions, pageInfo, onPageInfoChange } = props
  const [openCreateEditModal, setOpenCreateEditModal] = useState(false)
  const [editRecord, setEditRecord] = useState<T | undefined>(undefined)

  const onEditClick = async (id: string | number) => {
    let record: T | undefined

    if (props.getFullRecord) {
      record = await props.getFullRecord(id)
    } else {
      record = records.find(r => (r[idField] as unknown as string | number) === id)
    }

    if (record) {
      setEditRecord(record)
      setOpenCreateEditModal(true)
    }
  }

  const onCreateClick = () => {
    setEditRecord(undefined)
    setOpenCreateEditModal(true)
  }


  const controls = getControls(props, onEditClick)

  const columnsWithControls = controls ? [controls].concat(columnDefinitions) : columnDefinitions

  const gridProps: DataGridProps<T> = {
    idField,
    data: records,
    columnDefinitions: columnsWithControls,
    pageInfo,
    onPageInfoChange,
    selectionMode: 'single'
  }

  return <>
    <MaintenanceContainer name={`${props.name} Maintenance`}>
      <Container>
        <Toolbar>
          {props.onCreate && <Button primary onClick={onCreateClick} content={`Create ${props.name}`} />}
          <div className={props.toolbarClassName}>
            {props.toolbar}
            {props.onSearch && <SearchBar onSearchChange={props.onSearch} placeholder="Search" />}
          </div>
        </Toolbar>
        <GridContainer>
          <DataGrid {...gridProps} />
        </GridContainer>
      </Container>
    </MaintenanceContainer>
    <CreateEditFormModal
      onCreate={props.onCreate}
      onEdit={props.onEdit}
      recordToEdit={editRecord}
      fieldDefinition={props.formFieldDefinition || []}
      name={props.name} idField={idField}
      open={openCreateEditModal}
      onOpen={props.onFormOpen}
      onClose={() => setOpenCreateEditModal(false)}
    />
  </>
}

function getControls<T extends any>(props: MaintenanceGridProps<T>, onEditClick: (id: string | number) => void): ColumnDefinition<T> | undefined {
  if (!props.onEdit && !props.onDelete) {
    return
  }
  return {
    key: 'controls',
    title: '',
    width: 2,
    sortable: false,
    format: (record: T) => <GridControls idField={props.idField} nameField={props.nameField} record={record} onEdit={onEditClick} onDelete={props.onDelete} />
  }
}


export default MaintenanceGrid
