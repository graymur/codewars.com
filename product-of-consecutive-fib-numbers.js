/**
 * http://www.codewars.com/kata/product-of-consecutive-fib-numbers
 *
 Description:

 The Fibonacci numbers are the numbers in the following integer sequence (Fn):

 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...

 such as

 F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.

 Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying

 F(n) * F(n+1) = prod.

 Your function productFib takes an integer (prod) and returns an array:

 [F(n), F(n+1), true] or {F(n), F(n+1), 1} or (F(n), F(n+1), True)

 depending on the language if F(n) * F(n+1) = prod.

 If you don't find two consecutive F(m) verifying F(m) * F(m+1) = prodyou will return

 [F(m), F(m+1), false] or {F(n), F(n+1), 0} or (F(n), F(n+1), False)

 F(m) being the smallest one such as F(m) * F(m+1) > prod.
 Examples

 productFib(714) # should return [21, 34, true],
 # since F(8) = 21, F(9) = 34 and 714 = 21 * 34

 productFib(800) # should return [34, 55, false],
 # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55

 Note: Not useful here but we can tell how to choose the number n up to which to go: we can use the
 "golden ratio" phi which is (1 + sqrt(5))/2 knowing that F(n) is asymptotic to: phi^n / sqrt(5).
 That gives a possible upper bound to n.

 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const fibCache = [1, 1];

function fib(n) {
    for (var i = 2; i <= n; i++) {
        if (!fibCache[i]) {
            fibCache[i] = fibCache[i - 2] + fibCache[i - 1];
        }
    }

    return fibCache[n - 1];
}

function productFib(n) {
    let p = 0;
    let fibN;
    let fibNPlus;

    for (let i = 1; i < n && p < n; i++) {
        fibN = fib(i);
        fibNPlus = fib(i + 1);
        p = fibN * fibNPlus;
    }

    return [fibN, fibNPlus, p === n];
}

Test.assertSimilar(productFib(4895), [55, 89, true])
Test.assertSimilar(productFib(5895), [89, 144, false])
Test.assertSimilar(productFib(74049690), [6765, 10946, true])
Test.assertSimilar(productFib(84049690), [10946, 17711, false])
Test.assertSimilar(productFib(193864606), [10946, 17711, true])
Test.assertSimilar(productFib(447577), [610, 987, false])
Test.assertSimilar(productFib(602070), [610, 987, true])