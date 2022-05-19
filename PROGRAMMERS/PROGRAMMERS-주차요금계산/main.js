// 주차 요금 계산
// https://programmers.co.kr/learn/courses/30/lessons/92341

function solution(fees, records) {
  const answer = [];
  const accTime = new Map();

  const timeToMin = (time) => {
    const [hour, min] = time.split(':').map((i) => parseInt(i));
    return hour * 60 + min;
  };

  const calcFee = (min) => {
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
      map.set(num, min);
    } else {
      const spend = min - map.get(num);
      map.delete(num);
      if (accTime.has(num)) {
        accTime.set(num, accTime.get(num) + spend);
      } else {
        accTime.set(num, spend);
      }
    }
  });

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
  answer.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  return answer.reduce((acc, curr) => {
    acc.push(curr[1]);
    return acc;
  }, []);
}
