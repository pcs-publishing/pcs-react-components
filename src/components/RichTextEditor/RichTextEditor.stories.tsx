import React, { useState } from 'react'
import RichTextEditor from './RichTextEditor'
import { Form } from 'semantic-ui-react'
import { EditorState } from 'draft-js'
import { useCallback } from 'react'

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

  return (
    <Form>
      <RichTextEditor
        editorState={editorState}
        onChange={onChange}
        availableActions={['bold', 'italic', 'heading', 'underline', 'code']}
      />
    </Form>
  )
}
