import React, { useCallback, useEffect, useState } from 'react'
import {
  DraftHandleValue,
  Editor,
  EditorState,
  RichUtils,
  CharacterMetadata,
  DraftStyleMap,
  getDefaultKeyBinding,
  KeyBindingUtil
} from 'draft-js'
import { ButtonGroup, Form, Popup, Button } from 'semantic-ui-react'
import 'draft-js/dist/Draft.css'
import styled from '../../theme-styled'
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic'
import _ from 'lodash'
import { RichTextEditorAction } from '.'

const styleMap: DraftStyleMap = {
  HEADING: {
    fontSize: '18px'
  }
}

export interface RichTextEditorProps {
  editorState: EditorState
  onChange: (editorState: EditorState) => void
  availableActions: RichTextEditorAction[]
  label: string
}

const EditorContainer = styled.div`
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  padding: 10px;
`

interface RichTextEditorButton {
  content: string
  icon: SemanticICONS
  action: RichTextEditorAction
}

const ButtonGroupContainer = styled.div`
  margin-bottom: 10px;
`

const buttons: RichTextEditorButton[] = [
  { content: 'Bold', icon: 'bold', action: RichTextEditorAction.BOLD },
  { content: 'Italic', icon: 'italic', action: RichTextEditorAction.ITALIC },
  { content: 'Heading', icon: 'heading', action: RichTextEditorAction.HEADING },
  {
    content: 'Underline',
    icon: 'underline',
    action: RichTextEditorAction.UNDERLINE
  },
  { content: 'Code', icon: 'code', action: RichTextEditorAction.CODE }
]

const StyledButton = styled(Button)<{ active: boolean }>`
  ${(props) => (props.active ? 'background-color: grey !important;' : null)}
  ${(props) => (props.active ? 'color: white !important;' : null)}
  margin: 0px 5px !important;
  :first-child {
    margin: 0px 5px 0px 0px !important;
  }
`

const RichTextEditor = ({
  editorState,
  onChange,
  availableActions,
  label
}: RichTextEditorProps) => {
  const [activeButtons, setActiveButtons] = useState<RichTextEditorAction[]>([])
  const availableButtons = availableActions.map(
    (action) =>
      buttons.find((button) => button.action === action) as RichTextEditorButton
  )

  const onGetCurrentActiveInlineStyles = useCallback(() => {
    const contentBlocks = _.flattenDeep(
      editorState.getCurrentContent().getBlocksAsArray()
    )

    const characterList = _.flattenDeep(
      contentBlocks.map((block) => block.toObject().characterList)
    )

    const characterMetaData: CharacterMetadata[] = _.flattenDeep(
      characterList.map((list) => list.toArray())
    )

    const activeStyleObject =
      _.uniqWith(
        characterMetaData.map((data) => data.getStyle().toObject()),
        _.isEqual
      )[0] ?? {}

    const activeStyleArray = Object.keys(activeStyleObject).map((key) =>
      _.toLower(activeStyleObject[key])
    ) as RichTextEditorAction[]
    return activeStyleArray
  }, [editorState])

  useEffect(() => {
    const activeStyles = onGetCurrentActiveInlineStyles()

    if (activeStyles.length !== activeButtons.length) {
      setActiveButtons(activeStyles)
    }
  }, [onGetCurrentActiveInlineStyles, setActiveButtons, activeButtons])

  const onHandleButtonClick = useCallback(
    (action: RichTextEditorAction) => {
      const newState = RichUtils.toggleInlineStyle(
        editorState,
        _.upperCase(action)
      )
      if (newState) {
        onChange(newState)
      }
    },
    [onChange, editorState]
  )

  const handleKeyCommand = useCallback(
    (command: string, state: EditorState): DraftHandleValue => {
      const isAvailable = availableButtons.find(
        (button) => button.action === command
      )

      let newState: EditorState | null

      switch (command) {
        case 'heading':
          newState = RichUtils.toggleInlineStyle(editorState, 'HEADING')
          break

        default:
          newState = RichUtils.handleKeyCommand(
            state,
            command
          ) as EditorState | null
          break
      }

      if (!isAvailable || !newState) {
        return 'not-handled'
      }

      onChange(newState)

      return 'handled'
    },
    [availableButtons, onChange]
  )

  const isButtonActive = useCallback(
    (button: RichTextEditorButton) => {
      const isButtonActive = !!activeButtons.find(
        (action) => button.action === action
      )
      const currentSelectionHasInlineStyle = editorState
        .getCurrentInlineStyle()
        .has(_.upperCase(button.action))
      return isButtonActive && currentSelectionHasInlineStyle
    },
    [activeButtons, editorState]
  )

  const customKeyBindingFn = (e: any) => {
    const hasCommandKey = KeyBindingUtil.hasCommandModifier(e) // command or ctrl key
    if (e.keyCode === 72 /** h key */ && hasCommandKey) {
      return 'heading'
    }
    return getDefaultKeyBinding(e)
  }

  return (
    <Form.Field>
      <label>{label}</label>
      {availableButtons.length > 0 ? (
        <ButtonGroupContainer>
          <ButtonGroup>
            {availableButtons.map((button) => {
              const isActive = isButtonActive(button)
              return (
                <Popup
                  content={button.content}
                  trigger={
                    <span>
                      <StyledButton
                        onClick={() => onHandleButtonClick(button.action)}
                        icon={button.icon}
                        active={isActive}
                      />
                    </span>
                  }
                />
              )
            })}
          </ButtonGroup>
        </ButtonGroupContainer>
      ) : null}

      <EditorContainer>
        <Editor
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={styleMap}
          keyBindingFn={customKeyBindingFn}
        />
      </EditorContainer>
    </Form.Field>
  )
}

export default RichTextEditor
