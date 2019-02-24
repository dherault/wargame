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

  it('should have a size', () => {
    const heap = new Heap()
    heap.insert(5, 5)
    heap.insert(2, 2)
    heap.insert(1, 1)
    heap.insert(4, 4)
    heap.insert(3, 3)

    assert.equal(heap.size, 5)
  })

  it('should extract minimum value', () => {
    const heap = new Heap()
    heap.insert(5, 5)
    heap.insert(2, 2)
    heap.insert(1, 1)
    heap.insert(4, 4)
    heap.insert(3, 3)

    assert.deepEqual(heap.extractMin(), [1, 1])
    assert.deepEqual(heap.extractMin(), [2, 2])
    assert.deepEqual(heap.extractMin(), [3, 3])
    assert.deepEqual(heap.extractMin(), [4, 4])
    assert.deepEqual(heap.extractMin(), [5, 5])
  })

  it('should delete items by data', () => {
    let heap = new Heap()
    heap.insert(5, 5)
    heap.insert(2, 2)
    heap.insert(1, 1)
    heap.insert(4, 4)
    heap.insert(3, 3)
    heap.deleteByData(2)
    heap.deleteByData(3)

    assert.deepEqual(heap.extractMin(), [1, 1])
    assert.deepEqual(heap.extractMin(), [4, 4])
    assert.deepEqual(heap.extractMin(), [5, 5])

    heap = new Heap()
    heap.insert(2, 2)
    heap.insert(1, 1)
    heap.insert(4, 4)
    heap.insert(3, 3)
    heap.insert(5, 5)
    heap.deleteByData(5) // special case: delete the last item, still a heap, no need to percolate

    assert.deepEqual(heap.extractMin(), [1, 1])
    assert.deepEqual(heap.extractMin(), [2, 2])
    assert.deepEqual(heap.extractMin(), [3, 3])
    assert.deepEqual(heap.extractMin(), [4, 4])
  })

  it('should has item by data', () => {
    const heap = new Heap()
    heap.insert(5, 5)
    heap.insert(2, 2)
    heap.insert(1, 1)
    heap.insert(4, 4)
    heap.insert(3, 3)

    assert.isTrue(heap.has(1))
    assert.isTrue(heap.has(2))
    assert.isTrue(heap.has(3))
    assert.isTrue(heap.has(4))
    assert.isTrue(heap.has(5))

    heap.extractMin()

    assert.isFalse(heap.has(1))
  })

})