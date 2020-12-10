import { FlattenSimpleInterpolation } from 'styled-components'

export interface Theme {
  colors: {
    base: string
    primary: string
    text: {
      onBase: string
      onPrimary: string
    }
  }
  border: FlattenSimpleInterpolation
  dragOverOutline: FlattenSimpleInterpolation
}