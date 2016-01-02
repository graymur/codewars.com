var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

var dv = console.log.bind(console);

function chained(functions) {
    return function (x) {
        return functions.reduce(function (curry, f) {
            return f(curry);
        }, x);
    }
}

function f1(x) {
    return x * 2
}
function f2(x) {
    return x + 2
}
function f3(x) {
    return Math.pow(x, 2)
}

function f4(x) {
    return x.split("").concat().reverse().join("").split(" ")
}
function f5(xs) {
    return xs.concat().reverse()
}
function f6(xs) {
    return xs.join("_")
}

Test.assertEquals(chained([f1, f2, f3])(0), 4);
Test.assertEquals(chained([f1, f2, f3])(2), 36);
Test.assertEquals(chained([f3, f2, f1])(2), 12);

Test.assertEquals(chained([f4, f5, f6])("lorem ipsum"), "merol_muspi");