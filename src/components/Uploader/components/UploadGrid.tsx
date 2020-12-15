import React from 'react'
import { FileUpload } from '..'
import UploadItem from './UploadItem'
import { Segment } from 'semantic-ui-react'
import styled from '../../../theme-styled'

interface UploadGridProps {
  uploads: FileUpload[]
  onUploadClose: (file: FileUpload) => void
}

const UploadGroup = styled(Segment.Group)`
  z-index: 1000;
`

const UploadGrid = (props: UploadGridProps) => {
  const show = props.uploads.length > 0

  if (!show) return null

  return (
    <UploadGroup raised>
      {props.uploads.map((upload) => {
        return (
          <UploadItem
            key={upload.name}
            upload={upload}
            onClose={props.onUploadClose}
          />
        )
      })}
    </UploadGroup>
  )
}

export default UploadGrid
