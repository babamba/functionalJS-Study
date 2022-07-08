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

/**
 * Promise.then 의 중요한 규칙
 */

Promise.resolve(Promise.resolve(Promise.resolve(1))).then(log);

Promise.resolve(Promise.resolve(1)).then(function (a) {
    log(a);
});

new Promise((resolve) => resolve(new Promise((resolve) => resolve(1)))).then(
    log
);
