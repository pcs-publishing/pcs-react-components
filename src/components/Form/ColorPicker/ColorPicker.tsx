import React, { useState } from 'react'
import styled from 'styled-components'
import { SketchPicker, ColorResult } from 'react-color'
import { Form, Icon } from 'semantic-ui-react'
import Color from 'color'
import Overlay from '../../Popups/Overlay'

export interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
  presetColors?: string[]
}

const StyledSwatchInput = styled.div.attrs((props: { color: string }) => ({
  style: {
    backgroundColor: props.color
  }
}))`
  border-radius: 3px;
  width: 100%;
  cursor: Pointer;
  height: 35px;
`

const PopOver = styled.div`
  position: absolute;
  z-index: 2;
  padding-top: 5px;
`

const IconContainer = styled.div<{ light: boolean }>`
  float: right;
  position: relative;
  top: 9px;
  left: -3px;
  color: ${(props) => (props.light ? '#444' : '#eee')};
`

const ColorPicker = (props: ColorPickerProps) => {
  const [color, setColor] = useState(props.value || '#112233')
  const [showPicker, setShowPicker] = useState(false)

  const colorInspector = Color(color)
  const isDark = colorInspector.isDark()

  return (
    <Form.Field>
      {props.label ? (<label>{props.label}</label>) : null}
      <StyledSwatchInput color={color} onClick={() => setShowPicker(true)}>
        <IconContainer light={!isDark}>
          <Icon name="caret down" />
        </IconContainer>
      </StyledSwatchInput>
      {showPicker ? (
        <PopOver>
          <Overlay
            onClick={() => {
              setShowPicker(false)
              props.onChange(color)
            }}
          />
          <SketchPicker
            color={color}
            disableAlpha
            onChange={(colorResult: ColorResult) => {
              setColor(colorResult.hex)
            }}
            presetColors={props.presetColors}
          />
        </PopOver>
      ) : null}
    </Form.Field>
  )
}

export default ColorPicker
