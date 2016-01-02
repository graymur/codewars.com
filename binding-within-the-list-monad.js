/**
 * http://www.codewars.com/kata/546e416c8e3b6bf82f0002f2
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

const bind = function(list, func) {
    if (!Array.isArray(func(list[0]))) throw "ERROR! The returned value is not a list!";
    return list.map(func).reduce(function (curry, el) {
        return curry.concat(el);
    }, []);
};

Test.assertSimilar( bind([1,2,3], function(a){return [a]} ), [1,2,3] );
Test.assertSimilar( bind([7,8,9], function(a){return [[a]]} ), [[7],[8],[9]] );
Test.assertSimilar( bind([3,4,5], function(a){return [[a,-a]]} ), [[3,-3],[4,-4],[5,-5]] );
Test.assertSimilar( bind([5,6,7], function(a){return [String(a)]} ), ["5","6","7"] );