import React from 'react'
import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd'
import styled from '../../theme-styled'
import { SubType } from '../../definitions'

const StyledDragItem = styled.div<{
  selected: boolean
  isDragging: boolean
  droppable: boolean
}>`
  ${(props) =>
    props.selected && !props.isDragging
      ? `
      background-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.text.onPrimary};
    `
      : `background-color: ${props.theme.colors.base};`}

  padding: 10px;
  text-align: center;
  margin-bottom: 5px;
  width: 100%;
  display: block;
  user-select: none;

  ${props => props.theme.border}

  ${(props) =>
    props.isDragging
      ? `
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    `
      : ''}
`

interface DraggableElementProps<T> {
  record: T
  recordIdProperty: keyof SubType<T, string>
  recordNameProperty: keyof SubType<T, string>
  index: number
  selected: boolean
  getRecordComponent?: (
    record: T,
    selected: boolean
  ) => string | React.ReactElement
}

const DraggableElement = <T extends any>(props: DraggableElementProps<T>) => {
  const id = props.record[props.recordIdProperty] as unknown

  return (
    <Draggable draggableId={id as string} index={props.index}>
      {(provided, snapshot) => {
        const dragComponentProps = {
          ref: provided.innerRef,
          selected: props.selected,
          droppable: canDrop(snapshot),
          isDragging: snapshot.isDragging,
          ...provided.draggableProps,
          ...provided.dragHandleProps
        }

        let value: string | React.ReactElement
        if (props.getRecordComponent) {
          value = props.getRecordComponent(props.record, props.selected)
        } else {
          value = (props.record[props.recordNameProperty] as unknown) as string
        }
        return <StyledDragItem {...dragComponentProps}>{value}</StyledDragItem>
      }}
    </Draggable>
  )
}

function canDrop(snapshot: DraggableStateSnapshot): boolean {
  return (
    snapshot.isDragging && !snapshot.isDropAnimating && !!snapshot.draggingOver
  )
}

export default DraggableElement
