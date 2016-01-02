/**
 * http://www.codewars.com/kata/514b6c44a337752e67000077/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

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
    console.log(obj, key, value);
    return typeof (value) === 'undefined' ? namespaceGet(obj, key) : namespaceSet(obj, key, value);
}

dv(namespace(stuff, 'moreStuff.name', 'the stuff'));
dv(namespace(stuff, 'moreStuff.name'));
dv(namespace(stuff, 'otherStuff.id'));
