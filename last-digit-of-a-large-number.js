/**
 * http://www.codewars.com/kata/53c235e4d5cd9c397200021d
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);


function lastDigit(str1, str2){
    let decNum1 = parseInt(str1);
    let decNum2 = parseInt(str2);
    let binNum1 = parseInt(str1).toString(2);
    let binNum2 = parseInt(str2).toString(2);

    //dv(parseInt(str1).toString(2));
    //dv(parseInt(str1).toString(2));
    //dv(decNum1);
    //dv(decNum2);
    //dv(binNum1);
    //dv(binNum2);

    dv(Math.pow(binNum1, binNum2));

    dv(decNum1 * decNum1);
}

lastDigit("9", "7");