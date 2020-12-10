export function formatDropdownOptions<T, K extends keyof T>(
  records: T[],
  idProperty: K,
  textProperty: K
) {
  return records.map((record) => ({
    key: record[idProperty],
    text: record[textProperty],
    value: record[idProperty]
  }))
}
