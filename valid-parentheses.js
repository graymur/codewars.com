/**
 * http://www.codewars.com/kata/525c65e51bf619685c000059/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

function validParentheses(parens){
    var valid = 0;
    var arr = parens.split('');

    arr.forEach(function (e) {
        valid += e === '(' ? 1 : -1;
    });

    return valid === 0 && arr[0] === '(' && arr[arr.length - 1] === ')';
}

dv(validParentheses( "())" ));
dv(validParentheses( "(())((()())())" ));

dv(validParentheses( "()" )) //=> returns true
dv(validParentheses( ")(()))" )) //=> returns false
dv(validParentheses( "(" )) //=> returns false

Test.assertEquals(validParentheses( "()" ), true);
Test.assertEquals(validParentheses( "())" ), false);
Test.assertEquals(validParentheses( "(())((()())())" ), true);