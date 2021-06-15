import React from 'react'
import { SubType } from '../../definitions'

export interface DragDropListProps<T> {
  records: T[]
  idProperty: keyof SubType<T, string>
  itemComponent: React.FunctionComponent<{ record: T }>
  value: string[]
  onChange: (records: T[]) => void
  children?: React.ReactElement | React.ReactElement[]
  className?: string
}

const DragDropList = <T extends object>(props: DragDropListProps<T>) => {
  const ItemComponent = props.itemComponent
  return <div className={props.className}>
    {props.children}
    {props.records.map(record => <ItemComponent key={(record[props.idProperty] || '') as string} record={record} />)}
  </div>
}

export default DragDropList
