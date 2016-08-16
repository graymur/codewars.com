let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function ordinal(number, brief) {
    brief = brief || false;
    let retval, last = 0;

    if (number % 100 > 10 && number % 100 < 20)  {
        retval = 'th';
    } else {
        last = number % 10;

        if (last === 1) {
            retval = 'st';
        } else if (last === 2) {
            retval = 'nd';
        } else if (last === 3) {
            retval = 'rd';
        } else {
            retval = 'th';
        }
    }

    return brief && ([2,3].indexOf(last) > -1) ? retval[retval.length - 1] : retval;
}

Test.assertEquals(ordinal(0, true), "th", 0);
Test.assertEquals(ordinal(1), "st", 1);
Test.assertEquals(ordinal(11), "th", 11);
Test.assertEquals(ordinal(111), "th", 111);
Test.assertEquals(ordinal(121), "st", 121);
Test.assertEquals(ordinal(20), "th", 20);
Test.assertEquals(ordinal(52), "nd", 52);
Test.assertEquals(ordinal(903, true), "d", 903);