/**
 * http://www.codewars.com/kata/53c2502d1dfa43f6420001e6/
 */

"use strict";

let tests = require('./lib/framework.js');
let _ = require('./lib/underscore.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

function max() {
    return Math.max.apply(null, arguments);
}

function filterNumbers() {
    return Array.prototype.filter.call(arguments, function(value) {
        return isNumeric(value);
    });
}

function isNumeric(n) {
    return !isNaN(n) && Number(n) === n;
}

function filterRange(min, max) {
    var args = Array.prototype.slice.call(arguments, 2);
    return Array.prototype.filter.call(args, function(value) {
        return min <= value && value <= max;
    });
}

function Lazy() {
    this.functions = [];

    this.add = function () {
        let args = Array.prototype.slice.call(arguments);
        this.functions.push([args.slice(0, 1)[0], args.slice(1)]);
        return this;
    };

    this.invoke = function () {
        return this.functions.reduce((curry, element) => {
            let fn = element[0];
            return fn.apply(fn, element[1].concat(curry));
        }, Array.prototype.slice.call(arguments)[0]);
    };
}

let result = new Lazy()
    .add(filterNumbers)
    .add(filterRange, 2, 7)
    .add(max)
    .invoke([1, 8, 6, [], "7", -1, {v: 5}, 4]); //6

dv(result);