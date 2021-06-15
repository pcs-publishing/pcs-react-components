import React from 'react'
import styled from '../../theme-styled'
import Swatch from '../Styled/Swatch'
import DragDropList, { DragDropListProps } from './DragDropList'

export default {
  title: 'Drag Drop List',
  component: DragDropList
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

  const props: DragDropListProps<ColorRecord> = {
    itemComponent: (props: { record: ColorRecord }) => <Color color={props.record.color} />,
    records: records,
    idProperty: 'color',
  }

  return (
    <Container>
      <DragDropList {...props} />
    </Container>
  )
}
