const log = console.log;

log('Arr -------------');
const arr = [1, 2, 3];

// let iter1 = arr[Symbol.iterator]();
// iter1.next();

for (const a of arr) log(a);

log('Set -------------');
const set = new Set([1, 2, 3]);

// let iter2 = set[Symbol.iterator]();
// iter2.next();
for (const a of set) log(a);

log('Map -------------');
const map = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3],
]);

// let iter3 = map[Symbol.iterator]();
// iter3.next();
log(map.keys());
for (const a of map.keys()) log(a);
for (const a of map.values()) log(a);
for (const a of map.entries()) log(a);
for (const a of map) log(a);

console.clear();
/**
 * 이터러블 / 이터레이터 프로토콜
 * - 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
 * - 이터레이터 : { value, done } 객체를 리턴하는 next()를 가진 값
 * - 이터러블 / 이터레이터 프로토콜 : 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록 한 규약
 */
log('------------------');
const iterable = {
    [Symbol.iterator]() {
        let i = 3;
        return {
            next() {
                return i === 0 ? { done: true } : { value: i--, done: false };
            },
            [Symbol.iterator]() {
                return this;
            },
        };
    },
};

let iterator = iterable[Symbol.iterator]();
// log(iterator.next());
for (const a of iterable) log(a);

console.clear();
log('------------------');

const arr2 = [1, 2, 3];

let iter2 = arr2[Symbol.iterator]();
//iter2.next();
log(iter2[Symbol.iterator]() === iter2);
for (const a of arr2) log(a);

/** 전개연산자 */
console.clear();

const a = [1, 2];
// a[Symbol.iterator] = null;
log(...a, ...arr, ...set, ...map.values());
