const { curry, go, reduce, add, log } = require('../fx');

const range = (length) => {
    let i = -1;
    let res = [];
    while (++i < length) {
        // log(i, 'range');
        res.push(i);
    }
    return res;
};

// 느긋한 L.range
const L = {};
L.range = function* (length) {
    let i = -1;
    while (++i < length) {
        // log(i, 'L.range');
        yield i;
    }
};

const take = curry((l, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length === l) return res;
    }
});
console.time('');
//log(take(5, range(100))); // n개 요소의 array를 만들고 N개를 뽑으므로 100개만큼의 시간이 걸림 : 8.663ms
go(range(10000), take(5), reduce(add), log);
console.timeEnd('');

console.time('');
//log(take(5, L.range(Infinity))); // n개의 어레이를 미리 만들지않고 N개만큼만 만들기때문에 효율적 : 0.643ms
go(L.range(10000), take(5), reduce(add), log);
console.timeEnd('');
