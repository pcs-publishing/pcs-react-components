import React, { useRef, FunctionComponent } from 'react'
import { useContextMenu } from 'react-contexify'
import styled from '../../theme-styled'

export interface PageProps {
  className?: string
  width: number
  height: number
  zoomLevel: number
  cursor?: string
  svgChild?: (svgRef: React.RefObject<SVGSVGElement>) => React.ReactElement
  contextMenuId?: string
}

const PageContainer = styled.div<{
  $width: number
  $height: number
  $cursor?: string
}>`
  ${(props) => `
    width: ${props.$width}px;
    height: ${props.$height}px;

    ${props.$cursor ? `cursor: ${props.$cursor};` : ''}
  `}

  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: white;
`

const Page: FunctionComponent<PageProps> = (props) => {
  const { show } = useContextMenu({ id: props.contextMenuId })
  const svgRef = useRef<SVGSVGElement>(null)
  const scaledWidth = props.width * props.zoomLevel
  const scaledHeight = props.height * props.zoomLevel

  return (
    <PageContainer
      className={props.className}
      $width={scaledWidth}
      $height={scaledHeight}
      $cursor={props.cursor}
    >
      <svg
        onContextMenu={(e) => {
          if (props.contextMenuId) {
            const rect = svgRef.current?.getBoundingClientRect()
            const position = {
              x: e.clientX - (rect?.left ?? 0),
              y: e.clientY - (rect?.top ?? 0)
            }
            e.preventDefault()
            show(e, { props: { position } })
          }
        }}
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${props.width} ${props.height}`}
      >
        {props.svgChild && props.svgChild(svgRef)}
        {props.children}
      </svg>
    </PageContainer>
  )
}

export default Page
