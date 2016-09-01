/**
 * https://www.codewars.com/kata/find-the-odd-int/
 *
 Given an array, find the int that appears an odd number of times.

 There will always be only one integer that appears an odd number of times.
 *
 */

var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function findOdd(A) {
    const freq = {};

    A.forEach((v, i) => {
        if (!freq[v]) freq[v] = 0;
        freq[v]++;
    });

    for (let i in freq) {
        if (freq[i] % 2 > 0) return Number(i);
    }

    return 0;
}

function doTest(a, n) {
    console.log("A = ", a);
    console.log("n = ", n);
    Test.assertEquals(findOdd(a), n);
}

Test.describe('Example tests', function() {
    doTest([20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5], 5);
    doTest([1,1,2,-2,5,2,4,4,-1,-2,5], -1);
    doTest([20,1,1,2,2,3,3,5,5,4,20,4,5], 5);
    doTest([10], 10);
    doTest([1,1,1,1,1,1,10,1,1,1,1], 10);
    doTest([5,4,3,2,1,5,4,3,2,10,10], 1);
});