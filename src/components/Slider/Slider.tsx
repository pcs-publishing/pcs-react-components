import React from 'react'
import { Slider } from 'react-semantic-ui-range'
import useTheme from '../../hooks/useTheme'
import styled from '../../theme-styled'

export interface SliderProps {
  min?: number
  max?: number
  value?: number
  step?: number
  onChange?: (value: number) => void
  className?: string
}

const SliderCmp = (props: SliderProps) => {
  const settings = {
    min: 1,
    max: 100,
    step: 1,
    ...props
  }
  const theme = useTheme()
  const style = { trackFill: { backgroundColor: theme.colors.primary } }

  return <div className={props.className}>
    <Slider value={props.value} settings={settings} style={style} />
  </div>
}

export default React.memo(SliderCmp)
