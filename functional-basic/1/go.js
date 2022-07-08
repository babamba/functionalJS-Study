const log = console.log;

const curry =
    (f) =>
    (a, ..._) =>
        _.length ? f(a, ..._) : (..._) => f(a, ..._);

const add = (a, b) => a + b;
const map = (f, iter) => {
    let res = [];
    for (const a of iter) res.push(f(a));
    return res;
};

const curryMap = curry((f, iter) => {
    let res = [];
    for (const a of iter) res.push(f(a));
    return res;
});

const filter = (f, iter) => {
    let res = [];
    for (const a of iter) if (f(a)) res.push(a);
    return res;
};

const curryFilter = curry((f, iter) => {
    let res = [];
    for (const a of iter) if (f(a)) res.push(a);
    return res;
});

const curryReduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
});

const reduce = (f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
};

/**         [0, f, f]          f              /[0, f, f] acc */          
const go = (...args) => reduce((a, f) => f(a), args);
/**                                                      */
reduce(add, 0, [1, 2, 3]);
add(add(add(0, 1), 2), 3);

[0, a => a + 1, a => a + 10]
[0, f, f]
go(
    0, 
    a => a + 1,
    a => a + 10,
    log
)

// 함수를 리턴하는 함수
const pipe =
    (f, ...fs) =>
    (...as) =>
        go(f(...as), ...fs);

go(
    add(0, 1),
    (a) => a + 1,
    (a) => a + 10,
    (a) => a + 100,
    log
);

const f = pipe(
    (a, b) => a + b, // f
    (a) => a + 10, // ...fs
    (a) => a + 100 // ...fs
);

log(f(0, 1));

console.clear();

const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
];

log(
    reduce(
        add,
        map(
            (p) => p.price,
            filter((p) => p.price < 20000, products)
        )
    )
);

go(
    products,
    (products) => filter((p) => p.price < 20000, products),
    (products) => map((p) => p.price, products),
    (prices) => reduce(add, prices),
    log
);

go(
    products,
    (products) => curryFilter((p) => p.price < 20000)(products),
    (products) => curryMap((p) => p.price)(products),
    (prices) => curryReduce(add)(prices),
    log
);

go(
    products,
    curryFilter((p) => p.price < 20000),
    curryMap((p) => p.price),
    curryReduce(add),
    log
);

/** 함수 + 함수  */
// go(
//     products,
//     filter((p) => p.price < 20000),
//     map((p) => p.price),
//     reduce(add),
//     log
// );

// go(
//     products,
//     filter((p) => p.price >= 20000),
//     map((p) => p.price),
//     reduce(add),
//     log
// );

const total_price = pipe(
    curryMap((p) => p.price),
    curryReduce(add)
);

go(
    products,
    curryFilter((p) => p.price < 20000),
    total_price,
    log
);

go(
    products,
    curryFilter((p) => p.price >= 20000),
    total_price,
    log
);

/**  */

const base_total_price = (predi) => pipe(curryFilter(predi), total_price);

go(
    products,
    base_total_price((p) => p.price < 20000),
    log
);

go(
    products,
    base_total_price((p) => p.price >= 20000),
    log
);

const mult = curry((a, b) => a * b);

// log(mult(4)(2));

// const mult3 = mult(3);
// log(mult3(10));
// log(mult3(5));
// log(mult3(3));

console.clear();
/**  range */
