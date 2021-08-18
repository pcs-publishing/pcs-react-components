import React from 'react'
import useCallOnEscapeUp from './useCallOnEscapeUp'
import { render, screen, fireEvent } from '@testing-library/react'


const TestComponent = (props: { callback: () => void }) => {
  useCallOnEscapeUp(props.callback)
  return <input data-testid="input" type="text" />
}

describe('useCallOnEscapeUp', () => {
  it('Should call the function when the escape key is pressed', () => {

    const callback = jest.fn()

    render(<TestComponent callback={callback} />)

    const field = screen.getByTestId('input')

    expect(callback).not.toBeCalled()
    fireEvent.keyUp(field, { key: 'Escape', code: 'Escape', charCode: 27 })
    expect(callback).toBeCalled()
  })
})
