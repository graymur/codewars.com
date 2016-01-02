/**
 * http://www.codewars.com/kata/53c235e4d5cd9c397200021d
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
};

function deepCompare(o1, o2) {
    let i, keys1, keys2;

    if (typeof o1 !== 'object' || typeof o2 !== 'object' || !o1 || !o2) {
        return o1 === o2;
    } else {
        keys1 = Object.keys(o1);
        keys2 = Object.keys(o2);

        if (keys1.diff(keys2).length || keys2.diff(keys1).length) {
            return false;
        }

        for (i in o1) {
            if (!o1.hasOwnProperty(i)) continue;

            if (!deepCompare(o1[i], o2[i])) {
                return false;
            }
        }
    }

    return true;
}

Test.expect(deepCompare({name: 'Joe', value: 1}, {name: 'Joe', value:  1}));
Test.expect(deepCompare({name: 'Joe', value: 1}, {name: 'Joe', value:  2}) === false);
Test.expect(deepCompare({name: 'Joe', value: 1, subobj: { name: 'Joe'}}, {name: 'Joe', value: 1, subobj: { name: 'Joe'}}));
Test.expect(deepCompare({name: 'Joe', value: 1, subobj: { name: 'Joe'}}, {name: 'Joe', value: 1, subobj: { name: 'Ellen'}}) === false);
Test.expect(deepCompare({subobj: { name: 'Joe'}, arr: [1,2,3]}, {subobj: { name: 'Joe'}, arr: [1,2,3]}));
