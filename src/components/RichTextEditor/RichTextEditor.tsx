import React, { useCallback, useEffect, useState } from 'react'
import {
  DraftHandleValue,
  Editor,
  EditorState,
  RichUtils,
  CharacterMetadata,
  DraftStyleMap
} from 'draft-js'
import { ButtonGroup, Form, Popup, Button } from 'semantic-ui-react'
import 'draft-js/dist/Draft.css'
import styled from '../../theme-styled'
import _ from 'lodash'
import { RichTextEditorAction, RichTextEditorButton } from '../../definitions'

export interface RichTextEditorProps {
  editorState: EditorState
  onChange: (editorState: EditorState) => void
  availableBaseActions: RichTextEditorAction[]
  label: string
  customStyleMap?: DraftStyleMap
  customActions?: RichTextEditorButton[]
  customKeyBindingFn?: (e: any) => string | null
  customKeyCommandFn?: (command: string, state: EditorState) => EditorState
}

const EditorContainer = styled.div`
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  padding: 10px;
`

const ButtonGroupContainer = styled.div`
  margin-bottom: 10px;
`

const baseButtons: RichTextEditorButton[] = [
  { content: 'Bold', icon: 'bold', action: 'bold' },
  { content: 'Italic', icon: 'italic', action: 'italic' },
  {
    content: 'Underline',
    icon: 'underline',
    action: 'underline'
  },
  { content: 'Code', icon: 'code', action: 'code' }
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
  availableBaseActions,
  label,
  customStyleMap,
  customActions,
  customKeyBindingFn,
  customKeyCommandFn
}: RichTextEditorProps) => {
  const [activeButtons, setActiveButtons] = useState<RichTextEditorAction[]>([])
  const availableBaseButtons = availableBaseActions.map(
    (action) =>
      baseButtons.find(
        (button) => button.action === action
      ) as RichTextEditorButton
  )

  const allActiveButtons = [...availableBaseButtons, ...(customActions ?? [])]

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
      isBaseButtonType(_.lowerCase(activeStyleObject[key]))
        ? _.lowerCase(activeStyleObject[key])
        : activeStyleObject[key]
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
    (action: RichTextEditorAction | string) => {
      const newState = RichUtils.toggleInlineStyle(
        editorState,
        isBaseButtonType(action) ? _.upperCase(action) : action
      )
      if (newState) {
        onChange(newState)
      }
    },
    [onChange, editorState]
  )

  const isBaseButtonType = (command: string): boolean => {
    switch (command) {
      case 'bold':
      case 'italic':
      case 'underline':
      case 'code':
      case 'strikethrough':
        return true
      default:
        return false
    }
  }

  const isButtonActive = useCallback(
    (button: RichTextEditorButton) => {
      const isButtonActive = !!activeButtons.find(
        (action) => button.action === action
      )

      const currentlyAppliedStyles = editorState
        .getCurrentInlineStyle()
        .toArray()

      const currentSelectionHasInlineStyle = currentlyAppliedStyles.find(
        (value) => _.lowerCase(value as string) === _.lowerCase(button.action)
      )

      return isButtonActive && currentSelectionHasInlineStyle
    },
    [activeButtons, editorState, isBaseButtonType]
  )

  const handleKeyCommand = useCallback(
    (command: string, state: EditorState): DraftHandleValue => {
      const isAvailable = !!allActiveButtons.find(
        (button) => button.action === command
      )
      let newState: EditorState | null
      const isBaseButton = isBaseButtonType(command)
      newState = RichUtils.handleKeyCommand(state, command)
      if (isBaseButton || (!isBaseButton && !customKeyCommandFn)) {
        newState = RichUtils.handleKeyCommand(state, command)
      } else {
        newState = customKeyCommandFn
          ? customKeyCommandFn(command, state)
          : null
      }
      if (!isAvailable || !newState) {
        return 'not-handled'
      }
      onChange(newState)
      return 'handled'
    },
    [allActiveButtons, isBaseButtonType, customKeyCommandFn, onChange]
  )

  return (
    <Form.Field>
      <label>{label}</label>
      {allActiveButtons.length > 0 ? (
        <ButtonGroupContainer>
          <ButtonGroup>
            {allActiveButtons.map((button) => {
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
                        type="button"
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
          customStyleMap={customStyleMap}
          keyBindingFn={customKeyBindingFn}
        />
      </EditorContainer>
    </Form.Field>
  )
}

export default RichTextEditor
