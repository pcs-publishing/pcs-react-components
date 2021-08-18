import React from 'react'
import useCallOnKeyUp from './useCallOnKeyUp'
import { render, screen, fireEvent } from '@testing-library/react'


const TestComponent = (props: { code: string, callback: () => void }) => {
  useCallOnKeyUp(props.code, props.callback)
  return <input data-testid="input" type="text" />
}

describe('useCallOnKeyUp', () => {
  it('Should call the function when the appropriate key is pressed', () => {

    const callback = jest.fn()

    render(<TestComponent code={'KeyA'} callback={callback} />)

    const field = screen.getByTestId('input')

    expect(callback).not.toBeCalled()
    fireEvent.keyUp(field, { key: 'a', code: 'KeyA', charCode: 65 })
    expect(callback).toBeCalled()
  })
})
