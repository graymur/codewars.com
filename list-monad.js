/**
 * https://www.codewars.com/kata/53db4acb1f1a7dd68700040a
 */

"use strict";

let tests = require('./lib/framework.js');
let _ = require('./lib/underscore.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

var dv = console.log.bind(console);

/*
 * from: actual position of the knight
 * returns: an array of valid position in one movement
 * ex: moveKnight([6, 2]) -> [ [ 8, 1 ], [ 8, 3 ], [ 4, 1 ], [ 4, 3 ], [ 7, 4 ], [ 5, 4 ] ]
 *
 * moveKnight :: Square -> [Square]
 */
function moveKnight(from) {
    var retval = [];
    var p = [2, -2, 1, -1];

    for (var i = 0; i < p.length; i++) {
        for (var j = 0; j < p.length; j++) {
            if (Math.abs(p[i]) === Math.abs(p[j])) continue;

            var x = from[0] + p[i];
            var y = from[1] + p[j];

            if (x > 0 && y > 0 && x < 9 && y < 9) {
                retval.push([x, y]);
            }
        }
    }

    return retval;
}

function moveKnightRandom(from) {
    var possibilities = moveKnight(from);
    return possibilities[Math.floor(Math.random() * possibilities.length)];
}

function compose() {
    var fns = [].slice.call(arguments);
    return function (x) {
        return fns.reduceRight(function (carry, fn) {
            return fn(carry);
        }, x);
    }
}

/**
 * bind :: (a -> [b]) -> ([a] -> [b])
 *
 * f is a function that receives a single value of a type (like Square, Number, String, ...) and returns an array of simple type b (a and bcould be the same type).
 * The returned function, g, receives an array of a type and returns an array of b type. The returned array contains the values processed by the f function.
 * @param f
 * @returns {Function}
 */
function bind(f) {
    return function (args) {
        return args.reduce(function (carry, x) {
            return carry.concat(f(x));
        }, []);
    }
}

/**
 * unit :: a -> [a]
 *
 * @param x
 * @returns {*[]}
 */
function unit(x) {
    return [x];
}

/*
 * wrap :: a -> [a]
 */
function wrap(x) {
    return [x];
}

function moveKnightFromArray(fromPositions) {
    return fromPositions.reduce(function(ac, from) {
        var to = moveKnight(from);
        return ac.concat(to);
    }, []);
}

/* from: starting square
 * movements: quantity of movements to do
 * returns: array with all possible valid squares
 *
 * knightEngine -> Square -> Int -> [Square]
 */
function knightEngine(from, movements) {
    var f = function (x) { return x };

    for (var i = 0; i < movements; i++) {
        f = compose(f, bind(moveKnight));
    }

    f = compose(f, unit);

    return f(from);
}

function canReach(from, to, movements) {
    var res = knightEngine(from, movements).filter(function (x) {
        return x[0] === to[0] && x[1] === to[1];
    });

    return Boolean(res.length);
}

