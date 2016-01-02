/**
 * http://www.codewars.com/kata/51ba717bb08c1cd60f00002f/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

function solution(arr) {
    return arr.reduce((curry, x, i) => {
        if (i === 0 || x - arr[i - 1] > 1) {
            curry.push([x]);
        } else {
            curry[curry.length - 1].push(x);
        }

        return curry;
    }, []).reduce((curry, x) => {
        if (x.length < 3) {
            curry = curry.concat(x.toString());
        } else {
            curry = curry.concat(x[0] + '-' + x[x.length - 1]);
        }

        return curry;
    }, []).toString();
}


var ret = solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);

dv(ret);

