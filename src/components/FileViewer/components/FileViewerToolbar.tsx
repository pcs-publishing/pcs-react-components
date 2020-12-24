import React from 'react'
import FileUploader from './FileUploader'
import styled from '../../../theme-styled'
import { FileViewerToolbarProps } from '../definitions'

const Container = styled.div`
  padding: 5px 10px 0px 10px;
  height: 45px;
`

const AdditionalItemsContainer = styled.div`
  padding-left: 5px;
  float: right;
`

const UploaderContainer = styled.div`
  display: inline-block;
`

const Uploader = styled(FileUploader)`
  width: 700px;
  margin-left: 10px;
`

const FileViewerToolbar = (props: FileViewerToolbarProps) => {
  return (
    <Container>
      <UploaderContainer>
        <Uploader
          onUpload={props.onUpload}
          acceptedMimeTypes={props.acceptedMimeTypes}
          typeOfFile={props.typeOfFile}
          maxFileSize={props.maxFileSize}
        />
      </UploaderContainer>
      <AdditionalItemsContainer>
        {props.toolbarItems || []}
      </AdditionalItemsContainer>
    </Container>
  )
}

export default FileViewerToolbar
