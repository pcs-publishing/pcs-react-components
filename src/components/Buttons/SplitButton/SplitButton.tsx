import React from 'react'
import { SemanticCOLORS } from 'semantic-ui-react'
import Button, { ButtonGroup } from '../../Semantic-Themed/Button'

export interface SplitButtonProps<T> {
  primary?: boolean
  color?: SemanticCOLORS
  items: { value: T; label?: string }[]
  value: T
  basic?: boolean
  onChange: (value: T) => void
}

const SplitButton = <T extends string>(props: SplitButtonProps<T>) => {
  const buttons = props.items.map(({ value, label }, index) => {
    const selected = props.value === value

    let buttonProps: Partial<{ color: SemanticCOLORS; primary: boolean }> = {}

    if (selected) {
      buttonProps = { color: props.color, primary: props.primary }
    }

    return (
      <Button
        index={value}
        key={value}
        basic={props.basic}
        onClick={() => {
          if (!selected) props.onChange(value)
        }}
        {...buttonProps}
      >
        {label ?? value}
      </Button>
    )
  })

  return <ButtonGroup>{buttons}</ButtonGroup>
}

export default SplitButton
