/**
 * https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39
 *
 *
 Description:

 This time we want to write calculations using functions and get the results. Let's have a look at some examples:

 seven(times(five())); // must return 35
 four(plus(nine())); // must return 13
 eight(minus(three())); // must return 5
 six(dividedBy(two())); // must return 3

 Requirements:

 There must be a function for each number from 0 ("zero") to 9 ("nine")
 There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy (divided_by in Ruby)
 Each calculation consist of exactly one operation and two numbers
 The most outer function represents the left operand, the most inner function represents the right operand

 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const number = function number(n) {
    return function (f) {
        return typeof f === 'function' ? f(n) : n;
    }
};

const zero    = number(0);
const one     = number(1);
const two     = number(2);
const three   = number(3);
const four    = number(4);
const five    = number(5);
const six     = number(6);
const seven   = number(7);
const eight   = number(8);
const nine    = number(9);

const plus = function(m) {
    return function (n) {
        return n + m;
    }
};

const minus = function(m) {
    return function (n) {
        return n - m;
    }
};

const times = function(m) {
    return function (n) {
        return n * m;
    }
};

const dividedBy = function(m) {
    return function (n) {
        return n / m;
    }
};

Test.assertEquals(seven(times(five())), 35);
Test.assertEquals(four(plus(nine())), 13);
Test.assertEquals(eight(minus(three())), 5);
Test.assertEquals(six(dividedBy(two())), 3);