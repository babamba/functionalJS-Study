import * as _ from 'fxjs';
import * as L from 'fxjs/Lazy';

/**
 * 사용자 정의 객체를 이터러블 프로그래밍으로 다루기
 * 1. Map, Set
 * 2. Model, Collection
 * 3. Product, Products
 */

/** 1. Map, Set */
_.log('-------------------Map / Set-------------------');

let m = new Map();
m.set('a', 1);
m.set('b', 2);
m.set('c', 3);

console.log(m.entries());
console.log([...m.entries()]);
console.log(m.keys());
console.log([...m.keys()]);
console.log(m.values());
console.log([...m.values()]);

_.go(
    m,
    L.filter(([k, v]) => v % 2),
    _.takeAll,
    (entries) => new Map(entries),
    _.log
);

let s = new Set();
s.add(10);
s.add(20);
s.add(30);

_.log(s);
_.log([...s]);

const add = (a, b) => a + b;

_.log(_.reduce(add, s));

/** 2. Model, Collection */
_.log('-------------------Model / Collection-------------------');

class Model {
    constructor(attrs = {}) {
        this._attrs = attrs;
    }

    get(k) {
        return this._attrs[k];
    }
    set(k, v) {
        this._attrs[k] = v;
        return this;
    }
}

class Collection {
    constructor(models = []) {
        this._models = models;
    }

    at(idx) {
        return this._models[idx];
    }

    add(model) {
        this._models.push(model);
        return this;
    }
    // *[Symbol.iterator]() {
    //     yield* this._models;
    //     // for (const model of this._models) {
    //     //     yield model;
    //     // }
    // }
    // [Symbol.iterator]() {
    //     return this._models[Symbol.iterator]();
    // }
    *[Symbol.iterator]() {
        yield* this._models;
    }
}

const coll = new Collection();
coll.add(new Model({ id: 1, name: 'AA' }));
coll.add(new Model({ id: 3, name: 'BB' }));
coll.add(new Model({ id: 5, name: 'CC' }));
console.log(coll.at(2).get('name'));
console.log(coll.at(1).get('id'));

_.go(
    coll,
    L.map((m) => m.get('name')),
    _.each(console.log)
);

_.go(
    coll,
    _.each((m) => m.set('name', m.get('name').toLowerCase()))
);

console.log([...coll]);

/** 2. Product, Products */
_.log('-------------------Product, Products-------------------');

class Product extends Model {}
class Products extends Collection {
    totalPrice() {
        return _.reduce(
            add,
            L.map((p) => p.get('price'), this)
        );

        // let total = 0;
        // console.log(this._models);
        // this._models.forEach((product) => {
        //     total += product.get('price');
        // });
        // return total;
    }
}

const products = new Products();
products.add(new Product({ id: 1, price: 10000 }));
console.log(products.totalPrice());
products.add(new Product({ id: 3, price: 25000 }));
console.log(products.totalPrice());
products.add(new Product({ id: 5, price: 35000 }));
console.log(products.totalPrice());
