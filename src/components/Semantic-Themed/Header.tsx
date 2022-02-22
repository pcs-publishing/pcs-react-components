import React from 'react'
import { useTheme } from '../../theme-styled'
import { Header, HeaderProps } from 'semantic-ui-react'

const ThemedHeader = (props: HeaderProps) => {
  const theme = useTheme()
  return <Header inverted={theme.invert} {...props}>
    {props.children}
  </Header>
}

export const Subheader = Header.Subheader
export const HeaderContent = Header.Content

export default ThemedHeader
