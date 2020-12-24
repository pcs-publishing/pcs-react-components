import { FunctionComponent } from 'react';

interface BaseFileViewerProps<T> {
  onEdit?: (record: Partial<T>) => void
  onView?: (
    url: string,
    filename: string,
    mimeType: string,
    textContent?: string
  ) => void
  onDeleteClick?: (record: T) => void
  onOpen?: (url: string) => void
}

export interface SingleFileComponentProps<T> extends BaseFileViewerProps<T> {
  record: T
}

export type SingleFileComponent<T> = FunctionComponent<
  SingleFileComponentProps<T>
>

export interface FileViewerProps<T>
  extends FileViewerToolbarProps,
    FileViewerGridProps<T> {}

export interface FileViewerToolbarProps {
  typeOfFile: string
  acceptedMimeTypes: string[]
  maxFileSize?: number
  onUpload: (file: File) => Promise<void>
  toolbarItems?: React.ReactElement[]
}

export interface FileViewerGridProps<T> extends BaseFileViewerProps<T> {
  records: T[]
  loading: boolean
  singleFileComponent: SingleFileComponent<T>
  onDeleteClick?: (record: T) => void
}
