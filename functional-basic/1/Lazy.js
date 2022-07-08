const { add, curry, log, L, go, range, map, filter, take } = require('../fx');

/**
 * 이터러블 중심 프로그래밍에서의 지연 평가 (Lazy Evaluation)
 *  - 제때 계산법
 *  - 느긋한 계산법 / 게으른 계산법
 *  - 제너레이터/이터레이터 프로토콜을 기반으로 구현
 */

const testMap = curry((f, iter) => {
    let res = [];

    //for (const a of iter) 가 하는 역할과 동일
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(f(a));
    }

    // for (const a of iter) {
    //     res.push(f(a));
    // }
    return res;
});

/** L.map */
log('----------L.map------------');
L.map = function* (f, iter) {
    for (const a of iter) yield f(a);
};

var iter = L.map((a) => a + 10, [1, 2, 3]);
// log(iter.next());
// log(iter.next());
// log(iter.next());
log([...iter]);

/** L.filter */

log('----------L.filter------------');
L.filter = function* (f, iter) {
    for (const a of iter) if (f(a)) yield a;
};

var it = L.filter((a) => a % 2, [1, 2, 3, 4]);
log(it.next());
log(it.next());
log(it.next());

log('---------- range, map, filter, take, reduce 중첩사용 ------------');

go(
    range(10),
    filter((n) => n % 2),
    take(2),
    // map((n) => n + 10),
    log
);

/**
 * map, filter 계열 함수들이 가지는 결합 법칙
 *
 *   - 사용하는 데이터가 무엇이든지
 *   - 사용하는 보조 함수가 순수 함수라면 무엇이든지
 *   - 아래와 같이 결합한다면 둘 다 결과가 같다.
 *
 *   [[mapping, mapping], [filtering, filtering], [mapping, mapping]]
 *      =
 *   [[mapping, filter, mapping], [mapping, filter, mapping]]
 *
 */
