import React, { useCallback, useState } from 'react'
import {
  DropdownItemProps,
  Form,
  Search,
  SearchResultProps
} from 'semantic-ui-react'
import styled from '../../theme-styled'
import Uploader from '../Uploader'
import { UploaderProps } from '../Uploader/Uploader'
import ImageHolder from './components/ImageHolder'
import { createApi } from 'unsplash-js'
import { Photos } from 'unsplash-js/dist/methods/search/types/response'
import UnsplashResult from './components/UnsplashResult'
import { Basic } from 'unsplash-js/dist/methods/photos/types'
import _ from 'lodash'

export interface FileFormDefinition {
  type: 'dropdown' | 'input' | 'textarea'
  label: string
  dataName?: string
  options?: DropdownItemProps[]
}

export interface FileData {
  file: File
  data: { [key: string]: any }
}

export interface FileUploadProps extends UploaderProps {
  label: string
  fileData: FileData[]
  fileFormDefinitions?: FileFormDefinition[]
  onDelete?: (index: number, file: File) => void
  onChangeForm?: (index: number, key: string, value: any) => void
  maxImageHeight?: number
  maxImageWidth?: number
  unsplashAccessKey?: string
}

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`

const FileUploadContainer = styled.div``

const FileUploadListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const LabelAndSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`

const StyledSearch = styled(Search)`
  .results {
    overflow-y: auto;
    max-height: 300px;
  }
`

const FileUpload = ({
  onDrop,
  uploadType,
  maxFileSize,
  multiple,
  acceptMimeTypes,
  border,
  className,
  size,
  width,
  label,
  fileData,
  fileFormDefinitions,
  onDelete,
  onChangeForm,
  maxImageWidth,
  maxImageHeight,
  unsplashAccessKey
}: FileUploadProps) => {
  const photosDefault: Photos = { results: [], total: 0, total_pages: 0 }

  const [imageResults, setImageResults] = useState<Photos>(photosDefault)
  const [imageSearch, setImageSearch] = useState<undefined | string>(undefined)
  const [loading, setLoading] = useState(false)

  const unsplashApi = unsplashAccessKey
    ? createApi({ accessKey: unsplashAccessKey })
    : null

  // Don't want to do automatic searching by using a debounced search function
  // as unsplash rate limits requests
  const onSubmitSearch = useCallback(async () => {
    setLoading(true)
    const results = unsplashApi
      ? (
          await unsplashApi.search.getPhotos({
            query: imageSearch ?? '',
            orderBy: 'relevant',
            perPage: 20
          })
        ).response ?? photosDefault
      : photosDefault
    setImageResults(results)
    setLoading(false)
  }, [imageSearch, setImageResults, setLoading])

  const onSelectUnsplashFile = useCallback(
    async (photo: Basic) => {
      const response = await fetch(photo.urls.regular)
      const blob = await response.blob()
      const file = new File(
        [blob],
        photo.description ?? photo.alt_description ?? 'Unknown'
      )
      await onDrop(file)
    },
    [onDrop]
  )

  const onSearchChange = useCallback(
    (value: string | undefined) => {
      setImageSearch(value)
      if (value !== imageSearch) {
        setImageResults(photosDefault)
      }
    },
    [imageSearch, setImageSearch, photosDefault, setImageResults]
  )

  return (
    <FileUploadContainer>
      <LabelAndSearchContainer>
        <StyledLabel>{label}</StyledLabel>
        {unsplashApi && (
          <Form onSubmit={onSubmitSearch}>
            <StyledSearch
              fluid
              onSearchChange={(
                _: any,
                { value }: { value: string | undefined }
              ) => onSearchChange(value)}
              action={{ icon: 'search' }}
              placeholder="Search unsplash..."
              showNoResults={false}
              results={imageResults.results}
              resultRenderer={(props: SearchResultProps) => {
                const renderProps = (props as unknown) as Basic
                return <UnsplashResult {...renderProps} />
              }}
              minCharacters={3}
              value={imageSearch}
              onResultSelect={(_: any, data: { result: Basic }) =>
                onSelectUnsplashFile(data.result)
              }
              loading={loading}
            />
          </Form>
        )}
      </LabelAndSearchContainer>

      <Uploader
        onDrop={onDrop}
        uploadType={uploadType}
        multiple={multiple}
        maxFileSize={maxFileSize}
        acceptMimeTypes={acceptMimeTypes}
        border={border}
        className={className}
        size={size}
        width={width}
      />
      <FileUploadListContainer>
        {fileData.map((fileData, i) => (
          <ImageHolder
            fileData={fileData}
            fileFormDefinitions={fileFormDefinitions}
            onDelete={onDelete ? () => onDelete(i, fileData.file) : undefined}
            onChangeForm={
              onChangeForm
                ? (key, value) => onChangeForm(i, key, value)
                : undefined
            }
            maxImageWidth={maxImageWidth}
            maxImageHeight={maxImageHeight}
          />
        ))}
      </FileUploadListContainer>
    </FileUploadContainer>
  )
}

export default FileUpload
