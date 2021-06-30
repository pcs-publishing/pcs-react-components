import React, { useState } from 'react'
import RichTextEditor from './RichTextEditor'
import { Form } from 'semantic-ui-react'
import { EditorState } from 'draft-js'
import { useCallback } from 'react'
import { RichTextEditorAction } from '.'

export default {
  title: 'RichTextEditor',
  component: RichTextEditor
}

export const Example = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  )

  const onChange = useCallback(
    (state: EditorState) => {
      setEditorState(state)
    },
    [setEditorState]
  )

  const allRichTextEditorActions = Object.keys(RichTextEditorAction).map(
    (key) => RichTextEditorAction[key]
  ) as RichTextEditorAction[]

  return (
    <Form>
      <RichTextEditor
        editorState={editorState}
        onChange={onChange}
        availableActions={allRichTextEditorActions}
        label="Rich Text Editor"
      />
    </Form>
  )
}
