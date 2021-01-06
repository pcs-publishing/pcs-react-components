import React from 'react'
import { ColumnDefinition } from '../../definitions'
import styled from 'styled-components'
import { Table } from 'semantic-ui-react'
import DataRow from './DataRow'
import _ from 'lodash'

interface TableBodyProps {
  $height: string
}

interface DataBodyProps<T> {
  records: T[]
  height: number
  isRecordSelected: (record: T) => boolean
  columnDefinitions: ColumnDefinition<T>[]
  onRowClick: (record: T, isMultiSelect: boolean) => void
  contextMenu?: string
  allowContextMenu?: (record: T) => boolean
  mapContextMenuProps?: (record: T) => { [key: string]: any }
  onRowDoubleClick?: (record: T) => void
}

const TableBody = styled(Table.Body) <TableBodyProps>`
  display: block;
  overflow-y: auto;
  width: 100%;
  max-height: ${(props) => props.$height};
`

const DataBody = <T extends any>(
  props: DataBodyProps<T>
) => {
  const { records, isRecordSelected } = props
  const height: string = isNaN(props.height) ? '100%' : `${props.height}px`

  const rowProps = _.pick(props, [
    'columnDefinitions',
    'onRowClick',
    'contextMenu',
    'allowContextMenu',
    'mapContextMenuProps',
    'onRowDoubleClick'
  ])

  return (
    <TableBody $height={height}>
      {records.map((record, index) => {
        const selected = isRecordSelected(record)

        return (
          <DataRow
            key={`row-${_.get(record, '_id') || _.get(record, 'id') || index}`}
            index={index}
            record={record}
            selected={selected}
            {...rowProps}
          />
        )
      })}
    </TableBody>
  )
}

export default DataBody
