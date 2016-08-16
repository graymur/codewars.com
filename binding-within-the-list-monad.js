/**
 * http://www.codewars.com/kata/546e416c8e3b6bf82f0002f2
 *
 Description:

 In Haskell, Monads are simple containers, or even 'box-like' datastructures, of which lists are included, which can respond to certain functions, which are defined in the Monad typeclass. (To put it simply!)

 In this kata, you must implement the Bind function for lists, or arrays. In haskell, the function is represented by >>=, but we'll just call it bind.

 Essentially, bind should map the array with the function given, and then flatten it one time. Don't manipulate the original array; make you function pure: without side-effects, so that no variables are edited whilst the function is carried out.

 Here's how it should work:

 bind( [1,2,3], function(a){ return [a+1] } )
 => [2,3,4]

 bind( [1,2,3], function(a){ return [[a]] } )
 => [[1],[2],[3]]

 bind( [1,2,3], function(a){ return a } )
 => # ERROR! The returned value is not a list!

 As per usual, the ruby function will be passed a Proc or Lambda. Remember that the function still takes two arguments!

 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

const bind = function(list, func) {
    if (!Array.isArray(func(list[0]))) throw "ERROR! The returned value is not a list!";
    return list.map(func).reduce(function (curry, el) {
        return curry.concat(el);
    }, []);
};

Test.assertSimilar( bind([1,2,3], function(a){return [a]} ), [1,2,3] );
Test.assertSimilar( bind([7,8,9], function(a){return [[a]]} ), [[7],[8],[9]] );
Test.assertSimilar( bind([3,4,5], function(a){return [[a,-a]]} ), [[3,-3],[4,-4],[5,-5]] );
Test.assertSimilar( bind([5,6,7], function(a){return [String(a)]} ), ["5","6","7"] );