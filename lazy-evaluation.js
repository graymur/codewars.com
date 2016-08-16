/**
 * http://www.codewars.com/kata/53c2502d1dfa43f6420001e6/
 *
 Description:

 Lazy evaluation is an evaluation strategy which delays the evaluation of an expression until its value is needed.

 Implement the Lazy function. This function has two methods:

 add(fn[, arg1, arg2, ...]): adds the fn function to the lazy chain evaluation. This function could receive optional arguments.
 invoke(target): performs the evaluation chain over the target array.

 For example:

 Given these functions:

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

 You could use it via composition:

 max.apply(null, filterRange.apply(null, [1, 3].concat(filterNumbers(1, 2, "3", 7, 6, 5))));

 But this solution is not reusable.

 A better approach could be to use composition with lazy invocation:

 new Lazy()
 .add(filterNumbers)
 .add(filterRange, 2, 7)
 .add(max)
 .invoke([1, 8, 6, [], "7", -1, {v: 5}, 4]); //6

 Step by step, this is what should happen when invoke function is called:

 filterNumbers(1, 8, 6, [], "7", -1, {v: 5}, 4) // == [1, 8, 6, -1, 4]
 //            ^------------------------------ from invoke
 filterRange(2, 7, 1, 8, 6, -1, 4) // == [6, 4]
 // from add ---^  ^------------- from previous result
 max(6, 4) // == 6
 //  ^--- from previous result

 Result from invoke: 6
 //                  ^ from last result

 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

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

Test.assertEquals(result, 6);