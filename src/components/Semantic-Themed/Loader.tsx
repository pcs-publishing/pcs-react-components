import React from 'react'
import { FunctionComponent } from 'react'
import { Loader, LoaderProps } from 'semantic-ui-react'
import { useTheme } from '../../theme-styled'

const StyledLoader: FunctionComponent<LoaderProps> = (props) => {
  const theme = useTheme()
  return <Loader {...props} inverted={theme.invert}>{props.children}</Loader>
}

export default StyledLoader
