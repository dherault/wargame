// http://www.mathcs.emory.edu/~cheung/Courses/171/Syllabus/9-BinTree/heap-intro.html
// A Heap capable of containing literals as data
// Cannot hold the same data twice
class Heap {

  constructor() {
    this.list = [[0, null]]
    this.hasData = { [null]: true }
  }

  get size() {
    return this.list.length - 1
  }

  insert(priority, data) {
    this.list.push([priority, data])

    this.hasData[data] = true

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

  percolateDown(i) {
    while (2 * i <= this.size) {
      const minChildIndex = this.minChildIndex(i)

      if (this.list[i][0] > this.list[minChildIndex][0]) {
        [this.list[i], this.list[minChildIndex]] = [this.list[minChildIndex], this.list[i]]
      }

      i = minChildIndex
    }
  }

  extractMin() {
    [this.list[this.size], this.list[1]] = [this.list[1], this.list[this.size]]

    const retval = this.list.splice(-1, 1)[0]

    this.percolateDown(1)

    this.hasData[retval[1]] = false

    return retval
  }

  minChildIndex(i) {
    if (2 * i + 1 > this.size) {
      return 2 * i
    }

    if (this.list[2 * i][0] < this.list[2 * i + 1][0]) {
      return 2 * i
    }

    return 2 * i + 1
  }

  has(data) {
    return this.hasData[data] || false
  }

  deleteByData(data) {
    const index = this.list.findIndex(item => item[1] === data)

    const retval = this.list[index]

    this.list[index] = this.list[this.size]

    this.list.splice(this.size, 1)

    this.hasData[data] = false

    // If the removed element was the last element
    // the heap is still a heap
    if (index === this.size + 1) return

    const parentIndex = Math.floor(index / 2)

    if (index === 1 || this.list[parentIndex] < this.list[index]) {
      this.percolateDown(index)
    }
    else {
      this.percolateUp(index)
    }

    return retval
  }

}

export default Heap
