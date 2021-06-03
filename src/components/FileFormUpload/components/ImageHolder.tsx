import React, { useCallback, useState } from 'react'
import styled from '../../../theme-styled'
import CenteredImage from '../../Image/CenteredImage'
import { Form, Icon } from 'semantic-ui-react'
import Confirm from '../../Popups/Confirm'
import { FileData, FileFormDefinition } from '../FileFormUpload'
import Dropdown from '../../Dropdown'
import Input from '../../Input'
import TextArea from '../../TextArea'

interface ImageContainerProps {
  fileData: FileData
  fileFormDefinitions?: FileFormDefinition[]
  onDelete?: () => void
  onChangeForm?: (key: string, value: any) => void
  maxImageWidth?: number
  maxImageHeight?: number
}

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 10px 5px 10px;
`

const CenteredImageContainer = styled.div`
  position: relative;
`

const StyledIcon = styled(Icon)`
  position: absolute !important;
  right: -20px !important;
  top: 0px !important;
  z-index: 10 !important;
  cursor: pointer !important;
`

const ImageHolder = ({
  fileData,
  fileFormDefinitions,
  onDelete,
  onChangeForm,
  maxImageHeight,
  maxImageWidth
}: ImageContainerProps) => {
  const { file, data } = fileData

  const [confirm, setConfirm] = useState(false)

  const onConfirmDelete = useCallback(() => {
    setConfirm(false)
    if (onDelete) {
      onDelete()
    }
  }, [setConfirm, onDelete])

  return (
    <ImageContainer>
      <CenteredImageContainer>
        {onDelete ? (
          <StyledIcon
            name="trash"
            size="large"
            circular
            inverted
            color="red"
            onClick={() => setConfirm(true)}
          />
        ) : null}

        <CenteredImage
          src={URL.createObjectURL(file)}
          alt={file.name}
          maxHeight={maxImageHeight ?? 300}
          maxWidth={maxImageWidth ?? 300}
        />
      </CenteredImageContainer>
      {generateFileForm(data, fileFormDefinitions, onChangeForm)}
      {onDelete ? (
        <Confirm
          close={() => setConfirm(false)}
          message={`Are you sure you want to delete ${file.name}?`}
          open={confirm}
          title="Delete File"
          confirmButtonColor="red"
          onConfirmCallback={onConfirmDelete}
        />
      ) : null}
    </ImageContainer>
  )
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
          options={[{ key: 1, text: 'Option 1', value: 'option1' }]}
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

export default ImageHolder
