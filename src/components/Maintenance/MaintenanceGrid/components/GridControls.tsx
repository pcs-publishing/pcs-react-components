import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { SubType } from '../../../../definitions'
import styled from '../../../../theme-styled'
import Confirm from '../../../Popups/Confirm'

interface GridControls<T> {
  record: T
  onEdit?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  idField: keyof SubType<T, string | number>
  nameField: keyof SubType<T, string>
}

const Container = styled.div`
  width: 100%;
  text-align: center;
`

const GridControls = <T extends any>(props: GridControls<T>) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
  const close = () => setShowDeleteConfirm(false)

  const id = (props.record[props.idField]) as unknown as string | number
  const name = props.record[props.nameField] as unknown as string

  return <Container>
    <Confirm
      open={showDeleteConfirm}
      close={close}
      title="Are you sure?"
      message={`Are you sure you want to delete ${name}`}
      onConfirmCallback={() => props.onDelete && props.onDelete(id)}
    />
    {props.onEdit ? <Button color="blue" icon="pencil" /> : null}
    {props.onDelete ? <Button color="red" icon="trash" onClick={() => setShowDeleteConfirm(true)} /> : null}
  </Container>
}

export default GridControls
