import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import defaultTheme from '../src/themes/defaultTheme'

const themes = [defaultTheme]

addDecorator(withThemesProvider(themes));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}