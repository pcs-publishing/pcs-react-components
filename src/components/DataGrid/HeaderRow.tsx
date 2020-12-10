import React from 'react'
import { ColumnDefinition, SortDirection } from '../../definitions'
import { Table } from 'semantic-ui-react'
import { formatColumnName } from '../../services/FormatColumnService'

interface HeaderRowProps<T, U> {
  columnDefinitions: ColumnDefinition<T, U>[]
  getSorted: (column: string) => SortDirection | undefined
  onSortClick: (column: string) => void
}

const HeaderRow = <T extends any, U extends string>(
  props: HeaderRowProps<T, U>
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
