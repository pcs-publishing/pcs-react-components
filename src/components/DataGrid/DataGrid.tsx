import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
  RefObject
} from 'react'

import {
  ColumnDefinition,
  SortDirection,
  SelectionMode,
  PageInfo,
  SubType
} from '../../definitions'

import { Table } from 'semantic-ui-react'
import { sortData } from '../../services/SortService'
import styled, { FlattenSimpleInterpolation } from 'styled-components'
import HeaderRow from './HeaderRow'
import DataBody from './DataBody'
import DataPager from './DataPager'
import useRecordSelection from '../../hooks/useRecordSelection'
import ReactResizeDetector from 'react-resize-detector'
import LoadingMask from '../LoadingMask'
import { css } from '../../theme-styled'

export interface DataGridProps<T> {
  idField: keyof SubType<T, string | number>
  data: T[]
  columnDefinitions: ColumnDefinition<T>[]
  defaultSortColumn?: string
  defaultSortDirection?: SortDirection
  compact?: boolean
  selectionMode?: SelectionMode
  onSortChange?: (column: ColumnDefinition<T>, direction: SortDirection) => void
  contextMenu?: string
  allowContextMenu?: (record: T) => boolean
  mapContextMenuProps?: (record: T) => { [key: string]: any }
  pageInfo?: PageInfo
  onPageInfoChange?: (pageInfo: PageInfo) => void
  onSelectedRecordsChange?: (selectedRecords: T[]) => void
  loading?: boolean
  onDoubleClickRow?: (record: T) => void
  onRefreshClick?: () => void
  getRowStyle?: (record: T) => FlattenSimpleInterpolation
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
`

const TableCmp = styled(Table)`
  height: 100%;
  overflow: hidden;
  width: 100%;
`

const DataGrid = <T extends any>(props: DataGridProps<T>) => {
  const [sortedColumn, setSortedColumn] = useState<string>(
    props.defaultSortColumn || ''
  )
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    props.defaultSortDirection || 'ascending'
  )
  const containerRef = useRef<HTMLDivElement>()

  const onSelectedRecordsChange = useCallback(
    (records: T[]) => {
      if (props.onSelectedRecordsChange) {
        props.onSelectedRecordsChange(records)
      }
    },
    [props]
  )

  const { isRecordSelected, selectRecord } = useRecordSelection<T>({
    records: props.data,
    idField: (props.idField || '_id') as keyof T,
    selectionMode: props.selectionMode,
    onRecordSelectionChange: onSelectedRecordsChange
  })

  const hasPaging = isPagingEnabled(props.pageInfo)

  const columnDefinitions = props.columnDefinitions

  // Listen for changes to the sort fields, and call onSortChange with the values
  const customSortHandler = props.onSortChange

  const sortedColumnDefinition = columnDefinitions.find(
    (columnDefinition) => columnDefinition.key === sortedColumn
  )

  useEffect(() => {
    if (customSortHandler && sortedColumnDefinition) {
      customSortHandler(sortedColumnDefinition, sortDirection)
    }
  }, [customSortHandler, sortedColumnDefinition, sortDirection])

  let data = props.data

  // Sort the data on the client-side if there isn't a sort handler function
  if (!customSortHandler) {
    data = sortData(props.data, sortedColumn, columnDefinitions, sortDirection)
  }

  const getSorted = (column: string) =>
    sortedColumn === column ? sortDirection : undefined

  const onSortClick = (column: string) =>
    handleSortClick<T>(
      column,
      setSortedColumn,
      setSortDirection,
      columnDefinitions
    )

  const onGetRowStyle = (record: T) => {
    if (props.getRowStyle) {
      return props.getRowStyle(record)
    }
    return css``
  }

  const onRowDoubleClick = (record: T) => {
    if (props.onDoubleClickRow) {
      props.onDoubleClickRow(record)
    }
    selectRecord(record, { forceSelection: true })
  }

  const onRowClick = (record: T, isMultiSelect: boolean) => {
    selectRecord(record, { isMultiSelect })
  }

  return (
    <LoadingMask active={props.loading === true}>
      <Container ref={containerRef as RefObject<HTMLDivElement>}>
        <ReactResizeDetector>
          {() => (
            <TableCmp sortable fixed={true} compact={!!props.compact}>
              <HeaderRow
                columnDefinitions={columnDefinitions}
                getSorted={getSorted}
                onSortClick={onSortClick}
              />
              <DataBody
                records={data}
                height={calculateTableBodyHeight(
                  containerRef.current?.offsetHeight || 0,
                  hasPaging
                )}
                isRecordSelected={isRecordSelected}
                columnDefinitions={columnDefinitions}
                onRowClick={onRowClick}
                onRowDoubleClick={onRowDoubleClick}
                contextMenu={props.contextMenu}
                allowContextMenu={props.allowContextMenu}
                mapContextMenuProps={props.mapContextMenuProps}
                getRowStyle={onGetRowStyle}
              />

              {hasPaging ? (
                <DataPager
                  pageInfo={props.pageInfo}
                  onPageInfoChange={props.onPageInfoChange}
                  onRefreshClick={props.onRefreshClick}
                  loading={props.loading}
                />
              ) : null}
            </TableCmp>
          )}
        </ReactResizeDetector>
      </Container>
    </LoadingMask>
  )
}

export default DataGrid

function handleSortClick<T>(
  column: string,
  setSortedColumn: Dispatch<SetStateAction<string>>,
  setSortDirection: Dispatch<SetStateAction<SortDirection>>,
  columnDefinitions: ColumnDefinition<T>[]
) {
  const columnDefinition = columnDefinitions.find(({ key }) => key === column)

  if (!columnDefinition || columnDefinition.sortable === false) {
    return
  }
  setSortedColumn((currentColumn) => {
    if (currentColumn === column) {
      setSortDirection((currentSort) => {
        return currentSort === 'ascending' ? 'descending' : 'ascending'
      })
    }
    return column
  })
}

function calculateTableBodyHeight(
  containerHeight: number,
  pagingEnabled: boolean
): number {
  const HEADER_ROW_HEIGHT = 52
  const PAGER_HEIGHT = pagingEnabled ? HEADER_ROW_HEIGHT - 6 : 0

  return containerHeight - HEADER_ROW_HEIGHT - PAGER_HEIGHT
}

/**
 * Is paging enabled (will only show if there is more than one page)
 *
 * @param pageInfo The page info to use to determine if paging is enabled
 *
 * @return Whether paging is enabled or not
 */
function isPagingEnabled(pageInfo: PageInfo | undefined): boolean {
  return !!pageInfo
}
