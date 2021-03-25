import React, { useState } from 'react'
import { render, screen } from '@testing-library/react'
import useDelayedFunction from './useDelayedFunction';

const TestComponent = (props: { onChange: (value: number) => void }) => {
  const [value, setValue] = useState(0)
  const debouncedFunction = useDelayedFunction(props.onChange, 20)

  const onClick = () => {
    setValue(current => {
      const newValue = current + 1
      debouncedFunction(newValue)
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


describe('useDelayedFunction', () => {
  it('Should delay until calling the function until it has not been hit for the delay time, the call should be the most recent call', async () => {
    const handler = jest.fn()
    render(<TestComponent onChange={handler} />)

    const button = screen.getByText('Increment')

    // Click the increment button four times
    button.click()
    button.click()
    button.click()
    button.click()


    await wait(25)

    expect(handler).toBeCalledWith(4)
    expect(handler).toBeCalledTimes(1)
  })

})
