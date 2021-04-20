import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { DropdownProps, Dropdown, DropdownItemProps, Form } from 'semantic-ui-react'
import useDebouncedCallback from '../../hooks/useDebouncedCallback'
import _ from 'lodash'
import { SubType } from '../../definitions'

export interface LazyDropdownProps<T> {
  recordIdProp: keyof SubType<T, string | number>
  searchForRecords: (search: string) => Promise<T[]>
  getSelectedRecords: (ids: any[]) => Promise<T[]>
  dropdownProps?: DropdownProps
  searchDelay?: number
  form?: boolean
  recordTextProp?: keyof SubType<T, string>
  getOptions?: (records: T[]) => DropdownItemProps[]
  className?: string
}

const LazyDropdown = <T extends unknown>(props: LazyDropdownProps<T>) => {
  const dropdownProps = useMemo(() => props.dropdownProps || {}, [props])
  const selectedValues = useMemo(
    () => (dropdownProps.value || []) as (string | number)[],
    [dropdownProps]
  )

  const [records, setRecords] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const { searchForRecords, getSelectedRecords, recordIdProp } = props

  const runSearch = useDebouncedCallback(
    async () => {
      setLoading(true)

      const searchResults = await searchForRecords(search)

      setLoading(false)

      setRecords((currentRecords: any[]) => {
        const selectedRecords = currentRecords.filter((r) =>
          selectedValues.includes(r[recordIdProp])
        )
        return _.uniqBy(selectedRecords.concat(searchResults), recordIdProp)
      })
    },
    [search, searchForRecords, selectedValues, recordIdProp],
    props.searchDelay || 300
  )

  useEffect(() => {
    getSelectedRecords(selectedValues).then((selectedRecords) => {
      setRecords((currentRecords) => {
        return _.uniqBy(currentRecords.concat(selectedRecords), recordIdProp)
      })
    })
  }, [selectedValues, getSelectedRecords, setRecords, recordIdProp])

  const onSearchFn = useCallback(
    (options: DropdownItemProps[], value: string): DropdownItemProps[] => {
      setSearch(value)
      if (runSearch) runSearch()
      return options
    },
    [runSearch]
  )

  const DropdownComponent = props.form ? Form.Dropdown : Dropdown

  let options: DropdownItemProps[] = []

  if (props.getOptions) {
    options = props.getOptions(records)
  } else {
    options = getOptions(props, records)
  }


  return (
    <DropdownComponent
      noResultsMessage={!search ? `Search for records...` : 'No results found'}
      {...props.dropdownProps}
      loading={loading}
      search={onSearchFn}
      options={options}
      className={props.className}
    />
  )
}

export default LazyDropdown

function getOptions<T>(
  props: LazyDropdownProps<T>,
  records: T[]
): DropdownItemProps[] {
  return records.map((record: T) => {
    const text = (record[props.recordTextProp as keyof T] as unknown) as string
    const value = (record[props.recordIdProp]) as unknown as string
    return { text, value }
  })
}
