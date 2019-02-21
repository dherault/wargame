import { assert } from 'chai'
import Heap from '../src/lib/common/Heap'

describe('Heap', () => {
  
  it('should create an heap', () => {

    let error

    try {
      new Heap()
    }
    catch (err) {
      error = err
    }

    assert.equal(error, undefined)
  })

  it('should insert elements without error', () => {

    const heap = new Heap()
    let error

    try {
      heap.insert(5, 5)
      heap.insert(2, 2)
      heap.insert(1, 1)
      heap.insert(4, 4)
      heap.insert(3, 3)
    }
    catch (err) {
      error = err
    }

    assert.equal(error, undefined)
  })

  const heap = new Heap()
  heap.insert(5, 5)
  heap.insert(2, 2)
  heap.insert(1, 1)
  heap.insert(4, 4)
  heap.insert(3, 3)

  it('should have a size', () => {
    assert.equal(heap.size, 5)
  })

  it('should extract minimum value', () => {
    assert.deepEqual(heap.extractMin(), [1, 1])
    assert.deepEqual(heap.extractMin(), [2, 2])
    assert.deepEqual(heap.extractMin(), [3, 3])
    assert.deepEqual(heap.extractMin(), [4, 4])
    assert.deepEqual(heap.extractMin(), [5, 5])
  })

})