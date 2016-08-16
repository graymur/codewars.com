/**
 * http://www.codewars.com/kata/559c7b6e3c38b1d1b900006f
 *
 Description:

 Write a function format that takes two arguments, text and width, and formats the text to fit the width.

 Your function should divide the given text into lines using newline characters. It should fit as many words into each line as possible without exceeding the given width or splitting any words between two lines. There should not be a space at the beginning or end of any line. For example, here is some text formatted with a width of 50:

 Lorem ipsum dolor sit amet, consectetur adipiscing
 elit. Aliquam nec consectetur risus. Cras vel urna
 a tellus dapibus consequat. Duis bibendum
 tincidunt viverra. Phasellus dictum efficitur sem
 quis porttitor. Mauris luctus auctor diam id
 ultrices. Praesent laoreet in enim ut placerat.
 Praesent a facilisis turpis.

 And the same text formatted with a width of 30:

 Lorem ipsum dolor sit amet,
 consectetur adipiscing elit.
 Aliquam nec consectetur risus.
 Cras vel urna a tellus dapibus
 consequat. Duis bibendum
 tincidunt viverra. Phasellus
 dictum efficitur sem quis
 porttitor. Mauris luctus
 auctor diam id ultrices.
 Praesent laoreet in enim ut
 placerat. Praesent a facilisis
 turpis.

 For the purpose of this exercise, words can contain any non-whitespace character and all words are separated by a single space. Words will never be longer than the provided width.

 Note for rubists: Function must be named format_ for ruby already has a built in format function.

 *
 */

var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function format(text, width) {
    var words = text.split(/\s+/);

    var strings = [[]];

    words.forEach(function (word) {
        var length = strings[strings.length - 1].reduce(function (carry, word) {
            carry += word.length;
            return carry;
        }, strings[strings.length - 1].length - 1);

        if (length + word.length + 1 > width) {
            strings.push([]);
        }

        strings[strings.length - 1].push(word);
    });

    return strings.map(function (line) {
        return line.join(' ');
    }).join("\n");
}

var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec consectet" +
    "ur risus. Cras vel urna a tellus dapibus consequat. Duis bibendum tincidunt viverra. Ph" +
    "asellus dictum efficitur sem quis porttitor. Mauris luctus auctor diam id ultrices. Pra" +
    "esent laoreet in enim ut placerat. Praesent a facilisis turpis.";

Test.expect(format(text, 30) ===
    "Lorem ipsum dolor sit amet,"    + "\n" +
    "consectetur adipiscing elit."   + "\n" +
    "Aliquam nec consectetur risus." + "\n" +
    "Cras vel urna a tellus dapibus" + "\n" +
    "consequat. Duis bibendum"       + "\n" +
    "tincidunt viverra. Phasellus"   + "\n" +
    "dictum efficitur sem quis"      + "\n" +
    "porttitor. Mauris luctus"       + "\n" +
    "auctor diam id ultrices."       + "\n" +
    "Praesent laoreet in enim ut"    + "\n" +
    "placerat. Praesent a facilisis" + "\n" +
    "turpis.");

Test.expect(format(text, 50) ===
    "Lorem ipsum dolor sit amet, consectetur adipiscing" + "\n" +
    "elit. Aliquam nec consectetur risus. Cras vel urna" + "\n" +
    "a tellus dapibus consequat. Duis bibendum"          + "\n" +
    "tincidunt viverra. Phasellus dictum efficitur sem"  + "\n" +
    "quis porttitor. Mauris luctus auctor diam id"       + "\n" +
    "ultrices. Praesent laoreet in enim ut placerat."    + "\n" +
    "Praesent a facilisis turpis.");