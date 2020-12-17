import { useState, useCallback, useEffect } from 'react'
import { SelectionMode } from '../definitions'

interface RecordSelectionOptions<T> {
  records: T[]
  idField: keyof T
  selectionMode?: SelectionMode
  onRecordSelectionChange?: (records: T[]) => void
}
export interface SelectedRecordOptions {
  isMultiSelect?: boolean
  forceSelection?: boolean
}
interface RecordSelectionReturn<T> {
  selectedRecords: T[]
  selectRecord: (record: T, options?: SelectedRecordOptions) => void
  isRecordSelected: (record: T) => boolean
  clearSelected: () => void
}

export default function useRecordSelection<T>(
  options: RecordSelectionOptions<T>
): RecordSelectionReturn<T> {
  const { idField, selectionMode, records, onRecordSelectionChange } = options
  const [selectedRecords, setSelectedRecords] = useState<T[]>([])
  const handleRecordsChange = useCallback(
    (newSelection: T[]) => {
      if (onRecordSelectionChange) {
        onRecordSelectionChange(newSelection)
      }
    },
    [onRecordSelectionChange]
  )

  const selectRecord = useCallback(
    (selectedRecord: T, options?: SelectedRecordOptions) => {
      const selectionModeToUse = !!options?.isMultiSelect
        ? selectionMode
        : 'single'
      const forceSelection = options?.forceSelection

      setSelectedRecords((currentSelection) => {
        const newSelection = getNewSelection(
          currentSelection,
          selectedRecord,
          selectionModeToUse as SelectionMode,
          idField,
          forceSelection
        )

        handleRecordsChange(newSelection)

        return newSelection
      })
    },
    [setSelectedRecords, idField, handleRecordsChange, selectionMode]
  )
  // Whenever records change make sure that the selected records only contain those in the records array
  useEffect(() => {
    setSelectedRecords((currentSelection) => {
      return filterOutOldSelections(records, currentSelection, idField)
    })
  }, [records, setSelectedRecords, idField])

  const isRecordSelected = useCallback(
    (record: T) => recordExistsInList(selectedRecords, record, idField),
    [selectedRecords, idField]
  )

  const clearSelected = useCallback(() => {
    setSelectedRecords([])
  }, [setSelectedRecords])

  if (!selectionMode) {
    return {
      selectedRecords,
      selectRecord: () => {},
      isRecordSelected: () => false,
      clearSelected: () => {}
    }
  }
  return { selectedRecords, selectRecord, isRecordSelected, clearSelected }
}
function getNewSelection<T>(
  currentSelection: T[],
  selectedRecord: T,
  selectionMode: SelectionMode,
  idField: keyof T,
  forceSelection?: boolean
): T[] {
  const alreadySelected = recordExistsInList(
    currentSelection,
    selectedRecord,
    idField
  )
  if (forceSelection) {
    return [selectedRecord]
  }
  if (selectionMode === 'single') {
    return alreadySelected ? [] : [selectedRecord]
  }
  return alreadySelected
    ? removeRecordFromSelection(currentSelection, selectedRecord, idField)
    : addRecordToSelection(currentSelection, selectedRecord)
}

function addRecordToSelection<T>(selectedRecords: T[], record: T): T[] {
  return selectedRecords.concat([record])
}

function removeRecordFromSelection<T>(
  selectedRecords: T[],
  record: T,
  idField: keyof T
): T[] {
  return selectedRecords.filter(
    (selected) => selected[idField] !== record[idField]
  )
}

function filterOutOldSelections<T>(
  allRecords: T[],
  selectedRecords: T[],
  idField: keyof T
): T[] {
  return selectedRecords.filter((selectedRecord) => {
    return recordExistsInList(allRecords, selectedRecord, idField)
  })
}

function recordExistsInList<T>(
  list: T[],
  record: T,
  idField: keyof T
): boolean {
  return !!list.find((r) => record[idField] === r[idField])
}
