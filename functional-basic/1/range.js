const { go, curryReduce, add, log, L, range } = require('../fx');

// log(range(5));

// log(range(2));

var list = range(4);

// log(reduce(add, list));

// 느긋한 L.range

// log(range(5));

// log(range(2));

var list = L.range(4);
// log(list);
// log(list.next());
// log(list.next());
// log(list.next());
// log(list.next());

// log(reduce(add, list));

console.clear();

function test(name, time, f) {
    console.time(name);
    while (time--) f();
    console.timeEnd(name);
}

// test('range', 10, () => reduce(add, range(1000)));
test('L.range', 10, () => curryReduce(add, L.range(1000)));
