import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import DragDropList from './DragDropList'
import { SubType } from '../../definitions'
import LoadingMask from '../LoadingMask'
import _ from 'lodash'

export interface DragDropAssignmentProps<T> {
  records: T[]
  initiallySelectedRecords?: T[]
  onChange: (selected: T[]) => void
  allowSearch?: boolean
  recordIdProperty: keyof SubType<T, string>
  recordNameProperty: keyof SubType<T, string>
  getRecordComponent?: (
    record: T,
    selected: boolean
  ) => string | React.ReactElement
  unselectedListHeader?: string
  selectedListHeader?: string
  className?: string
  loading?: boolean
  listWidth?: number
  fieldsToSearch?: keyof T[]
}

interface AssignmentState<T> {
  unselected: T[]
  selected: T[]
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: center;
`

export type DroppableId = 'selected' | 'unselected'

const DragDropAssignment = <T extends any>(
  props: DragDropAssignmentProps<T>
) => {
  const {
    onChange,
    records,
    initiallySelectedRecords,
    recordIdProperty,
    allowSearch
  } = props
  const [assignmentState, setAssignmentState] = useState(
    getInitialAssignmentState(
      records || [],
      initiallySelectedRecords || [],
      recordIdProperty
    )
  )

  const [appliedInitialValue, setAppliedInitialValue] = useState(
    !!props.initiallySelectedRecords
  )

  useEffect(() => {
    if (!appliedInitialValue && initiallySelectedRecords && records) {
      setAssignmentState(
        getInitialAssignmentState(
          records,
          initiallySelectedRecords,
          recordIdProperty
        )
      )
      setAppliedInitialValue(true)
    }
  }, [
    records,
    recordIdProperty,
    initiallySelectedRecords,
    appliedInitialValue,
    setAssignmentState
  ])

  const onDragEnd = useCallback(
    (dropResult: DropResult) => {
      if (!isValidDrop(dropResult)) {
        return
      }

      setAssignmentState((currentAssignmentState) => {
        const newState = {
          unselected: Array.from(currentAssignmentState.unselected),
          selected: Array.from(currentAssignmentState.selected)
        }

        const sourceListId = dropResult.source.droppableId as DroppableId
        const destinationListId = dropResult.destination
          .droppableId as DroppableId

        // Remove dragged record from the source list
        const draggedRecords = newState[sourceListId].splice(
          dropResult.source.index,
          1
        )

        // Add the dragged record to the destination list in the target position
        newState[destinationListId].splice(
          dropResult.destination.index,
          0,
          ...draggedRecords
        )

        onChange(newState.selected)

        return newState
      })
    },
    [setAssignmentState, onChange]
  )

  const onChangeSearch = useCallback(
    (id: DroppableId, value: string) => {
      const regex = new RegExp(value, 'i')
      const filteredAssignmentState = assignmentState[id].filter((row: any) =>
        _.some(props.fieldsToSearch as any, (value: string) =>
          regex.test(row[value])
        )
      )
      if (value) {
        setAssignmentState((p) => ({ ...p, [id]: filteredAssignmentState }))
      } else {
        setAssignmentState(
          getInitialAssignmentState(
            records || [],
            initiallySelectedRecords || [],
            recordIdProperty
          )
        )
      }
    },
    [
      setAssignmentState,
      getInitialAssignmentState,
      records,
      initiallySelectedRecords,
      recordIdProperty
    ]
  )

  const commonDragDropListProps = {
    recordIdProperty: props.recordIdProperty,
    recordNameProperty: props.recordNameProperty,
    getRecordComponent: props.getRecordComponent,
    listWidth: props.listWidth,
    onSearch: onChangeSearch,
    allowSearch: allowSearch!!
  }

  return (
    <LoadingMask active={!!props.loading}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container className={props.className}>
          <DragDropList
            id="unselected"
            title={props.unselectedListHeader || 'Unselected'}
            records={assignmentState.unselected}
            selected={false}
            {...commonDragDropListProps}
          />

          <DragDropList
            id="selected"
            title={props.selectedListHeader || 'Selected'}
            records={assignmentState.selected}
            selected={true}
            {...commonDragDropListProps}
          />
        </Container>
      </DragDropContext>
    </LoadingMask>
  )
}

function getInitialAssignmentState<T>(
  records: T[],
  selectedRecords: T[],
  idProperty: keyof SubType<T, string>
): AssignmentState<T> {
  const selectedIds = selectedRecords.map((r) => r[idProperty])
  return {
    unselected: records.filter((r: T) => !selectedIds.includes(r[idProperty])),
    selected: selectedRecords
  }
}

function isValidDrop(
  dropResult: DropResult
): dropResult is Required<DropResult> {
  if (!dropResult.destination) return false

  return (
    dropResult.destination.droppableId !== dropResult.source.droppableId ||
    dropResult.destination.index !== dropResult.source.index
  )
}

export default DragDropAssignment
