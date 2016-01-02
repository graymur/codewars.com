var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

var dv = console.log.bind(console);

function toWeirdCase(string) {
    return string.replace(/\w{1,}/g, (word) => {
        return word.split('').map(function (letter, index) {
            return index % 2 === 0 ? letter.toUpperCase() : letter.toLowerCase();
        }).join('');
    });
}

describe('toWeirdCase', function () {
    it('should return the correct value for a single word', function () {
        Test.assertEquals(toWeirdCase('This'), 'ThIs');
        Test.assertEquals(toWeirdCase('is'), 'Is');
    });
    it('should return the correct value for multiple words', function () {
        Test.assertEquals(toWeirdCase('This is a test'), 'ThIs Is A TeSt');
    });
});