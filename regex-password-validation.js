/**
 * http://www.codewars.com/kata/regex-password-validation/
 *
 You need to write regex that will validate a password to make sure it meets the follwing criteria:

 At least six characters long
 contains a lowercase letter
 contains an uppercase letter
 contains a number

 Valid passwords will only be alphanumeric characters.

 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function validate(password) {
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/.test(password);
}

Test.expect(validate('djI38D55'), 'djI38D55 - Expected true');
Test.expect(!validate('a2.d412'), 'a2.d412 - Expected false');
Test.expect(!validate('JHD5FJ53'), 'JHD5FJ53 - Expected false');
Test.expect(!validate('!fdjn345'), '!fdjn345 - Expected false');
Test.expect(!validate('jfkdfj3j'), 'jfkdfj3j - Expected false');
Test.expect(!validate('123'), '123 - Expected false');
Test.expect(!validate('abc'), 'abc - Expected false');
Test.expect(validate('Password123'), 'Password123 - Expected true');
