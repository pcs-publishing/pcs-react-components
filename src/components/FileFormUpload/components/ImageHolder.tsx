import React, { useCallback, useState } from 'react'
import styled from '../../../theme-styled'
import CenteredImage from '../../Image/CenteredImage'
import { Icon } from 'semantic-ui-react'
import Confirm from '../../Popups/Confirm'
import { FileData, FileFormDefinition } from '../FileFormUpload'
import FileForm from './FileForm'

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
  const { file } = fileData

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
      <FileForm
        fileData={fileData}
        fileFormDefinitions={fileFormDefinitions}
        onChangeForm={onChangeForm}
      />
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

export default ImageHolder
