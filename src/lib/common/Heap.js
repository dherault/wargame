class Heap {

  constructor() {
    this.list = [[0, null]]
    
  }

  get size() {
    return this.list.length - 1
  }

  insert(priority, data) {
    this.list.push([priority, data])
    this.percolateUp(this.size)
  }

  percolateUp(i) {
    let halfI = Math.floor(i / 2)

    while (halfI) {
      if (this.list[i][0] < this.list[halfI][0]) {
        [this.list[i], this.list[halfI]] = [this.list[halfI], this.list[i]]
      }

      i = halfI
      halfI = Math.floor(halfI / 2)
    }
  }

  extractMin() {
    [this.list[this.size], this.list[1]] = [this.list[1], this.list[this.size]]

    const retval = this.list.splice(-1, 1)[0]

    this.percolateDown(1)

    return retval
  }

  percolateDown(i) {
    while (2 * i <= this.size) {
      const minChildIndex = this.minChildIndex(i)

      if (this.list[i][0] > this.list[minChildIndex][0]) {
        [this.list[i], this.list[minChildIndex]] = [this.list[minChildIndex], this.list[i]]
      }

      i = minChildIndex
    }
  }

  minChildIndex(i) {
    if (2 * i + 1 > this.size) {
      return 2 * i
    }
    else if (this.list[2 * i][0] < this.list[2 * i + 1][0]) {
      return 2 * i
    }
    else {
      return 2 * i + 1
    }
  }
}

export default Heap