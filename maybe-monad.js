/**
 * https://www.codewars.com/kata/52793ed3fdb8e19406000c72
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

/////////////////////////////////////////////////////////////////
function Maybe() {
}

/////////////////////////////////////////////////////////////////
function Just(x) {
    //console.log(x);
    this.toString = function () { return "Just " + x.toString(); };
    this.just = x;
}

Just.prototype = new Maybe();
Just.prototype.constructor = Just;

/////////////////////////////////////////////////////////////////
function Nothing() {
    this.toString = function () { return "Nothing"; };
    Object.freeze(this);
}

Nothing.prototype = new Maybe();
Nothing.prototype.constructor = Nothing;

/////////////////////////////////////////////////////////////////
// return a Maybe that holds x
Maybe.unit = function (x) {
    return new Just(x);
};

// given a function from a value to a Maybe return a function from a Maybe to a Maybe
Maybe.bind = function (f) {
    return function (m) {
        if (!(m instanceof Maybe)) {
            throw new Error('Input is not a Maybe subclass instance')
        }

        if (m instanceof Just) {
            return f(m.just);
        } else {
            return new Nothing();
        }
    };
};

// given a function from value to value, return a function from value to Maybe
// if f throws an exception, (lift f) should return a Nothing
Maybe.lift = function (f) {
    return function (x) {
        try {
            return new Just(f(x));
        } catch (e) {
            return new Nothing();
        }
    };
};

// given a Maybe m and some functions fns, run m into the first function,
// pass that result to the second function, etc. and return the last result
Maybe.do = function(m) {
    var fns = Array.prototype.slice.call(arguments, 1);

    return fns.reduce(function (carry, fn) {
        return Maybe.bind(fn)(carry);
    }, m);
};

let mDup = Maybe.lift( function (s) { return s + s; } );
let mTrim = Maybe.lift( function (s) { return s.replace(/\s+$/, ''); } );

let result = Maybe.do( Maybe.unit('abc '), mDup, mTrim, mDup );   // => new Just "abc abcabc abc"

Test.expect(result.toString() === 'Just abc abcabc abc');