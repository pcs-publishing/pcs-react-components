import React, { useCallback, useEffect } from 'react'
import { Segment, Icon, SemanticICONS, SemanticCOLORS } from 'semantic-ui-react'
import { FileUpload, FileUploadStatus } from '../definitions'
import styled from '../../../theme-styled'

interface UploadItemProps {
  upload: FileUpload
  onClose: (upload: FileUpload) => void
  closeAfterMs?: number
}

const CloseIconContainer = styled.div`
  float: right;
  cursor: pointer;
`

const Filename = styled.span`
  font-size: 1.1em;
  font-weight: bold;
`

const Message = styled.span`
  padding-left: 5px;
`

const UploadItem = (props: UploadItemProps) => {
  const { upload, onClose, closeAfterMs } = props
  const { name, status } = upload

  const close = useCallback(() => {
    onClose(upload)
  }, [upload, onClose])

  useEffect(() => {
    if (status === FileUploadStatus.UPLOADED) {
      setTimeout(close, closeAfterMs ?? 1000)
    }
  }, [status, close, closeAfterMs])

  const allowClose =
    status === FileUploadStatus.FAILED || status === FileUploadStatus.REJECTED

  return (
    <Segment color={getBackgroundColorForStatus(status)} inverted secondary>
      <Icon size="large" {...getIconPropsForStatus(status)} />
      <Filename>{name}</Filename>
      {props.upload.message ? (
        <Message>- {props.upload.message}</Message>
      ) : null}
      {allowClose ? (
        <CloseIconContainer>
          <Icon floated="right" name="close" onClick={close} />
        </CloseIconContainer>
      ) : null}
    </Segment>
  )
}

export default UploadItem

function getIconPropsForStatus(
  status: FileUploadStatus
): { name: SemanticICONS; loading?: boolean; color?: SemanticCOLORS } {
  switch (status) {
    case FileUploadStatus.ACCEPTED:
      return { name: 'spinner', loading: true }
    case FileUploadStatus.FAILED:
      return { name: 'close', color: 'red' }
    case FileUploadStatus.REJECTED:
      return { name: 'ban', color: 'red' }
    case FileUploadStatus.UPLOADED:
      return { name: 'check', color: 'green' }
  }
}

function getBackgroundColorForStatus(
  status: FileUploadStatus
): SemanticCOLORS | undefined {
  switch (status) {
    case FileUploadStatus.REJECTED:
    case FileUploadStatus.FAILED:
      return 'red'
    case FileUploadStatus.UPLOADED:
      return 'green'
    default:
      return
  }
}
