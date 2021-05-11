import { instanceOfContextMenuItem, instanceOfSubMenuItem } from './contextMenu'

describe('ContextMenu Utils', () => {
  describe('is valid context menu item', () => {
    it('Should return true when passed a valid context menu item', () => {
      const result = instanceOfContextMenuItem({
        action: 'action',
        icon: 'accessible',
        text: 'Item'
      })
      expect(result).toBe(true)
    })
    it('Should return false when passed a invalid context menu item', () => {
      const result = instanceOfContextMenuItem({
        items: [{ text: 'Text', icon: 'accessible', action: 'action' }],
        text: 'Item'
      })
      expect(result).toBe(false)
    })
  })

  describe('is valid sub menu item', () => {
    it('Should return true when passed a valid sub menu item', () => {
      const result = instanceOfSubMenuItem({
        items: [{ text: 'Text', icon: 'accessible', action: 'action' }],
        text: 'Item'
      })
      expect(result).toBe(true)
    })
    it('Should return false when passed a invalid sub menu item', () => {
      const result = instanceOfSubMenuItem({
        action: 'action',
        icon: 'accessible',
        text: 'Item'
      })
      expect(result).toBe(false)
    })
  })
})
