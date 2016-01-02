/**
 * http://www.codewars.com/kata/5302d655be2a91068b0001fb/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

/**
 * Constructor DependencyInjector
 * @param {Object} - object with dependencies
 */
var DI = function (dependency) {
    this.dependency = dependency;
};

// Should return new function with resolved dependencies
DI.prototype.inject = function (func) {
    let names, args = [];

    names = func.toString()
        .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg,'')
        .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
        .split(/,/);

    names.forEach(dep => {
        if (dep) {
            args.push(this.dependency[dep]);
        }
    });

    return function () {
        return func.apply(func, args.length > 0 ? args : undefined);
    };
};

var deps = {
    'dep1': function () {return 'this is dep1';},
    'dep2': function () {return 'this is dep2';},
    'dep3': function () {return 'this is dep3';},
    'dep4': function () {return 'this is dep4';}
};

var di = new DI(deps);

var myFunc = di.inject(function (dep3, dep1, dep2) {
    return [dep1(), dep2(), dep3()].join(' -> ');
});

var myFunc1 = di.inject(function () {
    return arguments.length;
});

Test.assertEquals(myFunc(), 'this is dep1 -> this is dep2 -> this is dep3');
Test.assertEquals(myFunc1(), 0);
