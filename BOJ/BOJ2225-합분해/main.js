// 합분해
// https://www.acmicpc.net/problem/2225

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let dp, N, K;
const mod = 1000000000;

function init() {
  // dp 배열 초기화
  dp = new Array(K + 1);
  for (let i = 0; i <= K; i++) {
    dp[i] = new Array(N + 1).fill(0);
  }

  // 1개의 숫자로 나타내는 경우는 모든 수에서 1가지 밖에 없음
  for (let i = 0; i <= N; i++) {
    dp[1][i] = 1;
  }
}

rl.on('line', (line) => {
  [N, K] = line.split(' ').map((num) => parseInt(num));
  rl.close();
}).on('close', () => {
  init();
  // 현재 n 값보다 같거나 작은값을 더한것을 뺀 숫자일때의 경우를 모두 더해줌 (k - 1번째)
  for (let i = 2; i <= K; i++) {
    for (let j = 0; j <= N; j++) {
      for (let l = 0; l <= j; l++) {
        dp[i][j] += dp[i - 1][j - l];
      }
      dp[i][j] %= mod;
    }
  }

  console.log(dp[K][N] % mod);
  process.exit();
});
