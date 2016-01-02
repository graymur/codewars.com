var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

var dv = console.log.bind(console);

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