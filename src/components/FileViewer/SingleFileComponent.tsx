import React, { useState, useCallback } from 'react'
import styled, { css } from '../../theme-styled'
import {
  Card,
  Button,
  Icon,
  Popup,
  SemanticICONS,
  SemanticCOLORS
} from 'semantic-ui-react'
import CenteredImage from '../Image/CenteredImage'
import { getFilenameInfo } from '../../util/filename'
import AutoForm from '../Form/AutoForm'
import { FormValue } from '../Form/AutoForm/definitions'
import { SingleFileComponentProps } from '.'

const FileCard = styled.div<{ selected: boolean }>`
  margin: 10px !important;
  overflow: hidden;
  cursor: default !important;
  width: auto !important;
  height: auto !important;

  ${(props) =>
    props.selected
      ? css`
          background-color: ${props.theme.colors.primary} !important;
          box-shadow: 0 2px 5px #999 !important;

          .header {
            color: white !important;
          }

          .meta {
            color: white !important;
          }
        `
      : ''};
`

const Header = styled(Card.Header)`
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1.1em !important;
  white-space: nowrap;
  color: black !important;
  font-weight: bolder;
`

const FallbackContainer = styled.div<{ size: number }>`
  width: 100%;
  height: 100%;
  padding-top: ${(props) => props.size / 2 - 20}px;
  color: white;
  text-align: center;
`

const ImageContainer = styled.div`
  width: 100%;
  padding: 0;
  background-color: rgba(100, 100, 100, 0.2);
`

const StyledCenteredImage = styled(CenteredImage)`
  user-select: none;
  overflow: hidden;
  margin: 0 auto;

  img {
    box-shadow: 0 0 5px #777;
  }
`

const SingleFileComponent = <T extends any>(
  props: SingleFileComponentProps<T>
) => {
  const {
    filename,
    previewUrl,
    downloadUrl,
    onView,
    onSelectionChange,
    editFields,
    record,
    textContent,
    onOpen
  } = props

  const mimeType = props.mimeType || ''

  const [inEditMode, setInEditMode] = useState(false)
  const [selected, setSelected] = useState(false)

  const canEdit: boolean = !!editFields && editFields?.length > 0

  const switchToEditMode = useCallback(() => {
    setInEditMode(true)
  }, [setInEditMode])

  const switchToViewMode = useCallback(() => {
    setInEditMode(false)
  }, [setInEditMode])

  const openFile = useCallback(() => {
    if (onOpen) {
      onOpen(downloadUrl)
      return
    }
    if (canViewMimeType(mimeType) && onView)
      onView(downloadUrl, filename, mimeType, textContent)
  }, [mimeType, onView, filename, downloadUrl, textContent, onOpen])

  const toggleSelected = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.ctrlKey) {
        setSelected((val) => {
          const newValue = !val
          if (onSelectionChange) onSelectionChange(newValue)
          return newValue
        })
        e.preventDefault()
      }
    },
    [setSelected, onSelectionChange]
  )

  const openButton = onView ? (
    canViewMimeType(mimeType) ? (
      <Button compact size="small" onClick={openFile}>
        <Icon name="download" />
        Open
      </Button>
    ) : (
        <Button as="a" compact size="small" href={downloadUrl}>
          <Icon as="i" name="download" />
        Download
        </Button>
      )
  ) : null

  const maxHeight = props.maxImageHeight || 200
  const maxWidth = props.maxImageWidth || 300

  return (
    <>
      <FileCard
        onClick={toggleSelected}
        onContextMenu={toggleSelected}
        className="ui card raised"
        selected={selected}
      >
        <ImageContainer>
          <StyledCenteredImage
            src={previewUrl}
            alt={`${filename}-preview`}
            fallback={getFallbackIcon(mimeType, filename, maxHeight)}
            maxHeight={maxHeight}
            maxWidth={maxWidth}
            onClick={openFile}
          />
        </ImageContainer>

        {inEditMode && editFields ? (
          <Card.Content>
            <AutoForm
              fields={editFields}
              onSave={async (value: unknown) => {
                if (props.onEdit) props.onEdit(value as Partial<T>)
                switchToViewMode()
              }}
              onCancel={switchToViewMode}
              defaultValue={(record as unknown) as FormValue}
              size="small"
              compact
            />
          </Card.Content>
        ) : (
            getMainContent(props, openButton, switchToEditMode, canEdit)
          )}
      </FileCard>
    </>
  )
}

export default SingleFileComponent

function getMainContent<T>(
  props: SingleFileComponentProps<T>,
  openButton: React.ReactElement | null,
  switchToEditMode: () => void,
  canEdit: boolean
) {
  return (
    <>
      <Card.Content>
        <Popup
          content={props.title}
          trigger={
            <Header as="div" onClick={switchToEditMode}>
              {props.title}
            </Header>
          }
        />

        {props.text && props.text.map((textItem) => {
          return (
            <Card.Meta key={textItem.label} className={textItem.className}>
              {textItem.label}: {textItem.value}
            </Card.Meta>
          )
        })}
      </Card.Content>
      <Card.Content extra>
        {openButton}
        {canEdit ? (
          <Button compact size="small" onClick={switchToEditMode}>
            <Icon name="edit" />
            Edit
          </Button>
        ) : null}
        {props.allowDelete && props.onDeleteClick ? (
          <Button
            compact
            size="small"
            color="red"
            onClick={() => props.onDeleteClick(props.record)}
          >
            <Icon name="trash" />
            Delete
          </Button>
        ) : null}
      </Card.Content>
    </>
  )
}

function getFallbackIcon(
  mimeType: string,
  filename: string,
  maxHeight: number
): React.ReactElement {
  const { iconName, color } = getFallbackIconName(mimeType, filename)

  return (
    <FallbackContainer size={maxHeight}>
      <Icon name={iconName} color={color} size="huge" />
    </FallbackContainer>
  )
}

function getFallbackIconName(
  mimeType: string,
  filename: string
): { iconName: SemanticICONS; color?: SemanticCOLORS } {
  const extension = getFileExtension(filename)

  const defaultIcon = 'file'

  if (mimeType.startsWith('image')) {
    return { color: 'yellow', iconName: 'file image' }
  }
  if (mimeType === 'application/pdf') {
    return { color: 'red', iconName: 'file pdf' }
  }
  if (extension === '.txt') {
    return { iconName: 'file text' }
  }
  if (['.doc', '.docx'].includes(extension)) {
    return { color: 'blue', iconName: 'file word' }
  }
  if (extension.startsWith('.xl') || extension === '.csv') {
    return { color: 'green', iconName: 'file excel' }
  }
  if (mimeType === 'application/zip') {
    return { iconName: 'file archive' }
  }
  return { iconName: defaultIcon }
}

function getFileExtension(filename: string): string {
  const { extension } = getFilenameInfo(filename)
  return extension
}

function canViewMimeType(mimeType: string): boolean {
  const isImage = mimeType.startsWith('image/')
  const isText = mimeType === 'text/plain'
  const isPdf = mimeType === 'application/pdf'

  return isImage || isText || isPdf
}
