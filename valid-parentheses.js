/**
 * https://www.codewars.com/kata/52774a314c2333f0a7000688
 *
 Description:

 Write a function called validParentheses that takes a string of parentheses, and determines
 if the order of the parentheses is valid. validParentheses should return true if the string
 is valid, and false if it's invalid.

 Examples:
 validParentheses( "()" ) => returns true
 validParentheses( ")(()))" ) => returns false
 validParentheses( "(" ) => returns false
 validParentheses( "(())((()())())" ) => returns true

 All input strings will be nonempty, and will only consist of open parentheses '(' and/or closed parentheses ')'

 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function validParentheses(parens){
    var valid = 0;
    var arr = parens.split('');

    arr.forEach(function (e) {
        valid += e === '(' ? 1 : -1;
    });

    return valid === 0 && arr[0] === '(' && arr[arr.length - 1] === ')';
}

Test.assertEquals(validParentheses( "()" ), true);
Test.assertEquals(validParentheses( "())" ), false);
Test.assertEquals(validParentheses( "(())((()())())" ), true);