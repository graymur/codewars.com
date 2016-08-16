/**
 * https://www.codewars.com/kata/529adbf7533b761c560004e5
 *
 * For this particular Kata we want to implement the memoization solution.
 * This will be cool because it will let us keep using the tree recursion
 * algorithm while still keeping it sufficiently optimized to get an answer very rapidly.

 The trick of the memoized version is that we will keep a cache data structure (most
 likely an associative array) where we will store the Fibonacci numbers as we calculate
 them. When a Fibonacci number is calculated, we first look it up in the cache, if it's
 not there, we calculate it and put it in the cache, otherwise we returned the cached number.

 Refactor the function into a recursive Fibonacci function that using a memoized data
 structure avoids the deficiencies of tree recursion Can you make it so the memoization
 cache is private to this function?
 */

var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

var fib = function (n) {
    if (n == 0 || n == 1)
        return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
};

function memoize(f) {
    var cache = {};
    var fKey = f.toString();

    if (!cache[fKey]) cache[fKey] = {};

    return function () {
        var args = [].slice.call(arguments);
        var aKey = args.toString();

        if (typeof cache[fKey][aKey] === 'undefined') {
            cache[fKey][aKey] = f.apply(this, args);
        }

        return cache[fKey][aKey];
    }
}

var fibonacci = memoize(fib);

describe("Kata Test Suite", function () {
    it("should calculate large Fibonacci numbers", function () {
        Test.assertEquals(fibonacci(70), 190392490709135);
        Test.assertEquals(fibonacci(60), 1548008755920);
        Test.assertEquals(fibonacci(50), 12586269025);
    });
});