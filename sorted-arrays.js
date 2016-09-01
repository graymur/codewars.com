/**
 * http://www.codewars.com/kata/sorted-arrays
 *
 Given any number of arrays each sorted in ascending order, find the nth smallest number of all their elements.

 All the arguments except the last will be arrays, the last argument is n.

 nthSmallest([1,5], [2], [4,8,9], 4) // returns 5 because it's the 4th smallest value

 Be mindful of performance.

 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function merge(left, right) {
    let result = [];
    let il = 0;
    let ir = 0;

    while (il < left.length && ir < right.length){
        if (left[il] < right[ir]){
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
}

function nthSmallest(/* ...arrays, n */) {
    var arrays = [].slice.call(arguments, 0);
    var n = arrays.pop();
    var array = arrays.reduce((carry, x) => merge(carry, x), []);

    return array[n - 1];
}

Test.describe("standard tests", function(){
    Test.it('should work for the given case', function() {
        Test.expect(nthSmallest([1,5], [2], [4,8,9], 4) === 5);
    });
});
