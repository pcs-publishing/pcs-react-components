import { FlattenSimpleInterpolation } from 'styled-components'

export interface ThemeColors {
  base: string
  primary: string
  primaryHover: string
  text: TextColor
  button: ButtonColor
}

export interface ThemeBackgrounds {
  main: FlattenSimpleInterpolation
  offset: FlattenSimpleInterpolation
  offsetEmphasis: FlattenSimpleInterpolation
  navigation: FlattenSimpleInterpolation
  fullScreenScene: FlattenSimpleInterpolation
}

export interface TextColor {
  onBase: string
  onPrimary: string
  onNavigation: string
  onFullScreenScene: string
}

export interface ButtonColor {
  standard: string
  standardHover: string
  standardText: string
}

export interface PushNotificationTheme {
  text: string
  background: string
  border: string
}

export interface Theme {
  name: string
  colors: ThemeColors
  backgrounds: ThemeBackgrounds
  border: FlattenSimpleInterpolation
  dragOverOutline: FlattenSimpleInterpolation
  pushNotification: PushNotificationTheme
  invert?: boolean
  card?: FlattenSimpleInterpolation
  accordion?: FlattenSimpleInterpolation
  table?: FlattenSimpleInterpolation
  menu?: FlattenSimpleInterpolation
  datagrid?: FlattenSimpleInterpolation
  modal?: FlattenSimpleInterpolation
}
