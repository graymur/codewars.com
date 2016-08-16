/**
 * https://www.codewars.com/kata/javascript-magic-function
 *
 Create function that:

 accepts any number of parameters,
 returns sum of every single parameter given,
 any parameter that can not be parsed as a number will be counted as 0.
 can be called infinitely,
 the next function call will do the same thing, but also summing the last returned number.

 MagicFunction(3) == 3; // should return true
 MagicFunction(1, 2) == 3; // should return true
 MagicFunction(1, 3)(2) == 6; // should return true
 MagicFunction(1, 2)(3, 4, 5)(6)(7, 10) == 38; // should return true
 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function MagicFunction(...args) {
    let result = args.reduce((sum, curr) => {
        return sum + (isNaN(Number(curr)) ? 0 : Number(curr));
    }, 0);

    let res = MagicFunction.bind(this, result);

    res.valueOf = () => result;

    return res;
}

Test.expect(0 == MagicFunction());
Test.expect(3 == MagicFunction(1, 2));
Test.expect(6 == MagicFunction(1, 3)(2));
Test.expect(6 == MagicFunction(1)(2, 3));
Test.expect(6 == MagicFunction(1)(2)(3));
Test.expect(38 == MagicFunction(1, 2)(3, 4, 5)(6)(7, 10));