// ps를 위한 우선순위큐 구현
class PriorityQueue {
  constructor(minHeap) {
    this.heap = [];
    this.minHeap = minHeap; // true일시 minHeap, false일시 maxHeap
  }
  _compare(a, b) {
    if (this.minHeap) {
      return a < b;
    } else {
      return a > b;
    }
  }
  _getParentIndex(n) {
    return Math.ceil(n / 2) - 1;
  }
  _getLeftChildIndex(n) {
    return 2 * n + 1;
  }
  _getRightChildIndex(n) {
    return 2 * n + 2;
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  push(cost, item) {
    this.heap.push([cost, item]);
    let currIndex = this.size() - 1;
    while (
      0 < currIndex &&
      this._compare(
        this.heap[currIndex][0],
        this.heap[this._getParentIndex(currIndex)][0]
      )
    ) {
      this.heap[currIndex] = this.heap[this._getParentIndex(currIndex)];
      this.heap[this._getParentIndex(currIndex)] = [cost, item];
      currIndex = this._getParentIndex(currIndex);
    }
  }
  pop() {
    if (this.isEmpty()) return null;
    if (this.size() === 1) return this.heap.pop();
    const top = this.heap[0];
    const lastItem = this.heap.pop();
    this.heap[0] = lastItem;
    let currIndex = 0;
    while (this._getLeftChildIndex(currIndex) < this.size()) {
      // child가 둘 다 있을 시
      if (this._getRightChildIndex(currIndex) < this.size()) {
        // compare 비교를 통해 child 선택
        const compareIndex = this._compare(
          this.heap[this._getLeftChildIndex(currIndex)][0],
          this.heap[this._getRightChildIndex(currIndex)][0]
        )
          ? this._getLeftChildIndex(currIndex)
          : this._getRightChildIndex(currIndex);

        this.heap[currIndex] = this.heap[compareIndex];
        this.heap[compareIndex] = lastItem;
        currIndex = compareIndex;
      } else if (
        // // left child만 있을 시
        this._compare(
          this.heap[this._getLeftChildIndex(currIndex)][0],
          this.heap[currIndex][0]
        )
      ) {
        this.heap[currIndex] = this.heap[this._getLeftChildIndex(currIndex)];
        this.heap[this._getLeftChildIndex(currIndex)] = lastItem;
        currIndex = this._getLeftChildIndex(currIndex);
      } else break;
    }
    return top;
  }
}

export default PriorityQueue;
