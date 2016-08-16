/**
 * http://www.codewars.com/kata/521ef596c106a935c0000519
 *
 Description:

 We need prime numbers and we need them now!

 Write a method that takes a maximum bound and returns all primes starting with 0 up-to and including the maximum bound.

 For example:

 prime(11);

 Should return an array that looks like this:

 [2,3,5,7,11]


 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function primeTrial(num) {
    var sqrt = Math.ceil(Math.sqrt(num)), i = 1;

    while (++i <= sqrt) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

function prime(num) {
    if (num < 2) return [];

    var retval = [2];

    for (var i = 3; i <= num; i += 2) {
        if (primeTrial(i)) {
            retval.push(i);
        }
    }

    return retval;
}

let result = prime(11);

Test.assertEquals(result[0], 2);
Test.assertEquals(result[1], 3);
Test.assertEquals(result[2], 5);
Test.assertEquals(result[3], 7);
Test.assertEquals(result[4], 11);