// A tree that can have multiple roots (multiple tree in it)
class Tree {

  constructor() {
    this.rootIndexes = []
    this.data = []
    this.indexToParentIndex = []
  }

  addNode(data, parentIndex = null) {
    const index = this.data.push(data) - 1

    if (parentIndex === null) {
      this.rootIndexes.push(index)
    }
    else {
      this.indexToParentIndex[index] = parentIndex
    }

    return index
  }

  getData(index) {
    return this.data[index]
  }

  getChildren(index) {
    const children = []

    this.indexToParentIndex.forEach((parentIndex, i) => {
      if (parentIndex === index) {
        children.push(i)
      }
    })

    return children
  }

  getChildrenData(index) {
    return this.getChildren(index).map(i => this.getData(i))
  }

  traverseDown(fn) {
    this.rootIndexes.forEach(rootIndex => {
      const queue = [[rootIndex, null]]

      while (queue.length) {
        const [index, parentIndex] = queue.shift() 

        queue.push(...this.getChildren(index).map(childIndex => [childIndex, index]))
        
        fn(index, parentIndex)
      }
    })
  }
}

export default Tree
