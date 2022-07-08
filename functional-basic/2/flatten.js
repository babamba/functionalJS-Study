const { curry, go, reduce, add, log, L, pipe, take, map } = require('../fx');

/**
 * L.flatten
 */

log([...[1, 2], 3, 4, ...[5, 6], ...[7, 8, 9]]);

const isIterable = (a) => a && a[Symbol.iterator];

L.flatten = function* (iter) {
    for (const a of iter) {
        if (isIterable(a)) for (const b of a) yield b;
        else yield a;
    }
};

L.flatten = function* (iter) {
    for (const a of iter) {
        if (isIterable(a)) yield* a;
        else yield a;
    }
};
// yield *iterable === for(const val of iterable) yield val;
L.deepFlat = function* f(iter) {
    for (const a of iter) {
        if (isIterable(a)) yield* f(a);
        else yield a;
    }
};

const takeAll = take(Infinity);
let it = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);
log(take(3, L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]])));
log([...it]);

// log(it.next());

const flatten = pipe(L.flatten, takeAll);
log(flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]));

/**
 * L.flatMap
 */

// log([[1, 2], [3, 4], [5, 6, 7], 8, 9, [10]].flatMap((a) => a));
// log(
//     flatten(
//         [
//             [1, 2],
//             [3, 4],
//             [5, 6, 7],
//         ].map((a) => a.map((a) => a * a))
//     )
// );

L.flatMap = curry(pipe(L.map, L.flatten));

const flatMap = curry(pipe(L.map, flatten));
const lazyFlatMap = curry(pipe(L.map, L.flatten));
// [
//     [1, 2],
//     [3, 4],
//     [5, 6, 7],
// ];
let it2 = L.flatMap(
    (a) => a,
    [
        [1, 2],
        [3, 4],
        [5, 6, 7],
    ]
);

log([...it2]);
log(
    flatMap(
        (a) => a,
        [
            [1, 2],
            [3, 4],
            [5, 6, 7],
        ]
    )
);

log(
    lazyFlatMap(
        (a) => a,
        [
            [1, 2],
            [3, 4],
            [5, 6, 7],
        ]
    )
);
