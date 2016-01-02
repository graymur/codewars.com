/**
 * http://www.codewars.com/kata/531489f2bb244a5b9f00077e/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

function undoRedo(object) {
    var obj = object;

    var history = {
        undo: [],
        redo: []
    };

    function storeUndo() {

    }

    return {
        set: function(key, value) {
            obj[key] = value;
        },
        get: function(key) {
            return obj[key];
        },
        del: function(key) {
            delete obj[key];
        },
        undo: function() {},
        redo: function() {}
    };
}


Test.describe('tests', function() {

    Test.it('get/set tests', function() {
        var obj = {
            x: 1,
            y: 2
        };

        var unRe = undoRedo(obj);

        Test.assertEquals(unRe.get('x'), 1, 'The get method returns the value of a key');
        unRe.set('x', 3);
        Test.assertEquals(unRe.get('x'), 3, 'The set method change the value of a key');
    });

    Test.it('simple undo', function() {
        var obj = {
            x: 1,
            y: 2
        };

        var unRe = undoRedo(obj);
        unRe.set('y', 10);
        Test.assertEquals(unRe.get('y'), 10, 'The get method returns the value of a key');
        unRe.undo();
        Test.assertEquals(unRe.get('y'), 2, 'The undo method restores the previous state');
        try {
            unRe.undo();
            Test.expect(false, 'It should have thrown an exception');

        } catch (e) {
            Test.assertEquals(unRe.get('y'), 2);
        }

    });
    //
    //Test.it('simple redo', function() {
    //    var obj = {
    //        x: 1,
    //        y: 2
    //    };
    //
    //    var unRe = undoRedo(obj);
    //    unRe.set('y', 10);
    //    Test.assertEquals(unRe.get('y'), 10, 'The get method returns the value of a key');
    //    unRe.undo();
    //    Test.assertEquals(unRe.get('y'), 2, 'The undo method restores the previous state');
    //    unRe.redo();
    //    Test.assertEquals(unRe.get('y'), 10, 'The undo method restores the previous state');
    //    try {
    //        unRe.redo();
    //        Test.expect(false, 'It should have thrown an exception');
    //
    //    } catch (e) {
    //        Test.assertEquals(unRe.get('y'), 10);
    //    }
    //
    //});
    //
    //Test.it('undo/redo', function() {
    //    var obj = {
    //        x: 1,
    //        y: 2
    //    };
    //
    //    var unRe = undoRedo(obj);
    //    unRe.set('y', 10);
    //    unRe.set('y', 100);
    //    unRe.set('x', 150);
    //    unRe.set('x', 50);
    //    Test.assertEquals(unRe.get('y'), 100, 'The get method returns the value of a key');
    //    Test.assertEquals(unRe.get('x'), 50, 'The get method returns the value of a key');
    //    unRe.undo();
    //    Test.assertEquals(unRe.get('x'), 150, 'The undo method restores the previous state');
    //    Test.assertEquals(unRe.get('y'), 100, 'The y key stays the same');
    //    unRe.redo();
    //    Test.assertEquals(unRe.get('x'), 50, 'Undo the x value');
    //    Test.assertEquals(unRe.get('y'), 100, 'The y key stays the same');
    //    unRe.undo();
    //    unRe.undo();
    //    Test.assertEquals(unRe.get('x'), 1, 'Undo the x value');
    //    Test.assertEquals(unRe.get('y'), 100, 'The y key stays the same');
    //    unRe.undo();
    //    unRe.undo();
    //    Test.assertEquals(unRe.get('y'), 2, 'Undo the y value');
    //    Test.assertEquals(unRe.get('x'), 1, 'The x key stays the same');
    //    try {
    //        unRe.undo();
    //        Test.expect(false, 'It should have thrown an exception');
    //
    //    } catch (e) {
    //        Test.assertEquals(unRe.get('y'), 2, 'There is nothing to undo');
    //    }
    //    unRe.redo();
    //    unRe.redo();
    //    unRe.redo();
    //    unRe.redo();
    //    Test.assertEquals(unRe.get('y'), 100, 'y key redo state');
    //    Test.assertEquals(unRe.get('x'), 50, 'y key redo state');
    //    try {
    //        unRe.redo();
    //        Test.expect(false, 'It should have thrown an exception');
    //
    //    } catch (e) {
    //        Test.assertEquals(unRe.get('y'), 100, 'There is nothing to redo');
    //    }
    //
    //});
    //
    //Test.it('new key', function() {
    //    var obj = {
    //        x: 1,
    //        y: 2
    //    };
    //
    //    var unRe = undoRedo(obj);
    //    unRe.set('z', 10);
    //    Test.assertEquals(unRe.get('z'), 10, 'A new key has been added');
    //    unRe.undo();
    //    Test.assertEquals(unRe.get('z'), undefined, 'The z key should not exist');
    //    unRe.redo();
    //    Test.assertEquals(unRe.get('z'), 10, 'A new key has been added');
    //});
    //
    //
    //Test.it('delete key', function() {
    //    var obj = {
    //        x: 1,
    //        y: 2
    //    };
    //
    //    var unRe = undoRedo(obj);
    //    unRe.del('x');
    //    Test.assertEquals(unRe.get('x'), undefined, 'The x key should not exist');
    //    Test.expect(!obj.hasOwnProperty('x'), 'The x key should be deleted');
    //    unRe.undo();
    //    Test.assertEquals(unRe.get('x'), 1, 'A new key has been added');
    //    unRe.redo();
    //    Test.assertEquals(unRe.get('x'), undefined, 'The x key should not exist');
    //    Test.expect(!obj.hasOwnProperty('x'), 'The x key should be deleted');
    //});
    //

});