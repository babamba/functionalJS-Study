const {
    add,
    curry,
    log,
    L,
    go,
    range,
    map,
    filter,
    take,
    reduce,
    pipe,
} = require('../fx');

/** go, pipe, reduce에서 비동기 제어 */

go(
    Promise.resolve(1),
    (a) => a + 10,
    // (a) => Promise.resolve(a + 100),
    (a) => Promise.reject('error !'),
    (a) => console.log('-----'),
    (a) => a + 1000,
    log
).catch((a) => console.log(a));
