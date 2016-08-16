let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function narcissistic(value) {
    var power = value.toString().length;
    var sum = 0;

    for (var i = 0; i < power; i++) {
        sum += Math.pow(parseInt(value.toString()[i]), power);
    }

    return sum === value;
}

Test.expect(narcissistic(7) === true);
Test.expect(narcissistic(153) === true);
Test.expect(narcissistic(371) === true);
Test.expect(narcissistic(1634) === true);
Test.expect(narcissistic(1635) === false);