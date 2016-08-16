/**
 * http://www.codewars.com/kata/514b6c44a337752e67000077/
 *
 Finish the namespace function so that it sets or gets the value at the path specified.
 The first argument should be the root object that the path belongs to. The 2nd argument
 is the path itself and the 3rd optional argument is the value to set at the path.

 If a value is provided then the path will be set to that value. Any objects not present
 within the path will be created automatically in order for the path to be successfully set.

 If no value is provided the the function will return the value at the path given. If the
 path is not valid/present then undefined will be returned.
 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function namespaceSet(obj, key, value) {
    let keys = key.split('.');

    if (typeof obj[keys[0]] === 'undefined') {
        obj[keys[0]] = {};
    }

    if (keys.length === 1) {
        obj[keys[0]] = value;
    } else {
        namespace(obj[keys[0]], keys.slice(1).join('.'), value);
    }

    return obj;
}

function namespaceGet(obj, key) {
    let keys = key.split('.');
    if (!obj) return undefined;

    return keys.length === 1 ? obj[key] : namespaceGet(obj[keys[0]], keys.slice(1).join('.'));
}

function namespace(obj, key, value) {
    return typeof (value) === 'undefined' ? namespaceGet(obj, key) : namespaceSet(obj, key, value);
}

var stuff = {};

namespace(stuff, 'moreStuff.name', 'the stuff');

Test.expect(stuff.moreStuff.name === 'the stuff');
Test.expect(namespace(stuff, 'otherStuff.id') === undefined);
