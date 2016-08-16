/**
 *
 * https://www.codewars.com/kata/5421c6a2dda52688f6000af8
 *
 Description:

 Function composition is a mathematical operation that mainly presents itself in lambda calculus and computability. It is explained well here, but this is my explanation, in simple mathematical notation:

 f3 = compose( f1 f2 )
 Is equivalent to...
 f3(a) = f1( f2( a ) )

 Your task is to create a compose function to carry out this task, which will be passed two functions or lambdas. Ruby functions will be passed, and should return, either a proc or a lambda. Remember that the resulting composed function may be passed multiple arguments!

 compose(f , g)(x)
 => f( g( x ) )

 This kata is not available in haskell; that would be too easy!

 *
 */

var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function compose(f, g) {
    return function () {
        return f(g.apply(null, arguments));
    };
}

var add1 = function (a) {
    return a + 1
};

var id = function (a) {
    return a
};

Test.expect(compose(add1, id)(0) == 1);