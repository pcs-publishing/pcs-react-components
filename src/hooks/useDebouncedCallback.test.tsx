import React, { useState } from 'react'
import { render, screen } from '@testing-library/react'
import useDebouncedCallback from './useDebouncedCallback';

const TestComponent = (props: { onChange: (value: number) => void }) => {
  const [value, setValue] = useState(0)
  const debouncedCallback = useDebouncedCallback(props.onChange, [], 20)

  const onClick = () => {
    setValue(current => {
      const newValue = current + 1
      debouncedCallback(newValue)
      return newValue
    })
  }

  return <>
    <p>{value}</p>
    <button onClick={onClick}>Increment</button>
  </>
}

const wait = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}


describe('useDebouncedCallback', () => {
  it('Should delay until calling the callback until it has not been hit for the delay time, the call should be the most recent call', async () => {
    const callback = jest.fn()
    render(<TestComponent onChange={callback} />)

    const button = screen.getByText('Increment')

    // Click the increment button four times
    button.click()
    button.click()
    button.click()
    button.click()


    await wait(25)

    expect(callback).toBeCalledWith(4)
    expect(callback).toBeCalledTimes(1)
  })

})
