import React from 'react'
import styled from '../../../theme-styled'
import { Segment, Header, Icon } from 'semantic-ui-react'
import LoadingMask from '../../LoadingMask'
import { FileViewerGridProps } from '../definitions'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 600px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  overflow-y: auto;
`

const NoFilesFoundSegment = styled(Segment)`
  width: 100%;
  height: 100%;
`

const FileViewerGrid = <T extends any>(props: FileViewerGridProps<T>) => {
  const SingleFileComponent = props.singleFileComponent

  if (!props.records.length && !props.loading) {
    return (
      <Container>
        <NoFilesFound />
      </Container>
    )
  }
  return (
    <LoadingMask active={props.loading}>
      <Container>
        {props.records.map((record, index) => {
          return (
            <SingleFileComponent
              key={`file-viewer-record-${index}`}
              record={record}
              onEdit={props.onEdit}
              onDeleteClick={props.onDeleteClick}
              onView={props.onView}
              onOpen={props.onOpen}
            />
          )
        })}
      </Container>
    </LoadingMask>
  )
}

function NoFilesFound() {
  return (
    <NoFilesFoundSegment placeholder>
      <Header icon>
        <Icon name="search" />
        We don't have any files that match your query.
      </Header>
    </NoFilesFoundSegment>
  )
}

export default FileViewerGrid
