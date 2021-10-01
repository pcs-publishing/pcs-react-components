function generateColumnLineXPositions(params: {
  innerWidth: number
  gutter: number
  columns: number
}): number[] {
  const { innerWidth, gutter, columns } = params

  const totalGutter = gutter * (columns - 1)
  const columnWidth = (innerWidth - totalGutter) / columns
  let columnLines: number[] = []

  for (let i = 1; i < columns; i++) {
    const gutterOffset = (i - 1) * gutter
    const columnPosition = columnWidth * i + gutterOffset

    if (gutter <= 0) {
      columnLines.push(columnPosition)
    } else {
      columnLines = columnLines.concat([
        columnPosition,
        columnPosition + gutter
      ])
    }
  }

  return columnLines
}

export default generateColumnLineXPositions
