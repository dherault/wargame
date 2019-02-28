/* global describe it */
import { assert } from 'chai'
import { combineArrayItems } from '../src/lib/common/utils'

describe('Utils', () => {
  
  describe('combineArrayItems', () => {

    it('should combine no items', () => {
      assert.deepEqual(combineArrayItems([]), [])
      assert.deepEqual(combineArrayItems([[]]), [])
      assert.deepEqual(combineArrayItems([[], []]), [])
    })

    it('should combine one array items', () => {
      const items1 = [
        [1],
      ]
      const combinaisons1 = [
        [1],
      ]

      const items2 = [
        [1, 2],
      ]
      const combinaisons2 = [
        [1],
        [2],
      ]

      assert.deepEqual(combineArrayItems(items1), combinaisons1)
      assert.deepEqual(combineArrayItems(items2), combinaisons2)
    })

    it('should combine multiple array items', () => {
      const items = [
        [[1, 2], [3, 4]],
        [[11, 12]],
      ]
      const combinaisons = [
        [[1, 2], [11, 12]],
        [[3, 4], [11, 12]],
      ]

      assert.deepEqual(combineArrayItems(items), combinaisons)
    })
  })

})
