import React, { useCallback, useState } from 'react'
import FileFormUpload, { FileData } from './FileFormUpload'

export default {
  title: 'FileFormUpload',
  component: FileFormUpload
}

export const Example = () => {
  const [data, setData] = useState<FileData[]>([])
  const onDrop = useCallback(
    async (file: File) => {
      setData((p) => [...p, { data: {}, file }])
    },
    [setData]
  )

  const onDelete = useCallback(
    (i: number) => {
      setData((p) => p.filter((_, index) => index !== i))
    },
    [setData]
  )

  const onChangeForm = useCallback(
    (i: number, key: string, value: any) => {
      const newData = data.map((fileData, index) =>
        index === i ? { ...fileData, data: { [key]: value } } : fileData
      )
      setData(newData)
    },
    [setData, data]
  )

  return (
    <FileFormUpload
      label="Attach Image"
      uploadType="Image"
      onDrop={onDrop}
      onDelete={onDelete}
      fileData={data}
      fileFormDefinitions={[
        {
          label: 'Dropdown',
          type: 'dropdown',
          options: [{ key: 1, text: 'Option 1', value: 'option1' }],
          dataName: 'option'
        },
        { label: 'Name', type: 'input', dataName: 'name' }
      ]}
      onChangeForm={onChangeForm}
      maxImageHeight={250}
      maxImageWidth={250}
    />
  )
}
