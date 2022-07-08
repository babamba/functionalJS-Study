/**
 * 커링
 *
 * 함수에 인자를 하나 씩 적용해나가다 필요한 인자가 모두 채워지면 함수 본체를 실행하는 기법
 */

function _curry(fn) {
    return function (a, b) {
        return arguments.length === 2
            ? fn(a, b)
            : function (b) {
                  return fn(a, b);
              };
    };
}

function _curryr(fn) {
    return function (a, b) {
        return arguments.length === 2
            ? fn(a, b)
            : function (b) {
                  return fn(b, a);
              };
    };
}

var add = function (a, b) {
    return a + b;
};

var addCurry = _curry(function (a, b) {
    return a + b;
});

// 커리의 결과는 아래와 같음.

// var addCurry = function (a) {
//     return function (b) {
//         return fn(a, b);
//     };
// };);

console.log(addCurry(3, 5));
var add10 = addCurry(10); // 결과는 함수를 리턴한다.
console.log(add10(5));

var sub = _curryr(function (a, b) {
    return a - b;
});

console.log(sub(10, 5));

var sub10 = sub(10);

console.log(sub10(5));
