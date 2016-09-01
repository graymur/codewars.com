/**
 * http://www.codewars.com/kata/twice-linear
 *
 Consider a sequence u where u is defined as follows:

 The number u(0) = 1 is the first one in u.
 For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too.
 There are no other numbers in u.

 Ex: u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]

 1 gives 3 and 4, then 3 gives 7 and 10, 4 gives 9 and 13, then 7 gives 15 and 22 and so on...
 Task:

 Given parameter n the function dbl_linear (or dblLinear...) returns the element u(n) of the ordered (with <) sequence u.
 Example:

 dbl_linear(10) should return 22
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function dblLinear(n) {
    let i1 = 0;
    let i2 = 0;
    let seq = [1];

    for (let i = 0; i < n; i++) {
        let y = 2 * seq[i1] + 1;
        let z = 3 * seq[i2] + 1;

        if (y < z) {
            seq.push(y);
            i1++;
        } else if (y > z) {
            seq.push(z);
            i2++;
        } else {
            i1++;
            i--;
        }
    }

    console.log(seq);

    return seq[n]
}

console.log(dblLinear(15));
