import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from '../../theme-styled'
import { DroppableId } from './DragDropAssignment'
import DraggableElement from './DraggableElement'
import { toString } from 'lodash'
import { SubType } from '../../definitions'
import { Header, Input } from 'semantic-ui-react'

const Container = styled.div<{ listWidth: number }>`
  width: ${(props) => props.listWidth}px;
  margin: 5px;
`

const List = styled.div<{ isDraggingOver: boolean }>`
  padding: 5px;
  min-height: 120px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;

  ${(props) => {
    if (props.isDraggingOver) {
      return props.theme.dragOverOutline
    }
  }}
`

interface DragDropListProps<T> {
  id: DroppableId
  recordIdProperty: keyof SubType<T, string>
  recordNameProperty: keyof SubType<T, string>
  title: string
  records: T[]
  selected: boolean
  listWidth?: number
  getRecordComponent?: (
    record: T,
    selected: boolean
  ) => string | React.ReactElement
  onSearch: (id: DroppableId, value: string) => void
  allowSearch: boolean
}

const DragDropList = <T extends any>(props: DragDropListProps<T>) => {
  return (
    <Container listWidth={props.listWidth || 220}>
      {props.allowSearch ? (
        <Input
          placeholder="Search..."
          onChange={(e) => props.onSearch(props.id, e.target.value)}
          icon="search"
        />
      ) : null}
      <Header size="small" textAlign="center">
        {props.title}
      </Header>
      <Droppable droppableId={props.id}>
        {(provided, snapshot) => {
          return (
            <List
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
              {...provided.droppableProps}
            >
              {props.records.map((record, index) => (
                <DraggableElement
                  key={toString(record[props.recordIdProperty])}
                  record={record}
                  recordIdProperty={props.recordIdProperty}
                  recordNameProperty={props.recordNameProperty}
                  getRecordComponent={props.getRecordComponent}
                  index={index}
                  selected={props.selected}
                />
              ))}
              {provided.placeholder}
            </List>
          )
        }}
      </Droppable>
    </Container>
  )
}

export default DragDropList
