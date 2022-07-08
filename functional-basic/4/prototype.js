/**
 * Qna. Array.prototype.map이 있는데 왜 FxJS의 map함수가 필요한지.?
 */

const { log, add, map, reduce, take, L, C, go } = require('../fx');

async function delayI(a) {
    return new Promise((resolve) => setTimeout(() => resolve(a), 100));
}

async function f2() {
    const list = [1, 2, 3, 4];
    const temp = list.map(async (a) => await delayI(a * a));
    //log(temp);
    const result = await temp;
    //log(result);
}

f2();

async function f3() {
    const list = [1, 2, 3, 4];
    const temp = map((a) => delayI(a * a), list);
    //log(temp);
    const result = await temp;
    //log(result);
}

f3();

// async function f4() {
//     const list = [1, 2, 3, 4];
//     const res = await map((a) => delayI(a * a), list);
//     return res;
// }

function f4() {
    return map((a) => delayI(a * a), [1, 2, 3, 4]);
}

// log(f4());
// log(f4().then(log));

// (async () => {
//     log(await f4());
// })();

/**
 * QnA 이제 비동기는 async/await로 제어할 수 있는데 왜 파이프라인이 필요한지?
 */

const list = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 *  f5 와 f6은 동일한 내용이고 동일한 시간복잡도이다.
 * 다른 부분은 fxjs를 파이프라인을 사용함으로써 결과가 Promise이든 아니든.
 * 동일한 결과를 보여준다.
 *
 * 하지만 f6의 경우 async await를 쓰기때문에
 * delayI 가 Promise가 아닌 일반값을 던져줘도
 * async await를 사용했기때문에 Promise를 리턴한다.
 * async await는 코드를 설명하기 위한 방법이다.
 */

function f5(list) {
    return go(
        list,
        L.map((a) => delayI(a * a)),
        L.filter((a) => delayI(a % 2)),
        L.map((a) => delayI(a + 1)),
        C.take(3),
        reduce((a, b) => delayI(a + b))
    );
}

go(f5(list), log);

async function f6(list) {
    let temp = [];
    for (const a of list) {
        const b = await delayI(a * a);
        if (await delayI(b % 2)) {
            const c = await delayI(b + 1);
            temp.push(c);
            if (temp.length === 3) break;
        }
    }

    let res = temp[0],
        i = 0;
    while (++i < temp.length) {
        res = await delayI(res + temp[i]);
    }

    return res;
}

go(f6(list), log);

/**
 * QnA  async/await 와 파이프라인을 같이 사용하기도 하는지?
 */

async function f52(list) {
    const r1 = await go(
        list,
        L.map((a) => delayI(a * a)),
        L.filter((a) => delayI(a % 2)),
        L.map((a) => delayI(a + 1)),
        C.take(3),
        reduce((a, b) => delayI(a + b))
    );

    const r2 = await go(
        list,
        L.map((a) => delayI(a * a)),
        L.filter((a) => delayI(a % 2)),
        reduce((a, b) => delayI(a + b))
    );

    const r3 = await delayI(r1 + r2);
    return r3 + 10;
}

go(f52(list), (a) => log(a, 'f52'));
