"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

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