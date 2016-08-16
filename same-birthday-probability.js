/**
 * https://www.codewars.com/kata/5419cf8939c5ef0d50000ef2/
 *
 * Given n number of people in a room, calculate the probability that any two
 * people in that room have the same birthday (assume 365 days every year = ignore leap year).
 * Answers should be two decimals unless whole (0 or 1) eg 0.05
 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function calculateProbability(n) {
    var acc = 1;

    for (var i = 1; i < n; i++) {
        acc *= 1 - i / 365;
    }

    return Math.round((1 - acc) * 100) / 100;
}

Test.expect(calculateProbability(5) == 0.03, '0.03 is not matched');
Test.expect(calculateProbability(1000) == 1, '1000 is not matched');