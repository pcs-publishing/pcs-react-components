import { getFilenameInfo } from './filename'

describe('filename', () => {
  describe('getFilenameInfo', () => {
    it('Should return the name and extension from a valid filename', () => {
      const example = 'covid.vir'
      const { name, extension } = getFilenameInfo(example)

      expect(name).toBe('covid')
      expect(extension).toBe('.vir')
    })
  })
})
