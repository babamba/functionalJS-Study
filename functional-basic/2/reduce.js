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

/** 결과를 만드는 함수 reduce, take */

// const queryStr = (obj) =>
//     go(
//         obj,
//         Object.entries,
//         map(([k, v]) => `${k}=${v}`),
//         reduce((a, b) => `${a}&${b}`)
//     );

const join = curry((sep = ',', iter) =>
    reduce((a, b) => `${a}${sep}${b}`, iter)
);

// const queryStr = pipe(
//     Object.entries,
//     map(([k, v]) => `${k}=${v}`),
//     reduce((a, b) => `${a}&${b}`),
// );

const queryStr = pipe(
    L.entries,
    // map(([k, v]) => `${k}=${v}`),
    L.map(([k, v]) => `${k}=${v}`),
    function (a) {
        console.log(a);
        return a;
    },
    join('&')
);

log(queryStr({ limit: 10, offset: 10, type: 'notice' }));

function* a() {
    yield 10;
    yield 11;
    yield 12;
    yield 13;
}

// log(a().join(','))
log(join(',', a()));

/** take, find */

const users = [
    { age: 32 },
    { age: 31 },
    { age: 37 },
    { age: 25 },
    { age: 36 },
    { age: 29 },
];

// const test = () => {
//     for(let item of users)

//     const 1 = user.map
//     const 2 = user.filter
//     const 3 = user.reduce

// }

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

go(
    users,
    L.map((u) => u.age),
    find((n) => n < 30),
    log
);

log(find((u) => u.age < 30)(users));

L.map = curry(function* (f, iter) {
    for (const a of iter) yield f(a);
});

L.filter = curry(function* (f, iter) {
    for (const a of iter) {
        if (f(a)) yield a;
    }
});

const takeAll = take(Infinity);

const map = curry(pipe(L.map, takeAll));

log(map((a) => a + 10, L.range(4)));

const filter = curry(pipe(L.filter, takeAll));
log(filter((a) => a + 10, L.range(4)));
