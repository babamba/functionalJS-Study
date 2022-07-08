import { add, delay, go, map, reduce, range, log, each, filter } from 'fxjs';
import * as L from 'fxjs/Lazy';

/**
 * 명령형 습관 지우기 - 만능 reduce? No
 *
 * 1. reduce + 복잡한 함수 + acc 보다 map + 간단한 함수 + reduce
 */

const users = [
    { id: 1, name: 'aa', age: 35 },
    { id: 2, name: 'bb', age: 26 },
    { id: 3, name: 'cc', age: 28 },
    { id: 4, name: 'dd', age: 34 },
    { id: 5, name: 'ee', age: 23 },
];

const ages = L.map((u) => u.age);

console.log(reduce((total, user) => total + user.age, 0, users));
console.log(
    reduce(
        add,
        L.map((u) => u.age, users)
    )
);

console.log(reduce(add, ages(users)));

log('--------------------------------');

/**
 *  2 .reduce 하나 보다 map + filter + reduce
 */

log(
    reduce(
        (total, u) => {
            if (u.age >= 30) return total;
            return total + u.age;
        },
        0,
        users
    )
);

log(
    reduce(
        add,
        L.map(
            (u) => u.age,
            L.filter((u) => u.age < 30, users)
        )
    )
);

log(
    reduce(
        add,
        L.filter(
            (n) => n < 30,
            L.map((u) => u.age, users)
        )
    )
);
