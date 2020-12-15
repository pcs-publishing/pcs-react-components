import { FlattenSimpleInterpolation } from 'styled-components'

export interface Theme {
  name: string
  colors: {
    base: string
    primary: string
    text: {
      onBase: string
      onPrimary: string
    }
  }
  backgrounds: {
    main: FlattenSimpleInterpolation,
    offset: FlattenSimpleInterpolation
  },
  border: FlattenSimpleInterpolation
  dragOverOutline: FlattenSimpleInterpolation
}