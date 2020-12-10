import React from 'react'
import Editor from 'react-simple-code-editor'
import Prism from 'prismjs/components/prism-core'
import styled from 'styled-components'

import 'prismjs/components/prism-markup'

const StyledEditor = styled(Editor)`
  font-size: 12px;
  font-family: 'Fira code', 'Fira Mono', monospace;
  color: #eee;
  background-color: #333;
  border-radius: 5px;
  min-height: 100%;

  .code-text-area {
    max-height: 100% !important;
  }

  .code-pre {
    max-height: 100% !important;
  }
`
export interface CodeEditorProps {
  code: string
  onCodeChange: (code: string) => void
  language: 'html' | 'javascript'
  className?: string
}

const CodeEditor = (props: CodeEditorProps) => {
  const { code, onCodeChange, className } = props

  const language = Prism.languages[props.language]
    
  return (
    <StyledEditor
      value={code}
      onValueChange={onCodeChange}
      highlight={(code) => Prism.highlight(code, Prism.languages[language], props.language)}
      className={className}
      textareaClassName="code-text-area"
      padding={10}
    />
  )
}

export default CodeEditor
