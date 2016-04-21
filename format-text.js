/**
 * http://www.codewars.com/kata/559c7b6e3c38b1d1b900006f/train/javascript
 */

"use strict";

var tests = require('./lib/framework.js');
var Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

var dv = console.log.bind(console);

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