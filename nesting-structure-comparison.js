/**
 * http://www.codewars.com/kata/520446778469526ec0000001/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

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
