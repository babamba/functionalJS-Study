import * as _ from 'fxjs';
import * as L from 'fxjs/Lazy';

/**
 * 안전한 합성에 대해
 *
 * 1. map으로 합성하기
 */

const f = (x) => x + 10;
const g = (x) => x - 5;
const fg = (x) => f(g(x));

_.log(fg(10));

_.log(fg());

_.go(10, fg, _.log);

/** map을 통한 합성  */
_.go([10], L.map(fg), _.each(_.log));
_.go([], L.map(fg), _.each(_.log));

_.log('---------------------------');

const users = [
    { id: 1, name: 'aa', age: 35 },
    // { id: 2, name: 'bb' },
    { id: 3, name: 'cc', age: 23 },
];

try {
    //console.time('');
    const findUser = _.find((u) => u.name === 'bb', users);
    // if (findUser)
    _.log(findUser.age);
    //console.timeEnd('');
} catch (error) {}

//console.time('');
// _.each(
//     console.log,
//     L.take(
//         1,
//         L.filter((u) => u.name === 'bb', users)
//     )
// );
//console.timeEnd('');

//console.time('');
_.go(
    users,
    L.filter((u) => u.name === 'bb'),
    L.take(1),
    L.map((u) => u.age),
    _.each(_.log)
);
//console.timeEnd('');
