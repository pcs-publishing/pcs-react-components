import React from 'react'
import CodeEditor, { CodeEditorProps } from './CodeEditor'

export default {
  title: 'CodeEditor',
  component: CodeEditor
}

const Template = (props: CodeEditorProps) => {
  return <CodeEditor {...props} />
}

export const Example = Template.bind({})

Example.args = {
  code: `
    <html>
      <head>
        <title>Example Title</title>
      </head>
      <body>
        <h1>Yes</h1>
      </body>
    </html>
  `,
  language: 'html'
}