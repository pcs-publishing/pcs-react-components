import { FileRecord } from '../components/ViewFileWindow/ViewFileWindow'

export function isImage(file: FileRecord): boolean {
  return file.mimeType.startsWith('image/')
}

export function isPdf(file: FileRecord): boolean {
  return file.mimeType === 'application/pdf'
}

export function isTextDocument(file: FileRecord): boolean {
  return !!file.textContent
}

export const isFileRecord = (value: any) => {
  if (!value) return false
  if ('url' in value) {
    return true
  }
  return false
}
