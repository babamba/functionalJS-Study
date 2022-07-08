const log = console.log;
/**
 * 제네레이터 / 이터레이터
 * - 제너레이터 : 이터레이터 이자 이터러블을 생성하는 함수
 */

// *을 통해 제너레이터 함수 생성
// 제너레이터는 순회할 값을 문장으로 표현하는 것이라 생각할 수 있음.
function* gen() {
    yield 1; // 이터레이터 반환
    if (false) yield 2;
    yield 3;
    // return 100;
}

let iter = gen(); // 제너레이터를 실행한 결과는 이터레이터 이다.

// 이터레이터는 심볼 이터레이터를 가지고 있고,
// 심볼 이터레이터의 실행 결과는 자신이다.
log(iter[Symbol.iterator]() === iter);
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

// 자바스크립트에서는 어떠한 값이든 이터러블 이면 순회할 수 있음
// 제너레이터는 이런 문장을 값으로 만들 수 있고, 문장을 통해서 순회할 수 있는 값을 만들 수 있기때문에
//
for (const a of gen()) log(a);

/** odds */

console.clear();
log('---------------------');

function* infinity(i = 0) {
    while (true) yield i++;
}

function* limit(l, iter) {
    for (const a of iter) {
        yield a;
        if (a === l) return;
    }
}

function* odds(l) {
    for (const a of limit(l, infinity(1))) {
        if (a % 2) yield a;
        if (a === l) return;
    }

    // for (let i = 0; i < l; i++) {
    //     if (i % 2) yield i;
    // }
}

let iter2 = odds(10);
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());

console.clear();
log('---------------------');

for (const a of odds(40)) log(a);
// let iter4 = limit(4, [1, 2, 3, 4, 5, 6]);

// iter4.next();
// iter4.next();
// iter4.next();
// iter4.next();
// iter4.next();
// iter4.next();

console.clear();
log('---------------------');

log(...odds(10));
log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
log(head);
log(tail);

const [a, b, , ...rest] = odds(10);
log(a);
log(b);
log(rest);
