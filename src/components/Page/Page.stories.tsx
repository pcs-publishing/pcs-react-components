import React, { useCallback, useEffect, useState } from 'react'
import Page, { PageProps } from './Page'
import styled from '../../theme-styled'
import { Margin, Annotation, AnnotationType } from '../../definitions'
import withMargin from './plugins/withMargin'
import withColumns from './plugins/withColumns'
import withImage from './plugins/withImage'
import ActionNotification from '../Popups/ActionNotification'
import Button from '../Buttons/Button'
import getPageSizeFromImageUrl from './util/getPageSizeFromImageUrl'

export default {
  title: 'Page',
  component: Page,
  argTypes: {
    zoomLevel: {
      control: {
        type: 'range',
        min: 0.1,
        max: 10,
        step: 0.1
      }
    }
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}

const Container = styled.div`
  background-color: #ccc;
  padding: 10px;
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
`

export const BasePage = (props: PageProps) => {
  return (
    <Container>
      <Page {...props} />
    </Container>
  )
}

BasePage.args = {
  width: 500,
  height: 750,
  zoomLevel: 0.5
}

export const PageWithMargin = (props: PageProps & { margin: Margin }) => {
  const PageWithMarginComponent = withMargin(Page)
  return (
    <Container>
      <PageWithMarginComponent {...props} />
    </Container>
  )
}

PageWithMargin.args = {
  width: 500,
  height: 750,
  zoomLevel: 0.5,
  margin: {
    top: 10,
    bottom: 10,
    inside: 10,
    outside: 10
  }
}

export const PageWithColumns = (
  props: PageProps & { columns: number; gutter: number }
) => {
  const PageWithColumnsComponent = withColumns(Page)
  return (
    <Container>
      <PageWithColumnsComponent {...props} />
    </Container>
  )
}

PageWithColumns.args = {
  width: 500,
  height: 750,
  zoomLevel: 0.5,
  columns: 4,
  gutter: 5
}

export const PageWithColumnsAndMargin = (
  props: PageProps & { columns: number; gutter: number; margin: Margin }
) => {
  const PageWithMarginAndColumnsComponent = withColumns(withMargin(Page))
  return (
    <Container>
      <PageWithMarginAndColumnsComponent
        {...props}
      ></PageWithMarginAndColumnsComponent>
    </Container>
  )
}

PageWithColumnsAndMargin.args = {
  width: 500,
  height: 750,
  zoomLevel: 0.5,
  columns: 4,
  gutter: 5,
  margin: {
    top: 10,
    bottom: 10,
    inside: 10,
    outside: 10
  }
}

const ToolbarHolder = styled.div`
  width: 100%;
  background-color: white;
  padding: 5px;
`

export const PageWithImage = (
  props: PageProps & {
    url: string
    minWidth: number
    minHeight: number
    height: number
    width: number
  }
) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [pageSize, setPageSize] = useState<
    undefined | { height: number; width: number }
  >()
  const [error, setError] = useState(false)
  const PageWithImage = withImage(Page)

  const onAddAnnotation = useCallback(
    (type: AnnotationType, defaultPosition?: { x: number; y: number }) => {
      const canAddAnnotation =
        annotations.findIndex((annotation) => annotation.content === '') === -1

      if (!canAddAnnotation) {
        setError(true)
        return
      }

      setAnnotations((prevState) => [
        ...prevState,
        {
          content: '',
          x: defaultPosition?.x ?? 0,
          y: defaultPosition?.y ?? 0,
          type,
          color: 'black'
        }
      ])
    },
    [setAnnotations, annotations, setError]
  )

  const onUpdateAnnotations = useCallback(
    (index: number, newAnnotation: Partial<Annotation>) => {
      const newAnnotations = annotations.map((annotation, i) =>
        i === index ? { ...annotation, ...newAnnotation } : annotation
      )
      setAnnotations(newAnnotations)
    },
    [setAnnotations, annotations]
  )

  const onChange = useCallback(
    (index: number, annotation: Partial<Annotation>) => {
      onUpdateAnnotations(index, annotation)
    },
    [onUpdateAnnotations]
  )

  const onDelete = useCallback(
    (index: number) => {
      setAnnotations((prevState) => prevState.filter((_, i) => i !== index))
    },
    [setAnnotations]
  )

  return (
    <Container>
      <PageWithImage
        onSetInitialPageSize={(pageSize, _) => setPageSize(pageSize)}
        pageSize={pageSize ?? { width: 0, height: 0 }}
        onAddAnnotation={onAddAnnotation}
        onDelete={onDelete}
        onChange={onChange}
        annotations={annotations}
        toolBar={
          <ToolbarHolder>
            <Button
              icon="comment"
              color="green"
              onClick={() => onAddAnnotation('comment')}
            />
          </ToolbarHolder>
        }
        {...props}
      />
      <ActionNotification
        displaying="error"
        message="Please make sure all annotations have some content before adding a new one."
        show={error}
        close={() => setError(false)}
      />
    </Container>
  )
}

PageWithImage.args = {
  zoomLevel: 1,
  url:
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1738&q=80',
  minWidth: 400,
  minHeight: 500,
  width: 750,
  height: 750
}
