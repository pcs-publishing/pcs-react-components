import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styled from '../../theme-styled'
import CenteredImage from '../Image/CenteredImage'
import FailedToLoadError from '../FailedToLoadError'

export interface FilePreviewProps {
  previewImageUrl: string
  fileDownloadUrl?: string
  onClick?: () => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
`

const PreviewContainer = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: auto;
  text-align: center;
  border-radius: 3px;
  min-width: 0;
`

const DownloadButtonContainer = styled.div`
  float: right;
  padding: 5px;
`

const Toolbar = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
`

const FilePreview = (props: FilePreviewProps) => {
  return (
    <Container>
      {props.fileDownloadUrl ? (
        <Toolbar>
          <DownloadButtonContainer>
            <Button size="tiny" compact>
              <a href={props.fileDownloadUrl}>
                <Icon name="download" />
              </a>
            </Button>
          </DownloadButtonContainer>
        </Toolbar>
      ) : null}
      <PreviewContainer>
        <CenteredImage
          src={props.previewImageUrl}
          alt="file-preview"
          maxHeight="100%"
          maxWidth="100%"
          onClick={() => {
            if (props.onClick) {
              props.onClick()
            }
          }}
          fallback={<FailedToLoadError name="image" />}
        />
      </PreviewContainer>
    </Container>
  )
}

export default React.memo(FilePreview)
