/**
 * https://www.codewars.com/kata/52b757663a95b11b3d00062d
 *
 Description:

 Write a function toWeirdCase (weirdcase in Ruby) that accepts a string, and returns the same string with all even indexed characters in each word upper cased, and all odd indexed characters in each word lower cased. The indexing just explained is zero based, so the zero-ith index is even, therefore that character should be upper cased.

 The passed in string will only consist of alphabetical characters and spaces(' '). Spaces will only be present if there are multiple words. Words will be separated by a single space(' ').
 Examples:

 toWeirdCase( "String" );//=> returns "StRiNg"
 toWeirdCase( "Weird string case" );//=> returns "WeIrD StRiNg CaSe"
 *
 */

var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

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