export enum FileUploadStatus {
  ACCEPTED,
  REJECTED,
  UPLOADED,
  FAILED
}

export interface FileUpload {
  name: string
  file: File
  status: FileUploadStatus
  message?: string
}
