// 주차 요금 계산
// https://programmers.co.kr/learn/courses/30/lessons/92341

function solution(fees, records) {
  const answer = [];
  const accTime = new Map();

  const timeToMin = (time) => {
    // 문자열 타입의 시간을 분 단위 정수 타입으로 변경해서 반환
    const [hour, min] = time.split(':').map((i) => parseInt(i));
    return hour * 60 + min;
  };

  const calcFee = (min) => {
    // 시간에 대한 요금 계산
    let fee = fees[1];
    if (min > fees[0]) {
      fee += Math.ceil((min - fees[0]) / fees[2]) * fees[3];
    }
    return fee;
  };

  const map = new Map();
  records.forEach((record) => {
    const [time, num, type] = record.split(' ');
    const min = timeToMin(time);
    if (type === 'IN') {
      // 입차시 차량번호에 대한 입차 시간을 Map에 저장
      map.set(num, min);
    } else {
      // 출차시 출차 시간과 입차 시간의 차이를 구한다.
      const spend = min - map.get(num);
      map.delete(num);
      // 차량에 대한 주차 시간을 Map에 누적
      if (accTime.has(num)) {
        accTime.set(num, accTime.get(num) + spend);
      } else {
        accTime.set(num, spend);
      }
    }
  });

  // 출차 기록이 없는 차량 23:59 출차로 처리
  const lastTime = timeToMin('23:59');
  for (const [num, min] of map) {
    if (accTime.has(num)) {
      accTime.set(num, accTime.get(num) + lastTime - min);
    } else {
      accTime.set(num, lastTime - min);
    }
  }

  for (const [num, time] of accTime) {
    answer.push([num, calcFee(time)]);
  }
  // 차량번호 오름차순으로 정렬
  answer.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  return answer.reduce((acc, curr) => {
    acc.push(curr[1]);
    return acc;
  }, []);
}
