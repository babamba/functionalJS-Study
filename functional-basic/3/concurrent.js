/**
 * 지연된 함수열을 병렬적으로 평가하기 - C.reduce, C.take
 */

const {
    go,
    reduce,
    log,
    L,
    add,
    curry,
    take,
    pipe,
    map,
    filter,
} = require('../fx');
const C = {};
function noop() {}
const catchNoop = ([...arr]) => (
    arr.forEach((a) => (a instanceof Promise ? a.catch(noop) : a)), arr
);

// C.reduce = curry((f, acc, iter) => {
//     const iter2 = catchNoop(iter ? [...iter] : [...acc]);
//     return iter ? reduce(f, acc, iter2) : reduce(f, iter2);
// });

C.reduce = curry((f, acc, iter) => {
    return iter ? reduce(f, acc, catchNoop(iter)) : reduce(f, catchNoop(acc));
});

// C.reduce = curry((f, acc, iter) => {
//     return iter ? reduce(f, ...(iter ? [acc, catchNoop(iter)] : [catchNoop(acc)]))
// });

C.take = curry((l, iter) => take(l, catchNoop(iter)));

C.takeAll = C.take(Infinity);

C.map = curry(pipe(L.map, C.takeAll));

C.filter = curry(pipe(L.filter, C.takeAll));

const delay500 = (a, name) => {
    console.log('delay500 : ', a);
    return new Promise((resolve) => {
        console.log(`${name} : ${a}`);
        setTimeout(() => resolve(a), 500);
    });
};

console.time('');
go(
    [1, 2, 3, 4, 5, 6, 7, 8],
    C.map((a) => delay500(a * a, 'map 1')),
    C.filter((a) => delay500(a % 2, 'filter 2')),
    C.map((a) => delay500(a + 1, 'map 3')),
    C.take(2),
    // C.reduce(add),
    log,
    (_) => console.timeEnd('')
);

/**
 * 즉시 병렬적으로 평가하기.
 */

// C.map((a) => delay1000(a * a), [1, 2, 3, 4]).then(log);
// C.filter((a) => delay1000(a % 2), [1, 2, 3, 4]).then(log);
