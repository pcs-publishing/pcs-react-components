// import { withThemeSwitcher } from 'storybook-theme-switcher'
// import themes from '../src/themes'

// addDecorator(withThemeSwitcher({ themes }))

module.exports = {
  "stories": [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-styled-component-theme/dist/register"
  ],
  "typescript": {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValesFromEnum: true,
      propFilter: (props) => props.parent ? /node_modules/.test(props.parent.fileName) : true
    }
  }
}