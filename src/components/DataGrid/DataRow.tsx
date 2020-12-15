import React, { useCallback } from 'react'
import { ColumnDefinition } from '../../definitions'
import styled from '../../theme-styled'
import { Table } from 'semantic-ui-react'
import { formatColumnValue } from '../../services/FormatColumnService'
import { contextMenu } from 'react-contexify'
import _ from 'lodash'

interface RowColor {
  background: string
  text: string
}

interface DataRowProps<T, U> {
  record: T
  index: number
  columnDefinitions: ColumnDefinition<T, U>[]
  selected: boolean
  onRowClick: (record: T, isMultiSelect: boolean) => void
  contextMenu?: string
  allowContextMenu?: (record: T) => boolean
  mapContextMenuProps?: (record: T) => { [key: string]: any }
  onRowDoubleClick?: (record: T) => void
}

const Cell = styled(Table.Cell)<{ padding?: number }>`
  ${(props) =>
    _.isNumber(props.padding) ? `padding: ${props.padding}px !important;` : ''}
`

const TableRow = styled(Table.Row)<{ selected: boolean }>`
  :hover {
    background-color: rgba(0, 0, 0, 0.05)
  }

  ${(props) => {
    if (!props.selected) {
      return ''
    }
    return `
      background-color: ${props.theme.colors.primary} !important;
      color: ${props.theme.colors.text.onPrimary} !important;
    `
  }}
`

const DataRow = <T extends any, U extends string>(
  props: DataRowProps<T, U>
) => {
  const {
    record,
    selected,
    onRowClick,
    columnDefinitions,
    mapContextMenuProps,
    allowContextMenu,
    onRowDoubleClick
  } = props
  const contextMenuId = props.contextMenu as string

  const onClick = useCallback(
    (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement
      const isIcon = targetElement.classList.value.includes('icon')

      const isLeftClick = event.button === 0
      if (!isLeftClick || (isIcon && selected)) return

      onRowClick(record, event.ctrlKey)
    },
    [record, selected, onRowClick]
  )

  const onDoubleClick = useCallback(
    (event: MouseEvent) => {
      onRowClick(record, event.ctrlKey)
      if (onRowDoubleClick) {
        onRowDoubleClick(record)
      }
    },
    [onRowClick, record, onRowDoubleClick]
  )

  const onContextMenu = useCallback(
    (e: any) => {
      if (!selected) {
        onRowClick(record, e.ctrlKey as boolean)
      }

      let openContextMenu =
        !!contextMenuId && (!allowContextMenu || allowContextMenu(record))

      if (!openContextMenu) return

      const mapProps = mapContextMenuProps || ((record) => ({ record }))

      e.preventDefault()

      contextMenu.show({
        id: contextMenuId,
        event: e,
        props: mapProps(record)
      })
    },
    [
      onRowClick,
      contextMenuId,
      selected,
      record,
      allowContextMenu,
      mapContextMenuProps
    ]
  )

  return (
    <TableRow
      selected={selected}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
    >
      {columnDefinitions.map((columnDefinition, index) => {
        const value = formatColumnValue(record, columnDefinition, index)
        return (
          <Cell
            key={`${columnDefinition.key}-cell-${index}`}
            width={columnDefinition.width ?? 4}
            padding={columnDefinition.padding}
            textAlign={columnDefinition.center ? 'center' : 'left'}
          >
            {value}
          </Cell>
        )
      })}
    </TableRow>
  )
}

export default DataRow
