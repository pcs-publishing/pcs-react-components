/**
 * Get the name and extension for the passed filename
 *
 * @param filename The filename to get the info on
 *
 * @returns The name and extension taken from the full filename
 */
export function getFilenameInfo(
  filename: string
): { name: string; extension: string } {
  filename = filename ?? ''
  const index = filename.lastIndexOf('.')
  let name = filename
  let extension = ''

  if (index > 0) {
    name = filename.substring(0, index)
    extension = filename.substring(index)
  }

  return { name, extension }
}
