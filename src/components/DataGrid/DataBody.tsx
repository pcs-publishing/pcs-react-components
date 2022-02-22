import React from 'react'
import { ColumnDefinition } from '../../definitions'
import styled, { FlattenSimpleInterpolation } from 'styled-components'
import { TableBody } from '../Semantic-Themed/Table'
import DataRow from './DataRow'
import _ from 'lodash'

interface TableBodyProps {
  $height: string
}

interface DataBodyProps<T> {
  records: T[]
  height?: number
  isRecordSelected: (record: T) => boolean
  columnDefinitions: ColumnDefinition<T>[]
  onRowClick: (record: T, isMultiSelect: boolean) => void
  contextMenu?: string
  allowContextMenu?: (record: T) => boolean
  mapContextMenuProps?: (record: T) => { [key: string]: any }
  onRowDoubleClick?: (record: T) => void
  getRowStyle?: (record: T) => FlattenSimpleInterpolation
  autoSize?: boolean
}

const StyledTableBody = styled(TableBody) <TableBodyProps>`
  display: block;
  overflow-y: auto;
  width: 100%;
  ${props => props.autosize !== false ? `max-height: ${props.$height};` : ''}
`

const DataBody = <T extends any>(props: DataBodyProps<T>) => {
  const { records, isRecordSelected } = props
  const height: string = isNaN(parseFloat(props.height?.toString() || '')) ? '100%' : `${props.height}px`

  const rowProps = _.pick(props, [
    'columnDefinitions',
    'onRowClick',
    'contextMenu',
    'allowContextMenu',
    'mapContextMenuProps',
    'onRowDoubleClick',
    'getRowStyle'
  ])

  return (
    <StyledTableBody $height={height}>
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
    </StyledTableBody>
  )
}

export default DataBody
