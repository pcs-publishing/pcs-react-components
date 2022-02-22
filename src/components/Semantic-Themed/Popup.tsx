
import React, { FunctionComponent } from 'react'
import { Popup, PopupProps } from 'semantic-ui-react'
import { useTheme } from '../../theme-styled'

const StyledPopup: FunctionComponent<PopupProps> = (props) => {
  const theme = useTheme()
  return <Popup {...props} inverted={theme.invert}>{props.children}</Popup>
}

export default StyledPopup
