import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Annotation,
  AnnotationColor,
  AnnotationType
} from '../../../definitions'
import { PageProps } from '../Page'
import Comment from '../components/Comment'
import AnnotationContextMenu from '../components/AnnotationContextMenu'
import getPageSizeFromImageUrl from '../util/getPageSizeFromImageUrl'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const withImage: <T extends PageProps>(
  Page: React.FunctionComponent<T>
) => React.FunctionComponent<
  T & {
    annotations: Annotation[]
    onChange: (index: number, annotation: Partial<Annotation>) => void
    onDelete: (index: number) => void
    onAddAnnotation: (
      type: AnnotationType,
      defaultPosition?: { x: number; y: number }
    ) => void
    onSetInitialPageSize: (
      pageSize: { width: number; height: number },
      biggerBy: number
    ) => void
    toolBar?: JSX.Element
    url: string
    pageSize: { width: number; height: number }
    minWidth: number
    minHeight: number
    iconSize?: number
  }
> = (Page) => (props) => {
  const {
    annotations,
    onChange,
    onDelete,
    onAddAnnotation,
    toolBar,
    url,
    pageSize,
    onSetInitialPageSize,
    minWidth,
    minHeight,
    width,
    height,
    iconSize
  } = props
  const contextMenuId = 'page-annotation-context-menu'

  const shouldNotUpdateAnnotation = useCallback(
    (index: number, partialAnnotation: Partial<Annotation>) => {
      const annotation = annotations[index]

      const shouldNotUpdate = Object.keys(partialAnnotation).every((key) => {
        const annotationKey = key as keyof Annotation
        return annotation[annotationKey] === partialAnnotation[annotationKey]
      })

      return shouldNotUpdate
    },
    [annotations]
  )

  const onDragEnd = useCallback(
    (index: number, x: number, y: number) => {
      const shouldNotUpdate = shouldNotUpdateAnnotation(index, { x, y })
      if (shouldNotUpdate) {
        return
      }
      onChange(index, { x, y })
    },
    [onChange, shouldNotUpdateAnnotation]
  )

  const onAction = useCallback(
    (action: AnnotationType, position: { x: number; y: number }) => {
      switch (action) {
        case 'comment':
          onAddAnnotation('comment', position)
          return
      }
    },
    [onAddAnnotation]
  )

  const getInitialPageSize = useCallback(async () => {
    const { pageSize, biggerBy } = await getPageSizeFromImageUrl(
      url,
      minWidth,
      minHeight,
      width,
      height
    )
    onSetInitialPageSize(pageSize, biggerBy)
  }, [
    getPageSizeFromImageUrl,
    onSetInitialPageSize,
    url,
    minWidth,
    minHeight,
    width,
    height
  ])

  useEffect(() => {
    if (!pageSize.height || !pageSize.width) {
      getInitialPageSize()
    }
  }, [pageSize, getInitialPageSize])

  const onChangeAnnotation = useCallback(
    (index: number, partialAnnotation: Partial<Annotation>) => {
      const shouldNotUpdate = shouldNotUpdateAnnotation(
        index,
        partialAnnotation
      )
      if (shouldNotUpdate) {
        return
      }

      onChange(index, partialAnnotation)
    },
    [shouldNotUpdateAnnotation, onChange]
  )

  return (
    <Container>
      {toolBar && toolBar}
      <Page
        {...props}
        width={pageSize.width}
        height={pageSize.height}
        contextMenuId={contextMenuId}
      >
        <AnnotationContextMenu onAction={onAction} id={contextMenuId} />
        <image
          width="100%"
          height="100%"
          href={url}
          preserveAspectRatio="none"
        />
        {props.children}
        {annotations.map((annotation, i) =>
          getAnnotation(
            annotation,
            i,
            onDragEnd,
            onChangeAnnotation,
            onDelete,
            {
              height: pageSize.height,
              width: pageSize.width,
              iconSize
            }
          )
        )}
      </Page>
    </Container>
  )
}

const getAnnotation = (
  args: Annotation,
  index: number,
  onDragEnd: (index: number, x: number, y: number) => void,
  onChange: (index: number, annotation: Partial<Annotation>) => void,
  onDelete: (index: number) => void,
  bounds: { height: number; width: number; iconSize?: number }
) => {
  const props: AnnotationProps = {
    ...args,
    onDragEnd: (x, y) => onDragEnd(index, x, y),
    onChange: (annotation) => onChange(index, annotation),
    onDelete: () => onDelete(index),
    bounds
  }
  switch (args.type) {
    case 'comment':
      return <Comment key={`${props.x} ${props.y}`} {...props} />
  }
}

export interface AnnotationProps {
  x: number
  y: number
  content: string
  onDragEnd: (x: number, y: number) => void
  onChange: (annotation: Partial<Annotation>) => void
  onDelete: () => void
  bounds: { height: number; width: number; iconSize?: number }
  color: AnnotationColor
}

export default withImage
