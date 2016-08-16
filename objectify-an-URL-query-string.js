/**
 * https://www.codewars.com/kata/5286d92ec6b5a9045c000087
 *
 Description:

 In this kata, we want to convert a URL query string into a nested object. The query string will contain parameters that may or may not have embedded dots ('.'), and these dots will be used to break up the properties into the nested object.

 You will receive a string input that looks something like this:

 user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue

 Your method should return an object hash-map that looks like this:

 {
   'user': {
     'name': {
       'firstname': 'Bob',
       'lastname': 'Smith'
     },
     'favoritecolor': 'Light Blue'
   }
 }
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

let q = 'user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue';

let out = {
    'user': {
        'name': {
            'firstname': 'Bob',
            'lastname': 'Smith'
        },
        'favoritecolor': 'Light Blue'
    }
};

function convertQueryToMap(q) {
    let out = {};

    q.split('&').forEach(function (item) {
        let pair = item.split('=');
        let keys = pair[0].split('.');
        let pointer = out;

        if (keys[0] === '') return ;

        keys.forEach(function (k, i) {
            if (typeof pointer[k] === 'undefined') {
                pointer[k] = {};
            }

            if (i === keys.length - 1) {
                pointer[k] = decodeURIComponent(pair[1]);
            } else {
                pointer = pointer[k];
            }
        });
    });

    return out;
}

let qObj = convertQueryToMap(q);

Test.expect(qObj.user.name.firstname === 'Bob');
Test.expect(qObj.user.favoritecolor === 'Light Blue');

qObj = convertQueryToMap("a=a%26b%3Dc%3F");

Test.expect(qObj.a === 'a&b=c?');