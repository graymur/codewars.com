/**
 * http://www.codewars.com/kata/521ef596c106a935c0000519
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

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

dv(prime(20));