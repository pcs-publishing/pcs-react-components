import {
  ColumnDefinition,
  SortDirection,
  ColumnValueType
} from '../definitions'
import _ from 'lodash'
import { isValid } from 'date-fns'

/**
 * Sort the data on the passed column
 *
 * @param data The data to sort
 * @param sortColumn The column to sort by
 * @param columnDefinitions The definitions for the columns
 * @param [direction='ascending'] The direction to sort in
 *
 * @return The sorted data
 */
export function sortData<T, U>(
  data: T[],
  sortColumn: string,
  columnDefinitions: ColumnDefinition<T, U>[],
  direction: SortDirection = 'ascending'
): T[] {
  if (!sortColumn) {
    return data
  }

  const columnDefinition = getDefinitionForColumn(sortColumn, columnDefinitions)

  if (!columnDefinition) {
    return data
  }

  return sortDataByColumn(data, columnDefinition, direction)
}

/**
 * @private
 *
 * Sort data by column
 *
 * @param data The data to sort
 * @param columnDefinition The definition of the column to sort by
 * @param direction The direction to sort in
 *
 * @return The sorted data
 */
function sortDataByColumn<T, U>(
  data: T[],
  columnDefinition: ColumnDefinition<T, U>,
  direction: SortDirection
): T[] {
  const sorted = _.sortBy(data, (dataItem) => {
    return getSortValue(dataItem, columnDefinition)
  })

  return direction === 'descending' ? _.reverse(sorted) : sorted
}

/**
 * Get the value to sort by for the passed record and column definition
 *
 * @param record The record to get the value to sort by for
 * @param columnDefinition The column that is being sorted
 *
 * @return The value to sort by for this record
 */
function getSortValue<T, U>(
  record: T,
  columnDefinition: ColumnDefinition<T, U>
): unknown {
  const value = record[columnDefinition.key as keyof T]

  if (columnDefinition.beforeSort) {
    return columnDefinition.beforeSort(record)
  }
  if (columnDefinition.type) {
    return formatValueForSortingByType(value, columnDefinition.type)
  }
  return value
}

/**
 * Format a value based on the passed column value type
 *
 * @param value The value to format by type
 * @param type The type to format the value into for sorting
 *
 * The value formatted for sorting based on the column value type
 */
function formatValueForSortingByType(
  value: unknown,
  type: ColumnValueType
): unknown {
  switch (type) {
    case 'date':
    case 'datetime':
      return convertValueToDate(value)
    default:
      return value
  }
}

/**
 * Get the column definition for the passed column name
 * @param columnName
 * @param definitions
 */
function getDefinitionForColumn<T, U>(
  columnName: string,
  definitions: ColumnDefinition<T, U>[]
): ColumnDefinition<T, U> | undefined {
  return _.find(definitions, (definition) => definition.key === columnName)
}

function convertValueToDate(value: unknown): Date | unknown {
  if (_.isDate(value) || !_.isString(value)) return value
  const date = new Date(value)
  return isValid(date) ? date : value
}
