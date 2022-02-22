import React from 'react'
import { useTheme } from '../../theme-styled'
import { Segment, SegmentProps } from 'semantic-ui-react'

const ThemedSegment: React.FunctionComponent<SegmentProps> = (props) => {
  const theme = useTheme()
  return <Segment inverted={theme.invert} {...props}>
    {props.children}
  </Segment>
}

export default ThemedSegment
