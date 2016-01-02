/**
 * http://www.codewars.com/kata/520446778469526ec0000001/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

//Array.prototype.diff = function(a) {
//    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
//};
//
//function deepCompare(o1, o2) {
//    let i, keys1, keys2;
//
//    if (typeof o1 !== 'object' || typeof o2 !== 'object' || !o1 || !o2) {
//        return o1 === o2;
//    } else {
//        keys1 = Object.keys(o1);
//        keys2 = Object.keys(o2);
//
//        if (keys1.diff(keys2).length || keys2.diff(keys1).length) {
//            return false;
//        }
//
//        for (i in o1) {
//            if (!o1.hasOwnProperty(i)) continue;
//
//            if (!deepCompare(o1[i], o2[i])) {
//                return false;
//            }
//        }
//    }
//
//    return true;
//}

function isArray(ar) {
    return Object.prototype.toString.call(ar) === '[object Array]';
}

function sameStructure(a1, a2) {
    if (!isArray(a1) && !isArray(a2)) return true;
    if (a1.length !== a2.length) return false;

    return a1.every((x, i) => {
        return sameStructure(a1[i], a2[i]);
    });
}

Array.prototype.sameStructureAs = function (other) {
    return sameStructure(this, other);
};

Test.expect([ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] ));
Test.expect([ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] ));

Test.expect([ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] ) === false);
Test.expect([ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] ) === false);

Test.expect([ [ [ ], [ ] ] ].sameStructureAs( [ [ [ ], [ ] ] ] ));
Test.expect([ [ [ ], [ ] ] ].sameStructureAs( [ [ 1, 1 ] ] ) === false);
