/**
 * http://www.codewars.com/kata/55d3b1f2c1b2f0d3470000a9/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

/* Should return ᐃ type:
 0 : if ᐃ cannot be made with given sides
 1 : acute ᐃ
 2 : right ᐃ
 3 : obtuse ᐃ
 */
function triangleType(a, b, c) {
    if (a >= (b + c) || b >= (a + c) || c >= (a + b)) return 0;

    let retval = 1;
    let epsilon = 0.001;

    let angA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
    let angB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
    let angC = 180 - angA - angB;

    let angles = [angA, angB, angC];

    let right = angles.filter((e) => {
        return e < 90 + epsilon && e > 90 - epsilon;
    }).length;

    let obtuse = angles.filter((e) => {
        return e > 90
    }).length;

    let segment = angles.filter((e) => {
        return e === 180
    }).length;

    if (right) {
        retval = 2;
    } else if (segment) {
        retval = 0;
    } else if (obtuse) {
        retval = 3;
    }

    return retval;
}

Test.assertEquals(triangleType(7,3,2), 0); // Not triangle
Test.assertEquals(triangleType(2,4,6), 0); // Not triangle
Test.assertEquals(triangleType(8,5,7), 1); // Acute
Test.assertEquals(triangleType(3,4,5), 2); // Right
Test.assertEquals(triangleType(7,12,8), 3); // Obtuse
