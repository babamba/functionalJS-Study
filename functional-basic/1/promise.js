/**
 * Promise
 */

/**
 * 일급
 */
const log = console.log;

function add10(a, callback) {
    setTimeout(() => callback(a + 10), 1000);
}

var a = add10(5, (res) => {
    add10(res, (res) => {
        add10(res, (res) => {
            log(res);
        });
    });
});

log(a);

function add20(a) {
    return new Promise((resolve) => setTimeout(() => resolve(a + 20), 100));
}

var b = add20(5).then(add20).then(add20).then(log);
log(b);
