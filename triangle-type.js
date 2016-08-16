/**
 * https://www.codewars.com/kata/53907ac3cd51b69f790006c5
 *
 *
 Description:

 In this kata, you should calculate type of triangle with three given sides a, b and c (given in any order).

 If all angles are less than 90°, this triangle is acute and function should return 1.

 If one angle is strictly 90°, this triangle is right and function should return 2.

 If one angle more than 90°, this triangle is obtuse and function should return 3.

 If three sides cannot form triangle, or one angle is 180° (which turns triangle into segment) - function should return 0.

 Input parameters are sides of given triangle. All input values are non-negative floating point or integer numbers (or both).
 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

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
