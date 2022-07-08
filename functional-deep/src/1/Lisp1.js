import { add, delay, go, map, reduce, range, log, each } from 'fxjs';
import * as L from 'fxjs/Lazy';

/**
 * 홀수 n개 더하기
 */

function f1(limit, list) {
    let acc = 0;
    for (const a of list) {
        if (a % 2) {
            const b = a * a;
            acc += b;
            if (--limit === 0) break;
        }
    }
    console.log(acc);
}

f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// go(
//     [1, 2, 3, 4, 5],
//     filter((a) => a % 2),
//     reduce(add)
// );

/**
 * 2. if를 filter로
 * 3. 값 변화 후 변수 할당을 map으로
 * 4. break를 take로
 * 5. 축약 및 합산을 reduce로
 */
log('---------------------------------');

function fx1(limit, list) {
    let acc = 0;
    for (const a of L.filter((a) => a % 2, list)) {
        const b = a * a;
        acc += b;
        if (--limit === 0) break;
    }
    console.log(acc, '---- fx 1 ----');
}

fx1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

log('---------------------------------');
function fx2(limit, list) {
    let acc = 0;
    for (const a of L.map(
        (a) => a * a,
        L.filter((a) => a % 2, list)
    )) {
        acc += a;
        if (--limit === 0) break;
    }
    console.log(acc, '---- fx 2 ----');
}

fx2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

log('---------------------------------');
function fx3(limit, list) {
    let acc = 0;
    for (const a of L.take(
        limit,
        L.map(
            (a) => a * a,
            L.filter((a) => a % 2, list)
        )
    )) {
        acc += a;
        // if (--limit === 0) break;
    }
    console.log(acc, '---- fx 3 ----');
}

fx3(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

log('---------------------------------f4 ');
function fx4(limit, list) {
    console.log(
        reduce(
            add,
            L.take(
                limit,
                L.map(
                    (a) => a * a,
                    L.filter((a) => a % 2, list)
                )
            )
        ),
        '---- fx 4 ----'
    );
}

fx4(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

log('--------------------------------- f5');
function fx5(limit, list) {
    go(
        list,
        L.filter((a) => a % 2),
        L.map((a) => a * a),
        L.take(limit),
        reduce(add),
        (a) => log(a, '---- fx 5 ----')
    );
}

fx5(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

log('--------------------------------- f6');
/**
 * while을 range로
 * 효과를 each로 구분
 */

function f6(end) {
    let i = 1;
    while (i < end) {
        console.log(i);
        i += 2;
    }
}

f6(3);

log('--------------------------------- f7');
function f7(end) {
    each(console.log, L.range(1, end, 2));
}

f7(3);

log('--------------------------------- f8');
function f8(end) {
    go(L.range(end), each(console.log));
}

f8(3);

/**
 * 추억의 별그리기, 구구단
 */

const join = (sep) => reduce((a, b) => `${a}${sep}${b}`);

go(
    L.range(1, 6),
    L.map(range),
    L.map(map((_) => '*')),
    // L.map(reduce((a, b) => `${a}${b}`)),
    // reduce((a, b) => `${a}\n${b}`),
    L.map(join('')),
    join('\n'),
    console.log
);

log('--------------------------------- f9');
// go(
//     L.range(1, 6),
//     L.map((s) =>
//         go(
//             L.range(s),
//             L.map((_) => '*'),
//             reduce((a, b) => `${a}${b}`)
//         )
//     ),
//     reduce((a, b) => `${a}\n${b}`),
//     console.log
// );

go(
    range(2, 10),
    map((a) =>
        go(
            range(1, 10),
            map((b) => `${a} x ${b} = ${a * b}`),
            join('\n')
        )
    ),
    join('\n\n'),
    console.log
);
