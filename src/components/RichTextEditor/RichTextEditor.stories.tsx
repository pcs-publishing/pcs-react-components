import React, { useState } from 'react'
import RichTextEditor from './RichTextEditor'
import { Form } from 'semantic-ui-react'
import {
  DraftStyleMap,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RichUtils
} from 'draft-js'
import { useCallback } from 'react'
import _ from 'lodash'
import { RichTextEditorButton } from '../../definitions'

export default {
  title: 'RichTextEditor',
  component: RichTextEditor
}

const styleMap: DraftStyleMap = {
  HEADING: {
    fontSize: '18px'
  }
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

  const customKeyBindingFn = useCallback(
    (e: any) => {
      const hasCommandKey = KeyBindingUtil.hasCommandModifier(e)
      if (e.keyCode === 72 && hasCommandKey) {
        return 'HEADING'
      }
      return getDefaultKeyBinding(e)
    },
    [getDefaultKeyBinding]
  )

  const customKeyCommandFn = useCallback(
    (command: string, state: EditorState) => {
      switch (command) {
        case 'HEADING':
          return RichUtils.toggleInlineStyle(state, command)
        default:
          return RichUtils.handleKeyCommand(state, command)
      }
    },
    []
  )

  const customActions: RichTextEditorButton[] = [
    { action: 'HEADING', content: 'Heading', icon: 'heading' }
  ]

  return (
    <Form>
      <RichTextEditor
        editorState={editorState}
        onChange={onChange}
        availableBaseActions={['bold', 'code', 'italic', 'underline']}
        label="Rich Text Editor"
        customActions={customActions}
        customStyleMap={styleMap}
        customKeyBindingFn={customKeyBindingFn}
        customKeyCommandFn={customKeyCommandFn}
      />
    </Form>
  )
}
