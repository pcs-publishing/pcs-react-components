import { formatDropdownOptions } from './format';


describe('format', () => {
  describe('formatDropdownOptions', () => {
    it('Should format the records into dropdown options', () => {
      const records = [{
        id: 1,
        name: 'Person 1'
      }, {
        id: 2,
        name: 'Person 2'
      }, {
        id: 3,
        name: 'Person 3'
      }, {
        id: 4,
        name: 'Person 4'
        }]
      
      const result = formatDropdownOptions(records, 'id', 'name')

      expect(result).toEqual([{
        key: 1,
        text: 'Person 1',
        value: 1
      }, {
        key: 2,
        text: 'Person 2',
        value: 2
      }, {
        key: 3,
        text: 'Person 3',
        value: 3
      }, {
        key: 4,
        text: 'Person 4',
        value: 4
      }])
    })
  })
})