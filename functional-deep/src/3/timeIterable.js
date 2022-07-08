import * as _ from 'fxjs';
import * as L from 'fxjs/Lazy';

/**
 * 시간을 이터러블로 다루기
 *
 * 1. range와 take의 재해석
 */

_.log('-------------------1. range와 take의 재해석-------------------');

// _.go(
//     _.range(10), // 0 부터 9까지의 배열
//     _.take(3), // 앞에서부터 3개만 자르기
//     _.each(_.log)
// );

// _.go(
//     L.range(10), // 0부터 9까지의 이터러블, 최대 10번일어날일
//     L.map(_.delay(1000)),
//     L.filter((a) => a % 2),
//     L.map((_) => new Date()),
//     L.take(3), // 최대 3개의 값을 필요하고, 최대 3번의 일을 수행
//     _.each(_.log)
// );

_.log('-------------------2. takeWhile, takeUntil-------------------');
/**
 * 2. takeWhile, takeUntil
 */

// _.go(
//     [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0],
//     _.takeWhile((a) => a), //truty 한 값만 추출
//     _.each(_.log)
// );

// _.go(
//     [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0],
//     _.takeUntil((a) => !a), //truty 한 값을 만나면 거기까지만 가져오는것(처음으로 트루를 만날떄까지 담는 함수)
//     _.each(_.log)
// );

_.go(
    [0, false, undefined, null, 10, 20, 30],
    L.takeUntil((a) => a),
    _.each(_.log)
);
