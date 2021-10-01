import React from 'react'
import { Margin } from '../../../definitions'
import { PageProps } from '../Page'
import styled from '../../../theme-styled'

const StyledMargin = styled.rect`
  stroke-width: 0.3px;
  stroke: #9b59b6;
  fill: transparent;
`

const withMargin: (Page: React.FunctionComponent<PageProps>) => React.FunctionComponent<PageProps & { margin: Margin, marginClassName?: string }> = (Page) => (props) => {
  const { margin, height, width } = props

  const marginPosition = {
    x: margin.inside,
    y: margin.top,
    width: width - (margin.outside) - (margin.inside),
    height: height - (margin.bottom) - (margin.top)
  }

  return <Page {...props}>
    <StyledMargin {...marginPosition} className={props.marginClassName} />
    {props.children}
  </Page>
}

export default withMargin
