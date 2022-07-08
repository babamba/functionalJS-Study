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
} = require('../fx');

/**
 * 2차원 배열 다루기
 */

const arr = [
    [1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
];

go(
    arr,
    L.flatten,
    L.map((a) => a * a),
    L.filter((a) => a % 2),
    take(3),
    reduce(add),
    log
);
