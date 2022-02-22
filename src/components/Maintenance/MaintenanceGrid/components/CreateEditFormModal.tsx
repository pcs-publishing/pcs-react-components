import React, { useEffect } from 'react'
import Modal, { ModalHeader, ModalContent } from '../../../Semantic-Themed/Modal'
import AutoForm from '../../../Form/AutoForm'
import { SubType } from '../../../../definitions'
import { FieldDefinition, FormValue } from '../../../Form/AutoForm/definitions'

interface CreatedEditFormModalProps<T> {
  name: string
  open: boolean
  idField: keyof SubType<T, string | number>
  fieldDefinition: FieldDefinition[]
  recordToEdit: T | undefined
  onOpen?: (value: T) => void
  onCreate?: (value: T) => Promise<void>
  onEdit?: (value: T) => Promise<void>
  onClose: () => void
}

const CreateEditFormModal = <T extends any>(props: CreatedEditFormModalProps<T>) => {
  const { recordToEdit, idField, name, fieldDefinition, onCreate, onEdit, onOpen, open, onClose } = props
  const onSave = (value: FormValue) => {
    const id = recordToEdit ? recordToEdit[idField] : null

    if (id) {
      if (onEdit) {
        onEdit({ ...value, [idField]: id } as unknown as T)
      }
    } else {
      if (onCreate) {
        onCreate(value as unknown as T)
      }
    }

    onClose()
  }

  useEffect(() => {
    if (open && onOpen && recordToEdit) {
      onOpen(recordToEdit)
    }
  }, [onOpen, open, recordToEdit])

  const isCreate = !recordToEdit

  return <Modal open={open} size="tiny">
    <ModalHeader>
      {isCreate ? `Create ${name}` : `Edit ${name}`}
    </ModalHeader>
    <ModalContent>
      <AutoForm defaultValue={recordToEdit as FormValue} fields={fieldDefinition} onSave={onSave} onCancel={onClose} />
    </ModalContent>
  </Modal>
}

export default CreateEditFormModal
