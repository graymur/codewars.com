/**
 * http://www.codewars.com/kata/53b406e67040e51e17000c0a/
 */

//"use strict";

var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

function length(obj) {
    return Object.keys(obj).length;
}

function LRUCache(capacity, init) {
    var props = {
        'storage': [],
        'index': {},
        'usage': [],
        '_capacity': 0
    };

    for (var k in props) {
        Object.defineProperty(this, k, { value: props[k], writable: true, enumerable: false, configurable: false });
    }

    Object.defineProperty(this, 'delete', {
        value: k => {
            if (typeof this.index[k] != 'undefined') {
                this.storage.splice(this.index[k], 1);

                this.index = {};
                this.storage.forEach((e, i) => {
                    this.index[e[1]] = i;
                });

                this.removeUsage(k);
            }
            return delete this[k];
        },
        configurable: false
    });

    Object.defineProperty(this, 'capacity', {
        get: function () {
            return this._capacity;
        },
        set: function (capacity) {
            if (this.size > capacity) {
                var size = this.size - 1;
                while (size >= capacity) {
                    this.delete(this.storage[0][1]);
                    size--;
                }
            }

            this._capacity = capacity;
        },
        configurable: false
    });

    Object.defineProperty(this, 'size', {
        get: function () {
            return this.storage ? this.storage.length : 0;
        },
        configurable: false
    });

    this.capacity = capacity;

    this.set(init);
}

LRUCache.prototype.set = function (values) {
    var k, toDelete;

    // remove entities if needed
    if (this.size + length(values) > this.capacity) {
        toDelete = this.size + length(values) - this.capacity;
        for (k in values) {
            if (!values.hasOwnProperty(k)) continue;
            if (typeof this.index[k] !== 'undefined') {
                toDelete--;
            }
        }

        while (toDelete > 0) {
            this.delete(this.usage[0]);
            toDelete--;
        }
    }

    for (k in values) {
        if (!values.hasOwnProperty(k)) continue;

        if (typeof this.index[k] === 'undefined') {
            this.storage.push([values[k], k]);
            this.index[k] = this.storage.length - 1;

            Object.defineProperty(this, k, {
                get: () => {

                    if (typeof this.index[k] === 'undefined') {
                        return undefined;
                    } else {
                        this.addUsage(k);

                        return this.storage[this.index[k]][0];
                    }
                },
                set: (value) => {
                    this.storage[this.index[k]][0] = value;
                    return this.storage[this.index[k]];
                },
                enumerable: true,
                configurable: true
            });
        } else {
            this.storage[this.index[k]][0] = values[k];
        }

        this.addUsage(k);
    }
};

LRUCache.prototype.removeUsage = function (k) {
    this.usage = this.usage.filter(key => key != k);
    return this.usage;
};

LRUCache.prototype.addUsage = function (k, v) {
    this.removeUsage(k);
    this.usage.push(k);
    return this.usage;
};

LRUCache.prototype.cache = function (k, v) {
    var obj = {};
    obj[k] = v;
    this.set(obj);
    return this;
};

var store = new LRUCache(3, {a: 1});

Test.assertEquals(store.size, 1, 'store.size');
Test.assertEquals(store.capacity, 3, 'store.capacity');
Test.assertEquals(store.a, 1, 'store.a');
Test.assertEquals(store.cache('b', 2)['b'], 2, 'store.b');
store.a = 5;
Test.assertEquals(store.a, 5, 'store.a');
store.cache('c', 3).cache('d', 4);
Test.assertEquals(store.b, undefined, 'store.b');
Test.assertEquals(store.c, 3, 'store.c');
Test.assertEquals(store.d, 4, 'store.d');
Test.assertEquals(store.a, 5, 'store.a');
Test.assertEquals(store.size, 3, 'store.size');
Test.assertEquals(store.delete('delete'), false, "store.delete('delete')");
Test.assertEquals(store.delete('d'), true, "store.delete('d')");
Test.assertEquals(store.d, undefined, 'store.d');
Test.assertEquals(store.delete('e'), true, "store.delete('e')");
Test.assertEquals(store.size, 2, 'store.size');
store.cache('c', 4);
Test.assertEquals(store.c, 4, 'store.c');
store.capacity = 1;
Test.assertEquals(Object.keys(store).length, 1, "Object.keys(store).length");
Test.assertEquals(Object.keys(store)[0], 'c', "Object.keys(store).length");