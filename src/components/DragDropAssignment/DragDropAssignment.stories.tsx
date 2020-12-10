import React from 'react'
import { SubType } from '../../definitions';
import styled from '../../theme-styled'
import Swatch from '../Styled/Swatch';
import DragDropAssignment from './DragDropAssignment';
import { DragDropAssignmentProps } from './DragDropAssignment';

export default {
  title: 'Drag Drop Assignment',
  component: DragDropAssignment
}

const Container = styled.div`
  width: 500px;
  padding: 10px;
`

interface ColorRecord {
  color: string
}

const Color = styled(Swatch)`
  width: 100%;
`

export const AssigningColors = () => {
   const records: ColorRecord[] = [
    {
      color: 'red'
    },
    {
      color: 'green'
    },
    {
      color: 'blue'
    },
    {
      color: 'yellow'
    },
    {
      color: 'orange'
    },
    {
      color: 'cyan'
    },
    {
      color: 'magenta'
    }
   ]
  
  const props: DragDropAssignmentProps<ColorRecord> = {
    getRecordComponent: (record: ColorRecord) => (
      <Color color={record.color} />
    ),
    initiallySelectedRecords: [records[0]],
    onChange: ((selected: ColorRecord[]) => console.log(selected)),
    records: records,
    recordIdProperty: 'color',
    recordNameProperty: 'color'
  }
  
  return (
    <Container>
      <DragDropAssignment {...props} />
    </Container>
  )
}
