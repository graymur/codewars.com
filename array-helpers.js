var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

var dv = console.log.bind(console);

powOf = function (power) {
    return function (number) {
        return Math.pow(number, power);
    }
};

Array.prototype.square = function () {
    return this.map(powOf(2));
};

Array.prototype.cube = function () {
    return this.map(powOf(3));
};

Array.prototype.sum = function () {
    return this.reduce(function (curry, element) {
        return curry + element;
    }, 0);
};

Array.prototype.average = function () {
    return this.sum() / this.length;
};

Array.prototype.even = function () {
    return this.filter(function (element) {
        return element % 2 === 0;
    });
};

Array.prototype.odd = function () {
    return this.filter(function (element) {
        return element % 2 !== 0;
    });
};

var numbers = [1, 2, 3, 4, 5];

Test.assertSimilar(numbers.square(), [1, 4, 9, 16, 25]);
Test.assertSimilar(numbers.cube(), [1, 8, 27, 64, 125]);
Test.assertEquals(numbers.sum(), 15, 'Wrong sum');
Test.assertEquals(numbers.average(), 3, 'Wrong average');
Test.assertSimilar(numbers.even(), [2, 4], 'Wrong result for even()');
Test.assertSimilar(numbers.odd(), [1, 3, 5], 'Wrong result for odd()');
