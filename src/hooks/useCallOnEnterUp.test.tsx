import React from 'react'
import useCallOnEnterUp from './useCallOnEnterUp'
import { render, screen, fireEvent } from '@testing-library/react'


const TestComponent = (props: { callback: () => void }) => {
  useCallOnEnterUp(props.callback)
  return <input data-testid="input" type="text" />
}

describe('useCallOnEnterUp', () => {
  it('Should call the function when the enter key is pressed', () => {

    const callback = jest.fn()

    render(<TestComponent callback={callback} />)

    const field = screen.getByTestId('input')

    expect(callback).not.toBeCalled()
    fireEvent.keyUp(field, { key: 'Enter', code: 13, charCode: 13 })
    expect(callback).toBeCalled()

    
  })
})