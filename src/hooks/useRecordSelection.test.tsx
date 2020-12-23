import React from 'react'
import useRecordSelection from './useRecordSelection';
import { render, screen, fireEvent } from '@testing-library/react'

const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]

const TestComponent = (props: { onSelectionChange: (item: { id: number }[]) => void }) => {


  const { selectRecord, isRecordSelected } = useRecordSelection({
    records: items,
    idField: 'id',
    selectionMode: 'single',
    onRecordSelectionChange: props.onSelectionChange
  })

  return <>
    {items.map(item => (
      <button
        key={item.id.toString()}
        data-testid={`item-${item.id}`}
        onClick={() => {
          selectRecord(item)
        }}
      >
        {`${isRecordSelected(item) ? 'SELECTED' : 'NOT SELECTED'}`}
      </button>
    ))}
  </>
}


describe('useRecordSelection', () => {
  it('Should select the record when selectRecord is called, once another record is selected the old record should be unselected', () => {
    const mock = jest.fn()

    render(<TestComponent onSelectionChange={mock} />)

    expect(mock).not.toBeCalled()

    const item1Button = screen.getByTestId('item-1')
    const item2Button = screen.getByTestId('item-2')

    expect(item1Button?.firstChild?.nodeValue).toBe('NOT SELECTED')
    expect(item2Button?.firstChild?.nodeValue).toBe('NOT SELECTED')

    item1Button?.click()

    expect(item1Button?.firstChild?.nodeValue).toBe('SELECTED')
    expect(item2Button?.firstChild?.nodeValue).toBe('NOT SELECTED')

    item2Button?.click()

    expect(item1Button?.firstChild?.nodeValue).toBe('NOT SELECTED')
    expect(item2Button?.firstChild?.nodeValue).toBe('SELECTED')

    expect(mock).toBeCalledWith([{ id: 1 }])
  })
})