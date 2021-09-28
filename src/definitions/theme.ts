import { FlattenSimpleInterpolation } from 'styled-components'

export interface ThemeColors {
  base: string
  primary: string
  text: {
    onBase: string
    onPrimary: string
    onNavigation: string
    onFullScreenScene: string
  }
}

export interface ThemeBackgrounds {
  main: FlattenSimpleInterpolation
  offset: FlattenSimpleInterpolation
  offsetEmphasis: FlattenSimpleInterpolation
  navigation: FlattenSimpleInterpolation
  fullScreenScene: FlattenSimpleInterpolation
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
  prospectButtonColor: FlattenSimpleInterpolation
}
