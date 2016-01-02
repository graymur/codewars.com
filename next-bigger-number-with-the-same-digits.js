/**
 * http://www.codewars.com/kata/55983863da40caa2c900004e/
 */

"use strict";

let tests = require('./lib/framework.js');
let _ = require('./lib/underscore.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

function replace(array, replace, startIndex) {
    var copy = array.slice(0);
    Array.prototype.splice.apply(copy, [startIndex, replace.length].concat(replace));
    return copy;
}

function nextBigger(n) {
    var digits = n.toString().split('').map(x => parseInt(x)), i, j, ph, num, rest, ret, min = 9, minIndex = 0;

    for (i = digits.length - 1; i >= 0; i--) {
        if (i === digits.length - 1) {
            continue;
        }

        if (digits[i] < digits[i + 1]) {
            num = digits[i];
            rest = digits.slice(i + 1);

            for (j = 0; j < rest.length; j++) {
                if (rest[j] > num && rest[j] < min) {
                    min = rest[j];
                    minIndex = j;
                }
            }

            ph = num;
            num = min;
            rest[minIndex] = ph;

            rest = [num].concat(rest.sort((a, b) => {
                return a > b ? 1 : -1;
            }));

            digits = replace(digits, rest, i);
            break;
        }
    }

    ret = parseInt(digits.join(''));

    return ret === n ? -1 : ret;
}

Test.assertEquals(nextBigger(12),21);
Test.assertEquals(nextBigger(513),531);
Test.assertEquals(nextBigger(2017),2071);
Test.assertEquals(nextBigger(414),441);
Test.assertEquals(nextBigger(144),414);