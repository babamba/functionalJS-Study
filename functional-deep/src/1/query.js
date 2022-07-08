import {
    add,
    pipe,
    delay,
    go,
    map,
    reduce,
    range,
    log,
    each,
    curry,
    filter,
    reject,
} from 'fxjs';
import * as L from 'fxjs/Lazy';

/**
 * query, queryToObject
 */

const obj1 = {
    a: 1,
    b: undefined,
    c: 'CC',
    d: 'DD',
};

log('-------------query1-----------------');

function query1(obj) {
    let res = '';
    for (const k in obj) {
        const v = obj[k];
        if (v === undefined) continue;
        if (res !== '') res += '&';
        res += k + '=' + v;
    }
    return res;
}

log(query1(obj1));

log('-------------query2-----------------');

function query2(obj) {
    return Object.entries(obj).reduce((query, [k, v], i) => {
        if (v === undefined) return query;
        //return query + (i > 0 ? '&' : '') + k + '=' + v;
        return `${query}${i > 0 ? '&' : ''}${k}=${v}`;
    }, '');
}

log(query2(obj1));

log('--------------query3----------------');

const join = curry((sep, iter) => reduce((a, b) => `${a}${sep}${b}`, iter));

const query3 = (obj) => {
    return join(
        '&',
        map(
            ([k, v]) => `${k}=${v}`,
            reject(([_, v]) => v === undefined, Object.entries(obj))
        )
    );
};

log(query3(obj1));

log('-------------query4-----------------');

const query4 = (obj) =>
    go(
        obj,
        Object.entries,
        reject(([_, v]) => v === undefined),
        map(join('=')),
        join('&')
    );

log(query4(obj1));

log('--------------query5----------------');

const query5 = pipe(
    Object.entries,
    L.reject(([_, v]) => v === undefined),
    L.map(join('=')),
    join('&')
);

log(query5(obj1));

log('--------------queryToObject----------------');

/**
 * queryToObject
 */
const split = curry((sep, str) => str.split(sep));

const queryToObject = pipe(
    split('&'),
    L.map(split('=')),
    L.map(([k, v]) => ({ [k]: v })),
    reduce(Object.assign)
);

log(queryToObject('a=1&c=CC&d=DD'));
