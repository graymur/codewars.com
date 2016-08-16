/**
 * https://www.codewars.com/kata/53db4acb1f1a7dd68700040a
 *
 I'm sure, you know Google's "Did you mean ...?", when you entered a search term and mistyped a word. In this kata we want to implement something similar.

 You'll get an entered term (lowercase string) and an array of known words (also lowercase strings). Your task is to find out, which word from the dictionary is most similar to the entered one. The similarity is described by the minimum number of letters you have to add, remove or replace in order to get from the entered word to one of the dictionary. The lower the number of required changes, the higher the similarity between each two words.

 Same words are obviously the most similar ones. A word that needs one letter to be changed is more similar to another word that needs 2 (or more) letters to be changed. E.g. the mistyped term berr is more similar to beer (1 letter to be replaced) than to barrel (3 letters to be changed in total).

 Extend the dictionary in a way, that it is able to return you the most similar word from the list of known words.

 Code Examples:

 fruits = new Dictionary(['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry']);
 fruits.findMostSimilar('strawbery'); // must return "strawberry"
 fruits.findMostSimilar('berry'); // must return "cherry"

 things = new Dictionary(['stars', 'mars', 'wars', 'codec', 'codewars']);
 things.findMostSimilar('coddwars'); // must return "codewars"

 languages = new Dictionary(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript']);
 languages.findMostSimilar('heaven'); // must return "java"
 languages.findMostSimilar('javascript'); // must return "javascript" (same words are obviously the most similar ones)

 I know, many of you would disagree that java is more similar to heaven than all the other ones, but in this kata it is ;)

 Additional notes:

 there is always exactly one possible solution

 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function wordsDifference(w1, w2) {
    var d1 = difference(w1.split(''), w2.split('')).length;
    var d2 = difference(w2.split(''), w1.split('')).length;
    return d1 > d2 ? d1: d2
}

function difference(a1, a2) {
    var result = [];

    for (var i = 0; i < a1.length; i++) {
        if (a2.indexOf(a1[i]) === -1) {
            result.push(a1[i]);
        }
    }

    return result;
}

function Dictionary(words) {
    console.log(words);
    this.words = words;
}

Dictionary.prototype.findMostSimilar = function (search) {
    if (this.words.indexOf(search) > -1) {
        return search;
    }

    var matches = this.words.reduce(function (carry, word) {
        carry.push([word, wordsDifference(word, search)]);
        return carry;
    }, []).sort(function (a, b) {
        return a[1] > b[1];
    });

    return matches[0][0];
};








function TestDictionary(spec) {
    var matcher = new Dictionary(spec.words);
    spec.expectations.forEach(function (e) {
        Test.expect(
            matcher.findMostSimilar(e.query) == e.nearest
            , 'expected findMostSimilar("' + e.query + '") == "' + e.nearest + '"'
        );
    });
}

TestDictionary({
    words: ['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'],
    expectations: [
        { query:   'strawbery',
            nearest: 'strawberry'
        },
        { query:   'berry',
            nearest: 'cherry'
        }
    ],
});

TestDictionary({
    words: Test.randomize(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript']),
    expectations: [
        { query:   'heaven',
            nearest: 'java'
        },
        { query:   'javascript',
            nearest: 'javascript'
        }
    ]
});


var fruits = new Dictionary([ 'codec', 'code', 'codewars', 'wars', 'mars', 'stars' ]);
console.log(fruits.findMostSimilar('coddwars')); // must return "strawberry"