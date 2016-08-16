/**
 * https://www.codewars.com/kata/513e08acc600c94f01000001
 *
 The rgb() method is incomplete. Complete the method so that passing
 in RGB decimal values will result in a hexadecimal representation
 being returned. The valid decimal values for RGB are 0 - 255. Any
 (r,g,b) argument values that fall out of that range should be
 rounded to the closest valid value.
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function rgb(r, g, b){
    return [r, g, b].map(function (value) {
        if (value < 0) value = 0;
        if (value > 255) value = 255;
        value = value.toString(16);
        return value === '0' ? '00' : value;
    }).join('').toUpperCase();
}

Test.assertEquals(rgb(255, 255, 255), 'FFFFFF');
Test.assertEquals(rgb(255, 255, 300), 'FFFFFF');
Test.assertEquals(rgb(0, 0, 0), '000000');
Test.assertEquals(rgb(148, 0, 211), '9400D3');