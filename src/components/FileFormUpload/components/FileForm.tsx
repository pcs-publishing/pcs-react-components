import React from 'react'
import { Form } from 'semantic-ui-react'
import Dropdown from '../../Dropdown'
import Input from '../../Input'
import TextArea from '../../TextArea'
import { FileData, FileFormDefinition } from '../FileFormUpload'

interface FileFormProps {
  fileData: FileData
  fileFormDefinitions?: FileFormDefinition[]
  onChangeForm?: (key: string, value: any) => void
}

const FileForm = ({
  fileData,
  fileFormDefinitions,
  onChangeForm
}: FileFormProps) => {
  const { data } = fileData
  return generateFileForm(data, fileFormDefinitions, onChangeForm)
}

const generateFileForm = (
  data: { [key: string]: any },
  fileFormDefinitions?: FileFormDefinition[],
  onChangeForm?: (key: string, value: any) => void
) => {
  if (!fileFormDefinitions || !onChangeForm) return null
  return (
    <Form>
      {fileFormDefinitions.map((definition) =>
        getFileFormDefinitionComponent(definition, onChangeForm, data)
      )}
    </Form>
  )
}

const getFileFormDefinitionComponent = (
  fileFormDefintion: FileFormDefinition,
  onChangeForm: (key: string, value: any) => void,
  data: { [key: string]: any }
) => {
  const onChange = (value: any) =>
    onChangeForm(fileFormDefintion.dataName ?? fileFormDefintion.label, value)

  const value = data[fileFormDefintion.dataName ?? fileFormDefintion.label]

  switch (fileFormDefintion.type) {
    case 'dropdown':
      return (
        <Dropdown
          onChange={onChange}
          value={value}
          label={fileFormDefintion.label}
          options={fileFormDefintion.options ?? []}
        />
      )
    case 'input':
      return (
        <Input
          onChange={onChange}
          value={value}
          label={fileFormDefintion.label}
        />
      )
    case 'textarea':
      return (
        <TextArea
          value={value}
          label={fileFormDefintion.label}
          onChange={onChange}
        />
      )
  }
}

export default FileForm
