// 간선 이어가기 2
// https://www.acmicpc.net/problem/14284

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs = [];
let n, m, graph, cost, s, t;

class PriorityQueue {
  curr = 0;
  parent = (i) => ((i + 1) >>> 1) - 1;
  left = (i) => (i << 1) + 1;
  right = (i) => (i + 1) << 1;

  constructor(minHeap) {
    this._heap = [];
    this._comparator = minHeap ? (a, b) => cost[a] < cost[b] : (a, b) => b < a;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  top() {
    return this._heap[this.curr];
  }
  push(...values) {
    values.forEach((value) => {
      this._heap.push(value);
      this._shiftUp();
    });
  }
  pop() {
    const poppedValue = this.top();
    const bottom = this.size() - 1;
    if (bottom > this.curr) this._swap(this.curr, bottom);
    this._heap.pop();
    this._shiftDown();
    return poppedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _shiftUp() {
    let node = this.size() - 1;
    while (node > this.curr && this._greater(node, this.parent(node))) {
      this._swap(node, this.parent(node));
      node = this.parent(node);
    }
  }
  _shiftDown() {
    let node = this.curr;
    while (
      (this.left(node) < this.size() && this._greater(this.left(node), node)) ||
      (this.right(node) < this.size() && this._greater(this.right(node), node))
    ) {
      let maxChild =
        this.right(node) < this.size() &&
        this._greater(this.right(node), this.left(node))
          ? this.right(node)
          : this.left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}

const input = (line) => {
  inputs.push(line);
};

const solve = () => {
  [n, m] = inputs[0].split(' ').map((a) => parseInt(a));
  graph = Array.from(Array(n + 1), () => []);
  cost = new Array(n + 1).fill(100 * n + 1);
  for (let i = 0; i < m; i++) {
    const [a, b, c] = inputs[1 + i].split(' ').map((a) => parseInt(a));
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }
  [s, t] = inputs[m + 1].split(' ').map((a) => parseInt(a));

  const pq = new PriorityQueue(true);
  cost[s] = 0;
  pq.push(s);
  while (!pq.isEmpty()) {
    const curr = pq.pop();
    if (curr === t) {
      console.log(cost[curr]);
      break;
    }

    for (let i = 0; i < graph[curr].length; i++) {
      const [next, w] = graph[curr][i];
      if (cost[next] > cost[curr] + w) {
        cost[next] = cost[curr] + w;
        pq.push(next);
      }
    }
  }
};

rl.on('line', (line) => input(line)).on('close', solve);
