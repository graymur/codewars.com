/**
 * http://www.codewars.com/kata/51646de80fd67f442c000013/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

//function ptq(q) {
//    var x = q.replace(/;/g, '&').split('&'), i, name, t;
//
//    for (q={}, i=0; i < x.length; i++) {
//        t = x[i].split('=', 2);
//        name = unescape(t[0]);
//        if (!q[name]) {
//            q[name] = [];
//        }
//
//        if (t.length > 1) {
//            q[name][q[name].length] = unescape(t[1]);
//        }
//
//        else {
//            q[name][q[name].length] = true;
//        }
//    }
//
//    return q;
//}

function stripUrlParams(url, paramsToStrip) {
    paramsToStrip = paramsToStrip || [];
    let query, matched, retval, usedKeys = [];

    matched = url.match(/^([^\?]+)(\??)(.*)/);

    retval = matched[1];
    query = matched[3];

    if (query) {
        retval += '?' + query.replace(/;/g, '&').split('&').reduce((curry, pair) => {
            let p = pair.split('=');
            if (usedKeys.indexOf(p[0]) === -1 && paramsToStrip.indexOf(p[0]) === -1) {
                curry.push(pair);
                usedKeys.push(p[0]);
            }

            return curry;
        }, []).join('&');
    }

    return retval;
}
//function stripUrlParams(url, paramsToStrip) {
//    paramsToStrip = paramsToStrip || [];
//    let query, matched, parsed, i, queryString = [], retval;
//
//    matched = url.match(/^(.*)\?(.*)$/);
//
//    if (!matched) return url;
//
//    retval = matched[1] || url;
//    query = matched[2];
//
//    if (query) {
//
//        parsed = ptq(query);
//
//        for (i in parsed) {
//            if (paramsToStrip.indexOf(i) !== -1) continue;
//            queryString.push(i + '=' + parsed[i][0]);
//        }
//
//        retval += '?' + queryString.join('&');
//    }
//
//    return retval;
//}

Test.assertEquals(stripUrlParams('www.codewars.com?a=1&b=2&a=2'), 'www.codewars.com?a=1&b=2');
Test.assertEquals(stripUrlParams('www.codewars.com?a=1&b=2&a=2', ['b']), 'www.codewars.com?a=1');
Test.assertEquals(stripUrlParams('www.codewars.com', ['b']), 'www.codewars.com');
//
//dv(stripUrlParams('www.codewars.com?a=1&b=2&a=2')); // returns 'www.codewars.com?a=1&b=2'
//dv(stripUrlParams('www.codewars.com?a=1&b=2&a=2', ['b'])); // returns 'www.codewars.com?a=1'
//dv(stripUrlParams('www.codewars.com', ['b'])); // returns 'www.codewars.com'

//let r = /^([^\?]+)(\??)(.*)/;
//dv('www.codewars.com'.match(r));
//dv('www.codewars.com?a=1&b=2&a=2'.match(r));