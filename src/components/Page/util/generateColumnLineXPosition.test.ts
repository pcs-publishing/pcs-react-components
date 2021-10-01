import generateColumnLineXPositions from './generateColumnLineXPositions'

describe('generateColumnLineXPositions', () => {
  it('Should be able to return the lines for a given page size, with no gutter', () => {
    const pageLineXPositions = generateColumnLineXPositions({
      innerWidth: 100,
      gutter: 0,
      columns: 5
    })

    expect(pageLineXPositions).toEqual([20, 40, 60, 80])
  })

  it('Should be able to return the lines for a given page size, with a gutter', () => {
    const pageLineXPositions = generateColumnLineXPositions({
      innerWidth: 15,
      gutter: 1,
      columns: 4
    })

    expect(pageLineXPositions).toEqual([3, 4, 7, 8, 11, 12])
  })
})
