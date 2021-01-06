import React from 'react'
import { ColumnDefinition, SortDirection } from '../../definitions'
import { Table } from 'semantic-ui-react'
import { formatColumnName } from '../../services/FormatColumnService'

interface HeaderRowProps<T> {
  columnDefinitions: ColumnDefinition<T>[]
  getSorted: (column: string) => SortDirection | undefined
  onSortClick: (column: string) => void
}

const HeaderRow = <T extends any>(
  props: HeaderRowProps<T>
) => {
  const { columnDefinitions, getSorted, onSortClick } = props
  return (
    <Table.Header>
      <Table.Row>
        {columnDefinitions.map((columnDefinition, index) => {
          const keyString = columnDefinition.key as string
          return (
            <Table.HeaderCell
              sorted={getSorted(keyString)}
              onClick={() => onSortClick(keyString)}
              key={`header-${keyString}-${index}`}
              width={columnDefinition.width ?? 4}
            >
              {formatColumnName(columnDefinition)}
            </Table.HeaderCell>
          )
        })}
      </Table.Row>
    </Table.Header>
  )
}

export default HeaderRow
