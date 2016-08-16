/**
 * https://www.codewars.com/kata/5375f921003bf62192000746
 *
 Description:

 The word i18n is a common abbreviation of internationalization the developer
 community use instead of typing the whole word and trying to spell it correctly.
 Similarly, a11y is an abbreviation of accessibility.

 Write a function that takes a string and turns any and all "words" (see below)
 within that string of length 4 or greater into an abbreviation following the same rules.

 Notes:

 A "word" is a sequence of alphabetical characters. By this definition, any other
 character like a space or hyphen (eg. "elephant-ride") will split up a series of
 letters into two words (eg. "elephant" and "ride").
 The abbreviated version of the word should have the first letter, then the number of
 removed characters, then the last letter (eg. "elephant ride" => "e6t-r2e").
 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function getDividers(string) {
    return string.match(/([^a-z]+)/gi);
}

function getWords(string) {
    return string.match(/([a-z]+)/gi);
}

function doAbbreviate(string) {
    if (string.length > 3) {
        string = string[0] + (string.length - 2) + string[string.length - 1];
    }

    return string;
}

function abbreviate(string) {
    var abbreviated = getWords(string).map(doAbbreviate);
    var dividers = getDividers(string) || [];

    return abbreviated.reduce(function (carry, element, index) {
        carry += element + (dividers[index] || '');
        return carry;
    }, '');
}

Test.assertEquals(abbreviate('wolf is yellow'), 'w2f is y4w');
Test.assertEquals(abbreviate('wolf-is-yellow'), 'w2f-is-y4w');
Test.assertEquals(abbreviate('wolf-is yellow'), 'w2f-is y4w');
Test.assertEquals(abbreviate('You need, need not want, to complete this code-wars mission'), 'You n2d, n2d not w2t, to c6e t2s c2e-w2s m5n');
