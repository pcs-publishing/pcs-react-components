import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { DropdownProps, Dropdown, DropdownItemProps } from 'semantic-ui-react'
import useDebouncedCallback from '../../hooks/useDebouncedCallback'
import _ from 'lodash'

export interface LazyDropdownProps {
  dropdownProps?: DropdownProps
  searchForRecords: (search: string) => Promise<any[]>
  getSelectedRecords: (ids: any[]) => Promise<any[]>
  recordIdProp: string
  recordTextProp: string
  searchDelay?: number
}

const LazyDropdown = (props: LazyDropdownProps) => {
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

  return (
    <Dropdown
      {...props.dropdownProps}
      loading={loading}
      search={onSearchFn}
      options={getOptions(props, records)}
      multiple={true}
    />
  )
}

export default LazyDropdown

function getOptions(
  props: LazyDropdownProps,
  records: any[]
): { text: string; value: any }[] {
  return records.map((record) => {
    return {
      text: record[props.recordTextProp],
      value: record[props.recordIdProp]
    }
  })
}
