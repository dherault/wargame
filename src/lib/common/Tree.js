class Tree {

  constructor() {
    this.data = []
    this.indexToParentIndex = []
  }

  addNode(data, parentIndex) {
    const index = this.data.push(data) - 1

    this.indexToParentIndex[index] = parentIndex

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
}

export default Tree
