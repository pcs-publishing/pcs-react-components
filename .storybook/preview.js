import { addDecorator } from '@storybook/react'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import themes from '../src/themes'

import 'react-image-lightbox/style.css'

const allThemes = Object.keys(themes).map((key) => themes[key])

addDecorator(withThemesProvider(allThemes))

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}
