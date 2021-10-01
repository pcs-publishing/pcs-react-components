import React from 'react'
import { Margin } from '../../../definitions'
import { PageProps } from '../Page'
import generateColumnLineXPositions from '../util/generateColumnLineXPositions'
import styled from '../../../theme-styled'


const ColumnLine = styled.line`
  stroke-width: 0.3px;
  stroke: #9b59b6;
`

const columns: <T extends PageProps> (Page: React.FunctionComponent<T>) => React.FunctionComponent<T & { columns: number, gutter: number, margin?: Margin }> = (Page) => (props) => {
  const margin: Margin = props.margin || { top: 0, bottom: 0, inside: 0, outside: 0 }
  const { width, height, columns, gutter } = props

  const innerWidth = width - margin.inside - margin.outside

  const startingLineXPositions = generateColumnLineXPositions({
    innerWidth,
    gutter,
    columns
  })

  const lineStartingY = margin.top
  const lineEndingY = height - (margin.bottom)

  return <Page {...props}>
    <g>{
      startingLineXPositions.map(lineXPosition => {
        const xPos = lineXPosition + (margin.inside)
        return <ColumnLine key={lineXPosition.toString()} x1={xPos} x2={xPos} y1={lineStartingY} y2={lineEndingY} />
      })}
    </g>
    {props.children}
  </Page>
}

export default columns
