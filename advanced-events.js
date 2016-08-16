/**
 * http://www.codewars.com/kata/52d4678038644497e900007c/
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

/*

 This excercise is a more sophisticated version of Simple Events kata.

 Your task is to implement an Event constructor function for creating event objects

 var event = new Event();

 which comply to the following:

 an event object should have .subscribe() and .unsubscribe() methods to add and remove handlers

 .subscribe() and .unsubscribe() should be able take an arbitrary number of arguments and tolerate invalid arguments (not functions, or for unsubscribe,

 functions which are not subscribed) by simply skipping them

 multiple subscription of the same handler is allowed, and in this case unsubscription removes the last subscription of the same handler

 an event object should have an .emit() method which must invoke all the handlers with the arguments provided

 .emit() should use its own invocation context as handers' invocation context

 the order of handlers invocation must match the order of subscription

 handler functions can subscribe and unsubscribe handlers, but the changes should only apply to the next emit call - the handlers for an ongoing emit call should not

 be affected

 subscribe, unsubscribe and emit are the only public properties that are allowed on event objects (apart from Object.prototype methods)

 Check the test fixture for usage example

 */

function Event() {
    var self = this;

    Object.defineProperty(this, 'subscribers', {
        value: []
    });

    Object.defineProperty(this, 'subscribe', {
        value: function() {
            Array.prototype.slice.call(arguments).forEach(f => {
                if (typeof f === 'function') {
                    this.subscribers.unshift(f);
                }
            });
        },
        enumerable: true
    });

    Object.defineProperty(this, 'emit', {
        value: function() {
            let args = Array.prototype.slice.call(arguments);
            self.subscribers.slice(0).reverse().map(f => f.apply(this, args));
        },
        enumerable: true
    });

    Object.defineProperty(this, 'unsubscribe', {
        value: function() {
            Array.prototype.slice.call(arguments).forEach(f => {
                if (typeof f === 'function') {
                    let index = this.subscribers.indexOf(f);
                    if (index < 0) return ;
                    this.subscribers.splice(index, 1);
                }
            })
        },
        enumerable: true
    });
}

function l(arr) { arr.push('l'); }
function o(arr) { arr.push('o'); }

var e = new Event(), bucket = [];

e.subscribe(l, o, l);
e.emit.call({foo:"bar"}, bucket);

//bucket should be ['l', 'o', 'l']
Test.assertSimilar(bucket, ['l', 'o', 'l']);

e.unsubscribe(o, l);
bucket = [];

e.emit(bucket); //bucket should be ['l']

Test.assertSimilar(bucket, ['l']);