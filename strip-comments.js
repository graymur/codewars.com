/**
 * http://www.codewars.com/kata/51c8e37cee245da6b40000bd/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function solution(input, markers) {
    let reg = new RegExp('(\s*)(' + markers.map(escapeRegExp).join('|') + ').*$', 'g');

    return input.split("\n").map(function (line) {
        return line.replace(reg, '').replace(/(\s*)$/, '');
    }).join("\n");
}

Test.assertEquals(solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"]), "apples, pears\ngrapes\nbananas", 0);
Test.assertEquals(solution("a #b\nc\nd $e f g", ['#', '$']), "a\nc\nd", 0);
