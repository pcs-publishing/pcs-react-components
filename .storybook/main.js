module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-postcss',
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
