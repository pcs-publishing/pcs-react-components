import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import defaultTheme from '../src/themes/defaultTheme'
import alternateTheme from '../src/themes/alternateTheme'

import 'react-image-lightbox/style.css'

const themes = [defaultTheme, alternateTheme]

addDecorator(withThemesProvider(themes));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}