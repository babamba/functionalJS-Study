import * as _ from 'fxjs';
import * as L from 'fxjs/Lazy';

/**
 * 객체를 이터러블 프로그래밍으로 다루기
 *
 * 1. values
 * 2. entries
 * 3. keys
 * 4. 어떠한 값이든 이터러블 프로그래밍으로 다루기
 * 5. object
 * 6. mapObject
 * 7. pick
 * 8. indexBy
 * 9. indexBy 된 값을 filter하기
 */

/**
 * 1. values
 */

_.log('--------------1. values------------------');

const obj1 = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

// console.log(Object.values(obj1));

// _.go(
//     obj1,
//     Object.values,
//     _.map((a) => a + 10),
//     _.reduce((a, b) => a + b),
//     console.log
// );

// const L = {};
const values = function* (obj) {
    for (const k in obj) {
        yield obj[k];
    }
};

let it = values(obj1);

// console.log(it.next());

// console.log([...it]);

// const test = L.take(2, it);
// console.log(test);
// console.log([...test]);

_.go(
    obj1,
    L.values,
    L.map((a) => a + 10),
    L.take(2),
    _.reduce((a, b) => a + b),
    console.log
);

_.log('--------------2.entries------------------');

/**
 * 2. entries
 */

const entries = function* (obj) {
    for (const k in obj) {
        yield [k, obj[k]];
    }
};

_.go(
    obj1,
    entries,
    _.filter(([_, v]) => v % 2),
    L.map(([k, v]) => ({ [k]: v })),
    _.reduce(Object.assign),
    _.log
);

_.log('--------------3.keys------------------');

/**
 * 3. keys
 */

const keys = function* (obj) {
    for (const k in obj) {
        yield k;
    }
};

_.go(obj1, keys, _.each(_.log));

_.log('--------------4.generator------------------');

/**
 * 4. 어떠한 값이든 이터러블 프로그래밍으로 다루기
 *  - 이터러블로 이터러블 프로그래밍
 *  - 객체를 제네레이터를 이용해서 이터레이터로 만들어서 이터러블 프로그래밍
 *  - 어떤 제네레이터든 이터레이터로 만들어서 이터러블 프로그래밍
 */

const g1 = function* (stop) {
    let i = -1;
    while (++i < stop) {
        console.log(i);
        yield 10;
        if (false) yield 20 + 30;
        yield 30;
    }
};

const iter = (function* () {
    let i = -1;
    while (++i < 5) {
        yield 10;
        if (false) yield 20 + 30;
        yield 30;
    }
    // yield 10;
    // yield 20;
    // yield 30;
})();

console.log([...L.take(3, [...g1(3)])]);

// _.each(console.log, g1(10));

_.go(
    g1(10),
    L.take(2),
    _.reduce((a, b) => a + b),
    console.log
);

_.log('--------------5.object------------------');

/**
 * 5. object
 */

const a = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
];
const b = { a: 1, b: 2, c: 3 };

// const object = (entries) =>
//     _.go(
//         entries,
//         L.map(([k, v]) => ({ [k]: v })),
//         _.reduce(Object.assign)
//     );

const object = (entries) =>
    _.reduce((object, [k, v]) => ((object[k] = v), object), {}, entries);

_.log('obj2 : ', object(a));
_.log('obj2 : ', object(L.entries({ b: 2, c: 3 })));

let m = new Map();
m.set('a', 10);
m.set('b', 20);
m.set('c', 30);

_.log(m);

_.log('obj2 : ', object(m));

let test = m[Symbol.iterator]();
_.log(test);
// _.log(test.next().value);
_.log([...test]);

_.log('--------------6. mapObject------------------');

/**
 * 6. mapObject
 */

const mapObject = (f, obj) =>
    _.go(
        obj,
        L.entries,
        L.map(([k, v]) => [k, f(v)]),
        object
    );

_.log(mapObject((a) => a + 10, { a: 1, b: 2, c: 3 }));

// 이터러블 적인 사고.
//1. 현재 이 형태를 { a: 1, b: 2, c: 3 }
//2. entries를 이용해서 이터러블적으로 만들고 [['a', 1], ['b': 2],['c': 3]]
//3. 함수를 이용해 변화를 적용하고 [['a', 11], ['b': 12],['c': 13]]
//4. 원하는 형태로 만든다. { a: 11, b: 12, c: 13 }

_.log('--------------7. pick------------------');

/**
 * 7. pick
 */

const obj3 = { a: 1, b: 2, c: 3, d: 4, e: 5 };

const pick = (keys, obj) =>
    _.go(
        keys,
        L.map((k) => [k, obj[k]]),
        L.reject(([k, v]) => v === undefined),
        object
    );

_.log(pick(['b', 'c', 'z'], obj3));
// { b: 2, c: 3}

_.log('--------------8. indexBy------------------');

/**
 * indexBy
 */

const users = [
    { id: 5, name: 'AA', age: 35 },
    { id: 10, name: 'BB', age: 26 },
    { id: 19, name: 'CC', age: 28 },
    { id: 23, name: 'DD', age: 34 },
    { id: 24, name: 'EE', age: 23 },
];

const users2 = _.indexBy((u) => u.id, users);

_.log(_.indexBy((u) => u.id, users));

/**
 *  const users2 = _.indexBy((u) => u.id, users);
 *  {
 *    '5': { id: 5, name: 'AA', age: 35 },
 *    '10': { id: 10, name: 'BB', age: 26 },
 *    '19': { id: 19, name: 'CC', age: 28 },
 *    '23': { id: 23, name: 'DD', age: 34 },
 *    '24': { id: 24, name: 'EE', age: 23 }
 *  }
 * _.log(users[19])
 * -> { id: 19, name: 'CC', age: 28 }
 * 순회를 돌지 않고 키로 찾기때문에 성능적으로 빠름.
 */

// const indexBy = (f, iter) =>
//     _.reduce((obj, a) => ((obj[f(a)] = a), obj), {}, iter);

// _.log(
//     indexBy((u) => u.id, users),
//     'test'
// );

_.log('--------------9. indexBy 된 값을 filter하기------------------');

/**
 * indexBy 된 값을 filter하기
 */

_.log(_.filter(({ age }) => age > 30, users));

// array 가 아니기때문에 정상적으로 되지 않음.
//_.log(_.filter(({ age }) => age > 30, users2));
const users3 = _.go(
    users2,
    L.entries,
    L.filter(([_, { age }]) => age < 30),
    L.take(2),
    object
);

_.log(users3[19]);
