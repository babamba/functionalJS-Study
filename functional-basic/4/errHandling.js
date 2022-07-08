const { log, add, map, reduce, take, L, C, go, filter } = require('../fx');

/**
 * QnA 동기 상황에서 에러 핸들링은 어떻게 하는지?
 */

const list = [1, 2, 3, 4, 5, 6, 7, 8];

// function f7(list) {
//     try {
//         return list
//             .map((a) => a + 10)
//             .filter((a) => a % 2)
//             .slice(0, 2);
//     } catch (error) {
//         log(error);
//         return [];
//     }
// }

// log(f7());

/**
 * QnA 비동기 상황에서 에러 핸들링은 어떻게 하는지?
 */

// function f8(list) {
//     try {
//         // 내장 함수 map filter 등이 Promise에 대한 핸들링을 제공하지 않음.
//         return list
//             .map(
//                 (a) =>
//                     new Promise((resolve) => {
//                         resolve(JSON.parse(a));
//                     })
//             )
//             .filter((a) => a % 2)
//             .slice(0, 2);
//     } catch (error) {
//         log(error);
//         return [];
//     }
// }

// // log(f8(['0', '1', '{']));
// f8(['0', '1', '{'])
//     .then(log)
//     .catch((e) => {
//         log('에러 핸들링 해보겠다(안됨)');
//     });

/**
 * QnA 동기/비동기 상황에서 에러 핸들링에서의 파이프라인의 이점은?
 */

async function f9(list) {
    try {
        // 내장 함수 map filter 등이 Promise에 대한 핸들링을 제공하지 않음.

        // return await go(
        //     list,
        //     map(
        //         (a) =>
        //             new Promise((resolve) => {
        //                 resolve(JSON.parse(a));
        //             })
        //     ),
        //     filter((a) => a % 2),
        //     take(2)
        // );

        // const res = go(
        //     list,
        //     L.map(
        //         (a) =>
        //             new Promise((resolve) => {
        //                 resolve(JSON.parse(a));
        //             })
        //     ),
        //     L.filter((a) => a % 2),
        //     take(2)
        // );
        // return await res;

        return go(
            list,
            map((a) => JSON.parse(a)),
            filter((a) => a % 2),
            take(2)
        );
    } catch (error) {
        log('-------------에러는 여기로 잘온다.--------------------');
        return [];
    }
}

// log(f8(['0', '1', '{']));
f9(['0', '1', '2', '3', '4', '{']);
//.then((a) => log(a, 'f9'));
// .catch((e) => {
//     log('에러 핸들링 해보겠다(됨)');
// });
