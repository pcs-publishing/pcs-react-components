import React from 'react'
import Page, { PageProps } from './Page'
import styled from '../../theme-styled'
import { Margin } from '../../definitions'
import withMargin from './plugins/withMargin'
import withColumns from './plugins/withColumns'

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
  return <Container>
    <Page {...props} />
  </Container>
}

BasePage.args = {
  width: 500,
  height: 750,
  zoomLevel: 0.5
}

export const PageWithMargin = (props: PageProps & { margin: Margin }) => {
  const PageWithMarginComponent = withMargin(Page)
  return <Container>
    <PageWithMarginComponent {...props} />
  </Container>
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

export const PageWithColumns = (props: PageProps & { columns: number, gutter: number }) => {
  const PageWithColumnsComponent = withColumns(Page)
  return <Container>
    <PageWithColumnsComponent {...props} />
  </Container>
}

PageWithColumns.args = {
  width: 500,
  height: 750,
  zoomLevel: 0.5,
  columns: 4,
  gutter: 5
}


export const PageWithColumnsAndMargin = (props: PageProps & { columns: number, gutter: number, margin: Margin }) => {
  const PageWithMarginAndColumnsComponent = withColumns(withMargin(Page))
  return <Container>
    <PageWithMarginAndColumnsComponent {...props}>
    </PageWithMarginAndColumnsComponent>
  </Container>
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
