/**
 * async / await
 */

// const { log, go1, go } = require('../fx');
// const { go1, go } = require('../fx');
const { pipe, filter, map, log } = require('../fxts');
function delay(time) {
    return new Promise((resolve) => setTimeout(() => resolve(), time));
}

async function delayidentity(a) {
    await delay(500);
    return a;
}
async function f1() {
    const a = await delayidentity(10);
    const b = await delayidentity(100);
    // const a = 10;
    // const b = 5;
    return a + b;
}

const pa1 = Promise.resolve(10);
const pa2 = f1();

(async () => {
    log(await pa1);
    log(await pa2);
})();

// log(f1());
//f1().then(log);
// go(f1(), log);

// (async () => {
//     log(await f1());
// })();

pipe(
    [1, 2, 3, 4, 5],
    map((a) => a + 10),
    filter((a) => a % 2 === 0),
    log
);
