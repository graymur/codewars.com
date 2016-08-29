/**
 * http://www.codewars.com/kata/countdown-longest-word
 *
 Detail

 Countdown is a British game show with number and word puzzles. The letters round
 consists of the contestant picking 9 shuffled letters - either picking from the
 vowel pile or the consonant pile. The contestants are given 30 seconds to try to
 come up with the longest English word they can think of with the available
 letters - letters can not be used more than once unless there is another of the
 same character.
 Task

 Given an uppercase 9 letter string, letters, find the longest word that can be
 made with some or all of the letters. The preloaded array words (or $words in Ruby)
 contains a bunch of uppercase words that you will have to loop through. Only return
 the longest word; if there is more than one, return the words of the same lengths
 in alphabetical order. If there are no words that can be made from the letters
 given, return None/nil/null.

 Examples

 letters = "ZZZZZZZZZ"
 longest word = None

 letters = "POVMERKIA",
 longest word = ["VAMPIRE"]

 letters = "DVAVPALEM"
 longest word = ["VAMPED", "VALVED", "PALMED"]


 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const words = [
    'GAME',
    'TODAY', 'TOWER', 'TRADE', 'WATER',
    'BEAT', 'BITE', 'BYTE',
    'LOOK', 'YOLK',
    'CAGES', 'CAUSE', 'CAVES', 'DATES', 'GATES', 'GUEST', 'STAGE', 'USAGE',
    'ACTS','AGES','CAGE','CASE','CAST','CAVE','CUTS','DATA','DATE','DEED','DUST','EASE','EAST','EDGE','EGGS','EVES','GAGE','GATE','SEAS','SEAT','SEED','SETS','TAGS','TEST','TUGS','USES'
];

//function longestWord(letters) {
//    letters = letters.split('');
//    let maxLength = 0;
//
//    var match = words.filter(word => {
//        let l = letters.slice();
//
//        for (let i = 0; i < word.length; i++) {
//            let index = l.indexOf(word[i]);
//            if (index === -1) return false;
//            l[index] = null;
//        }
//
//        if (word.length > maxLength) maxLength = word.length;
//        return true;
//    }).filter(x => x.length === maxLength).sort((a, b) => {
//        if (a.length === b.length) {
//            return a < b ? -1 : a > b ? 1 : 0;
//        }
//
//        return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;
//    });
//
//    return match.length ? match : null;
//}

function longestWord(letters) {
    //return longest word(s)

    var substract = (word) => {
        letters.split('').forEach((char) => word = word.replace(char, ''));

        return word;
    };

    var matches = words
        .filter((word) => substract(word).length === 0)
        .sort((a, b) => b.length - a.length);

    if (matches.length === 0) return null;

    var longest = matches[0].length;

    return matches.filter((word) => word.length === longest).sort();
}

Test.describe('Example Test Cases', function() {

    var exampleTestCases = {
        'GQEMAUVXY': ['GAME'],
        'TDWAYZROE': ['TODAY', 'TOWER', 'TRADE', 'WATER'],
        'EAEEAYITB': ['BEAT', 'BITE', 'BYTE'],
        'AKUIYOOLO': ['LOOK', 'YOLK'],
        'GVDTCAESU': ['CAGES', 'CAUSE', 'CAVES', 'DATES', 'GATES', 'GUEST', 'STAGE', 'USAGE']
    };

    for (var item in exampleTestCases){
        Test.assertSimilar(longestWord(item), exampleTestCases[item], 'Should return correct array');
    }

    Test.assertSimilar(longestWord(''), null, 'Should return None for empty string');
    Test.assertSimilar(longestWord('MKMKMKMKM'), null, 'Should return None for empty array');
    Test.assertSimilar(longestWord('IIIWUGEZI'), null, 'Should return None for empty array');
});
