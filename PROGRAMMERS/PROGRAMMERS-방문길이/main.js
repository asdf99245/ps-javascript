// 방문 길이
// https://programmers.co.kr/learn/courses/30/lessons/49994

function solution(dirs) {
  let answer = 0;
  const passed = new Set(); // Set을 통해 방문 경로 관리
  const moveIndex = new Map(); // direction index로 매핑
  moveIndex.set('U', 0);
  moveIndex.set('D', 1);
  moveIndex.set('L', 2);
  moveIndex.set('R', 3);
  const move = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let currY = 0,
    currX = 0;
  for (const dir of dirs) {
    const [dirY, dirX] = move[moveIndex.get(dir)];
    const nextY = currY + dirY;
    const nextX = currX + dirX;
    if (nextY < -5 || nextX < -5 || nextY > 5 || nextX > 5) continue; // 좌표를 벗어날 시
    passed.add(`${(nextY + currY) / 2} ${(nextX + currX) / 2}`); // Set에 경로 추가
    (currY = nextY), (currX = nextX);
  }

  return (answer = passed.size);
}
