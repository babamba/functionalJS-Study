const log = console.log;

const curry =
    (f) =>
    (a, ..._) =>
        _.length ? f(a, ..._) : (..._) => f(a, ..._);

// curry 함수에 fa 함수를 넣고나면,
// fa 함수를 실행할 때 인자 x 를 1개만 넣을 경우,
// 인자 x를 기억하는 함수 fb 를 리턴하게 됩니다.
// 함수 fb를 나중에 실행하면서 y를 인자로 전달하면 fb가 fa를 실행하면서 x, y를 전달합니다.

// 인자가 두 개 이상이어서 즉시 실행할 수 있을 때는 즉시 실행하고
// 아닐 때는 함수를 리턴하고 그 함수가 다음 번에 실행될 때 ..._ 를 받아서 실행합니다.

const add = (a, b) => a + b;
// const map = (f, iter) => {
//     let res = [];
//     for (const a of iter) {
//         res.push(f(a));
//     }
//     return res;
// };

// const curryMap = curry((f, iter) => {
//     let res = [];
//     for (const a of iter) {
//         res.push(f(a));
//     }
//     return res;
// });

// const map = curry((f, iter) => {
//     let res = [];
//     iter = iter[Symbol.iterator]();
//     let cur;
//     while (!(cur = iter.next()).done) {
//         const a = cur.value;
//         res.push(f(a));
//     }
//     return res;
// });

// const map = curry(pipe(L.map, take(Infinity)));
// const filter = (f, iter) => {
//     let res = [];
//     for (const a of iter) {
//         if (f(a)) res.push(a);
//     }
//     return res;
// };

// const curryFilter = curry((f, iter) => {
//     let res = [];
//     for (const a of iter) {
//         if (f(a)) res.push(a);
//     }
//     return res;
// });

// 함수를 리턴하는 함수.
// 함수를 선언하고 필요한 파라미터가 충족되면 함수를 실행한 값을 리턴
// 리턴받은 함수의 렉시컬 스코프에 인수값이 저장됨.(클로저)

// function curry(f){
//     return function(a){
//         return function(b){
//             console.log('curry f : ', f);
//             console.log('curry a : ', a);
//             console.log('curry b : ', b);
//             return f(a, b)
//         }
//     }
// }

const filter = curry((f, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        if (f(a)) res.push(a);
    }
    return res;
});

const take = curry((l, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    return (function recur() {
        let cur;
        while (!(cur = iter.next()).done) {
            const a = cur.value;
            if (a instanceof Promise) {
                return a
                    .then((a) =>
                        (res.push(a), res).length === l ? res : recur()
                    )
                    .catch((e) => (e === nop ? recur() : Promise.reject(e)));
            }
            res.push(a);
            if (res.length == l) return res;
        }
        return res;
    })();
});

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

// const reduce = (f, acc, iter) => {
//     if (!iter) {
//         iter = acc[Symbol.iterator]();
//         acc = iter.next().value;
//     }
//     for (const a of iter) {
//         acc = f(acc, a);
//     }
//     return acc;
// };

// const curryReduce = curry((f, acc, iter) => {
//     if (!iter) {
//         iter = acc[Symbol.iterator]();
//         acc = iter.next().value;
//     }
//     for (const a of iter) {
//         acc = f(acc, a);
//     }
//     return acc;
// });

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const reduceF = (acc, a, f) =>
    a instanceof Promise
        ? a.then(
              (a) => f(acc, a),
              (e) => (e === nop ? acc : Promise.reject(e))
          )
        : f(acc, a);

const head = (iter) => go1(take(1, iter), ([h]) => h);

/**
 * reduce / take - 결론을 짓는 함수.
 */

const reduce = curry((f, acc, iter) => {
    if (!iter) return reduce(f, head((iter = acc[Symbol.iterator]())), iter);

    // if (!iter) {
    //     iter = acc[Symbol.iterator]();
    //     acc = iter.next().value;
    // } else {
    //     iter = iter[Symbol.iterator]();
    // }
    return go1(acc, function recursive(acc) {
        let cur;
        while (!(cur = iter.next()).done) {
            // const a = cur.value;
            // acc = f(acc, a);
            acc = reduceF(acc, cur.value, f);
            if (acc instanceof Promise) return acc.then(recursive);
        }
        return acc;
    });
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe =
    (f, ...fs) =>
    (...as) =>
        go(f(...as), ...fs);

const range = (length) => {
    let i = -1;
    let res = [];
    while (++i < length) {
        //log(i, 'range');
        res.push(i);
    }
    return res;
};

const L = {};
L.range = function* (l) {
    let i = -1;
    while (++i < l) {
        yield i;
    }
};

L.map = curry(function* (f, iter) {
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        yield go1(a, f);
    }
});

const nop = Symbol('nop');

L.filter = curry(function* (f, iter) {
    for (const a of iter) {
        const b = go1(a, f);
        if (b instanceof Promise)
            yield b.then((b) => (b ? a : Promise.reject(nop)));
        else if (b) yield a;
    }
    // iter = iter[Symbol.iterator]();
    // let cur;
    // while (!(cur = iter.next()).done) {
    //     const a = cur.value;
    //     if (f(a)) {
    //         yield a;
    //     }
    // }
});

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

L.entries = function* (obj) {
    for (const k in obj) yield [k, obj[k]];
};

L.flatMap = curry(pipe(L.map, L.flatten));

const takeAll = take(Infinity);
const isIterable = (a) => a && a[Symbol.iterator];

const flatten = pipe(L.flatten, takeAll);
const map = curry(pipe(L.map, takeAll));

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

module.exports = {
    go,
    go1,
    pipe,
    add,
    curry,
    log,
    map,
    reduce,
    filter,
    range,
    take,
    find,
    L,
    C,
    takeAll,
    isIterable,
    flatten,
};
