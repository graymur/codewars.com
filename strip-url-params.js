/**
 * http://www.codewars.com/kata/51646de80fd67f442c000013/
 *
 Description:
 Complete the method so that it does the following:

 Removes any duplicate query string parameters from the url
 Removes any query string parameters specified within the 2nd argument (optional array)
 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

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

Test.assertEquals(stripUrlParams('www.codewars.com?a=1&b=2&a=2'), 'www.codewars.com?a=1&b=2');
Test.assertEquals(stripUrlParams('www.codewars.com?a=1&b=2&a=2', ['b']), 'www.codewars.com?a=1');
Test.assertEquals(stripUrlParams('www.codewars.com', ['b']), 'www.codewars.com');
