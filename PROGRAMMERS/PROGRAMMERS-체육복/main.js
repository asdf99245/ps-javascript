// 체육복
// https://programmers.co.kr/learn/courses/30/lessons/42862

function solution(n, lost, reserve) {
  let answer = 0;
  // 배열 번호 오름차순으로 정렬
  lost.sort((a, b) => a - b);
  reserve.sort((a, b) => a - b);
  // 도난당했으면서 여벌 체육복을 가진 학생을 제외
  for (let i = 0; i < lost.length; i++) {
    const idx = reserve.indexOf(lost[i]);
    if (idx !== -1) {
      lost.splice(i, 1);
      reserve.splice(idx, 1);
      i--;
    }
  }

  // 도난당하지 않은 학생들
  answer = n - lost.length;

  // 도난당한 학생들에 대하여 뒷번호와 앞번호의 학생에 대해 여벌체육복이 있는지 조사
  lost.forEach((l) => {
    const left = reserve.indexOf(l - 1);
    const right = reserve.indexOf(l + 1);
    if (left !== -1 || right !== -1) {
      // 앞과 뒤에 여벌이 있다면
      answer++;
      if (left !== -1) {
        // 앞번호 학생의 체육복 우선으로 빌림
        reserve.splice(left, 1);
      } else if (right !== -1) {
        reserve.splice(right, 1);
      }
    }
  });

  return answer;
}
