/* global describe it */
import { assert } from 'chai'
import Tree from '../src/lib/common/Tree'

describe('Tree', () => {

  it('should create an tree', () => {

    let error

    try {
      // eslint-disable-next-line no-new
      new Tree()
    }
    catch (err) {
      error = err
    }

    assert.equal(error, undefined)
  })

  const data = { some: 1, random: 2, data: 3 }

  it('should insert root node without error', () => {

    const tree = new Tree()
    let error

    try {
      tree.addNode(data)
    }
    catch (err) {
      error = err
    }

    assert.equal(error, undefined)
  })

  it('should insert child nodes without error', () => {

    const tree = new Tree()
    let error

    try {
      const rootIndex = tree.addNode(0)
      const oneIndex = tree.addNode(1, rootIndex)
      tree.addNode(2, rootIndex)
      tree.addNode(3, oneIndex)
    }
    catch (err) {
      error = err
    }

    assert.equal(error, undefined)
  })

  it('should retrieve data', () => {

    const tree = new Tree()
    const rootIndex = tree.addNode(0)
    const oneIndex = tree.addNode(1, rootIndex)
    const twoIndex = tree.addNode(2, rootIndex)
    const treeIndex = tree.addNode(3, oneIndex)

    assert.equal(tree.getData(rootIndex), 0)
    assert.equal(tree.getData(oneIndex), 1)
    assert.equal(tree.getData(twoIndex), 2)
    assert.equal(tree.getData(treeIndex), 3)
  })

  it('should retrieve children', () => {

    const tree = new Tree()
    const rootIndex = tree.addNode(0)
    const oneIndex = tree.addNode(1, rootIndex)
    const twoIndex = tree.addNode(2, rootIndex)
    const treeIndex = tree.addNode(3, oneIndex)

    assert.deepEqual(tree.getChildren(rootIndex), [oneIndex, twoIndex])
    assert.deepEqual(tree.getChildren(oneIndex), [treeIndex])
    assert.deepEqual(tree.getChildren(twoIndex), [])
    assert.deepEqual(tree.getChildren(treeIndex), [])
  })

  it('should retrieve children data', () => {

    const tree = new Tree()
    const rootIndex = tree.addNode(0)
    const oneIndex = tree.addNode(1, rootIndex)
    const twoIndex = tree.addNode(2, rootIndex)
    const treeIndex = tree.addNode(3, oneIndex)

    assert.deepEqual(tree.getChildrenData(rootIndex), [1, 2])
    assert.deepEqual(tree.getChildrenData(oneIndex), [3])
    assert.deepEqual(tree.getChildrenData(twoIndex), [])
    assert.deepEqual(tree.getChildrenData(treeIndex), [])
  })

  it('should hold multiple roots', () => {

    const tree = new Tree()
    const rootIndex1 = tree.addNode(1)
    const rootIndex2 = tree.addNode(2)

    assert.deepEqual(tree.rootIndexes, [rootIndex1, rootIndex2])
  })

  it.only('should traverseDown correclty', () => {

    const tree = new Tree()
    const rootIndex1 = tree.addNode(1)
    const rootIndex2 = tree.addNode(2)
    const childIndex1 = tree.addNode(3, rootIndex1)
    const childIndex2 = tree.addNode(4, rootIndex1)
    const childIndex3 = tree.addNode(5, childIndex1)
    const childIndex4 = tree.addNode(6, rootIndex2)

    const resultIndexes = []
    const resultParentIndexes = []

    tree.traverseDown((index, parentIndex) => {
      resultIndexes.push(index)
      resultParentIndexes.push(parentIndex)
    })

    assert.deepEqual(resultIndexes, [rootIndex1, childIndex1, childIndex2, childIndex3, rootIndex2, childIndex4])
    assert.deepEqual(resultParentIndexes, [null, rootIndex1, rootIndex1, childIndex1, null, rootIndex2])
  })

})
