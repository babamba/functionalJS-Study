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
    takeAll,
    C,
} = require('../fx');

/**
 * 지연 평가 + Promise - L.map, map, take
 */

// go(
//     [1, 2, 3],
//     L.map((a) => Promise.resolve(a + 10)),
//     take(2),
//     log
// );

// go(
//     [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
//     L.map((a) => Promise.resolve(a + 10)),
//     take(2),
//     log
// );

// go(
//     [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
//     L.map((a) => a + 10),
//     take(2),
//     log
// );

// go(
//     [1, 2, 3],
//     map((a) => Promise.resolve(a + 10)),
//     log
// );

// go(
//     [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
//     map((a) => a + 10),
//     log
// );

// go(
//     [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
//     map((a) => Promise.resolve(a + 10)),
//     log
// );

/**
 * Kleisli Composition - L.filter, filter, nop, take
 */

// go(
//     [1, 2, 3, 4, 5, 6],
//     L.map((a) => Promise.resolve(a * a)),
//     L.filter((a) => a % 2),
//     take(4),
//     log
// );

/**
 * reduce에서 nop 지원
 */

go(
    [1, 2, 3, 4, 5, 6, 7, 8],
    C.map((a) => {
        log(a);
        return new Promise((resolve) => setTimeout(() => resolve(a * a), 1000));
    }),
    C.filter((a) => {
        log(a);
        return new Promise((resolve) => setTimeout(() => resolve(a % 2), 1000));
    }),
    C.take(3),
    log
);
