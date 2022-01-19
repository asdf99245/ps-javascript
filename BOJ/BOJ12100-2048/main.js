// 2048(Easy)
// https://www.acmicpc.net/problem/12100
// 배열을 call by value로 부르는법을 알아내야함

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n,
  board = [],
  maxB = 0;

const play = (dir, cnt, bd) => {
  if (cnt === 5) {
    // 5번까지 이동했다면 종료
    return;
  }

  let tmp = [];
  // 현재 보드 복사
  for (let i = 0; i < n; i++) {
    tmp[i] = bd[i].slice();
  }

  if (dir === 0) {
    // 상
    for (let j = 0; j < n; j++) {
      let prev = 0,
        prevInd = 0;
      for (let i = 0; i < n; i++) {
        if (tmp[i][j] !== 0) {
          // 블록이 있다면
          if (prev && tmp[i][j] === prev) {
            // 이전블록이 있고 이전블록과 같은 수라면 합침
            tmp[prevInd][j] = 2 * prev;
            if (maxB < 2 * prev) maxB = 2 * prev;
            tmp[i][j] = 0;
            prev = 0;
          } else {
            // 이전블록 기록
            prev = tmp[i][j];
            prevInd = i;
          }
        }
      }

      let ind = 0;
      for (let i = 0; i < n; i++) {
        if (tmp[i][j] !== 0) {
          tmp[ind][j] = tmp[i][j];
          if (i !== ind) {
            tmp[i][j] = 0;
          }
          ind++;
        }
      }
    }
  } else if (dir === 1) {
    //하
    for (let j = 0; j < n; j++) {
      let prev = 0,
        prevInd = 0;
      for (let i = n - 1; i >= 0; i--) {
        if (tmp[i][j] !== 0) {
          if (prev && tmp[i][j] === prev) {
            tmp[prevInd][j] = 2 * prev;
            if (maxB < 2 * prev) maxB = 2 * prev;
            tmp[i][j] = 0;
            prev = 0;
          } else {
            prev = tmp[i][j];
            prevInd = i;
          }
        }
      }

      let ind = n - 1;
      for (let i = n - 1; i >= 0; i--) {
        if (tmp[i][j] !== 0) {
          tmp[ind][j] = tmp[i][j];
          if (i !== ind) {
            tmp[i][j] = 0;
          }
          ind--;
        }
      }
    }
  } else if (dir === 2) {
    // 좌
    for (let i = 0; i < n; i++) {
      let prev = 0,
        prevInd = 0;
      for (let j = 0; j < n; j++) {
        if (tmp[i][j] !== 0) {
          if (prev && tmp[i][j] === prev) {
            tmp[i][prevInd] = 2 * prev;
            if (maxB < 2 * prev) maxB = 2 * prev;
            tmp[i][j] = 0;
            prev = 0;
          } else {
            prev = tmp[i][j];
            prevInd = j;
          }
        }
      }

      let ind = 0;
      for (let j = 0; j < n; j++) {
        if (tmp[i][j] !== 0) {
          tmp[i][ind] = tmp[i][j];
          if (j !== ind) {
            tmp[i][j] = 0;
          }
          ind++;
        }
      }
    }
  } else {
    // 우
    for (let i = 0; i < n; i++) {
      let prev = 0,
        prevInd = 0;
      for (let j = n - 1; j >= 0; j--) {
        if (tmp[i][j] !== 0) {
          if (prev && tmp[i][j] === prev) {
            tmp[i][prevInd] = 2 * prev;
            if (maxB < 2 * prev) maxB = 2 * prev;
            tmp[i][j] = 0;
            prev = 0;
          } else {
            prev = tmp[i][j];
            prevInd = j;
          }
        }
      }

      let ind = n - 1;
      for (let j = n - 1; j >= 0; j--) {
        if (tmp[i][j] !== 0) {
          tmp[i][ind] = tmp[i][j];
          if (j !== ind) {
            tmp[i][j] = 0;
          }
          ind--;
        }
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    play(i, cnt + 1, tmp);
  }
};

rl.on('line', (line) => {
  if (!n) n = parseInt(line);
  else board.push(line.split(' ').map((a) => parseInt(a)));
}).on('close', () => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      maxB = Math.max(maxB, board[i][j]);
    }
  }

  for (let i = 0; i < 4; i++) {
    // 상하좌우 방향으로 이동
    play(i, 0, board);
  }

  console.log(maxB);
});
