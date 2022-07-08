const {
    curry,
    go,
    reduce,
    add,
    log,
    L,
    pipe,
    take,
    map,
    flatten,
    filter,
    takeAll,
    find,
} = require('../fx');

/**
 * 일급활용
 */

const delay100 = (a) =>
    new Promise((resolve) => setTimeout(() => resolve(a), 100));

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const add5 = (a) => a + 5;

// var r1 = go1(10, add5);
// log(r1);

// var r2 = go1(delay100(10), add5);
// r2.then(log);

const n1 = 10;

//log(go1(go1(n1, add5), log));

const n2 = delay100(10);

// log(go1(go1(n2, add5), log));

/**
 * Composition
 *
 * // f . g
 * // g 함수의 결과를 f에 전달해서 f가 그 결과를 만드는 합성
 * // f(g(x))
 * // 안전하게 합성 할 수 있게 하기위해 모나드라는 개념이 있음.
 * // 비동기를 안전하게 합성하는것이 Promise
 */

// const g = (a) => a + 1;
// const f = (a) => a * a;
// const x = 1;

// log(f(g(x)));
// log(f(g()));

// Array.of(1)
//     .map(g)
//     .map(f)
//     .forEach((r) => log(r));

// []
//     .map(g)
//     .map(f)
//     .forEach((r) => log(r));

// Promise.resolve(2)
//     .then(g)
//     .then(f)
//     .then((r) => log(r));

// new Promise((resolve) => setTimeout(() => resolve(2), 100))
//     .then(g)
//     .then(f)
//     .then((r) => log(r));

/**
 * kleisli Composition
 * 오류가 있을수있는 상황에서의 합성을 안전하게 하는 규칙
 * f . g
 * f(g(x)) = f(g(x))
 * f(g(x)) = g(x)
 */

// user를 담고있는 Array가 상태라고 보자
var users = [
    { id: 1, name: 'aa' },
    { id: 2, name: 'bb' },
    { id: 3, name: 'cc' },
];

//const getUserById = (id) => find((u) => u.id === id, users);

const getUserById = (id) =>
    find((u) => u.id === id, users) || Promise.reject('없어');

const f = ({ name }) => name;
const g = getUserById;
// const fg = (id) => f(g(id));

// log(fg(2));
// users.pop();
// users.pop();
// log(users);

// log(fg(2));
// 첫번째 오류 - users의 상태가 비어있을때,
// 두번째 오류 - name이라는 요소가 없을때,

//const fg = (id) => Promise.resolve(id).then(g).then(f);
const fg = (id) =>
    Promise.resolve(id)
        .then(g)
        .then(f)
        .catch((a) => a);

users.pop();
users.pop();
fg(2).then(log);
