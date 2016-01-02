var tests = require('./lib/framework.js');

var dv = console.log.bind(console);

function ordinal(number, brief) {
    brief = brief || false;
    var retval, last = 0;

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

tests.Test.assertEquals(ordinal(0, true), "th", 0);
tests.Test.assertEquals(ordinal(1), "st", 1);
tests.Test.assertEquals(ordinal(11), "th", 11);
tests.Test.assertEquals(ordinal(111), "th", 111);
tests.Test.assertEquals(ordinal(121), "st", 121);
tests.Test.assertEquals(ordinal(20), "th", 20);
tests.Test.assertEquals(ordinal(52), "nd", 52);
tests.Test.assertEquals(ordinal(903, true), "d", 903);