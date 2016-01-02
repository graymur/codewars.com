/**
 * http://www.codewars.com/kata/525c65e51bf619685c000059/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

function removeSmallest(numbers) {
    let min, index;

    if (numbers.length) {
        min = Math.min.apply(null, numbers);
        numbers.splice(numbers.indexOf(min), 1);
    }

    return numbers;
}

Test.describe("removeSmallest", function() {
    Test.it("works for the examples", function() {
        Test.assertSimilar(removeSmallest([1, 2, 3, 4, 5]), [2, 3, 4, 5], "Wrong result for [1, 2, 3, 4, 5]");
        Test.assertSimilar(removeSmallest([5, 3, 2, 1, 4]), [5, 3, 2, 4], "Wrong result for [5, 3, 2, 1, 4]");
        Test.assertSimilar(removeSmallest([2, 2, 1, 2, 1]), [2, 2, 2, 1], "Wrong result for [2, 2, 1, 2, 1]");
        Test.assertSimilar(removeSmallest([]), [], "Wrong result for []");
    });

    Test.it("returns [] if the list has only one element", function() {
        for (let i = 0; i < 10; ++i) {
            let x = ~~(Math.random() * 400);
            Test.assertSimilar(removeSmallest([x]), [], `Wrong result for ${[x]}`);
        }
    });

    function randomArray(length) {
        return Array.from({length: length}, () => ~~(Math.random() * 400));
    }

    Test.it("returns a list that misses only one element", function() {
        for(let i = 0; i < 10; ++i) {
            let arr = randomArray(~~(Math.random() * 10) + 1);
            let l = arr.length;
            Test.assertSimilar(removeSmallest(arr).length, l - 1, `Wrong result for ${arr}`);
        }
    });
});