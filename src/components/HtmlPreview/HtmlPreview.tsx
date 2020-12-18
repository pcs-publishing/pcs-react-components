import React from 'react'
import styled from '../../theme-styled'

export interface HtmlPreviewProps {
  html: string
}

const StyledIFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`

const HtmlPreview = (props: HtmlPreviewProps) => {
  return <StyledIFrame title="html-preview" srcDoc={props.html} />
}

export default HtmlPreview
