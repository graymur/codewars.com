var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

var dv = console.log.bind(console);

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