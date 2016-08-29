/**
 * http://www.codewars.com/kata/update-inventory-in-your-smartphone-store/
 *
 You will be given an array which lists the current inventory of stock in your store. Example:

 var currentInventory = [ [25, 'HTC'], [1000, 'Nokia'], [50, 'Samsung'], [33, 'Sony'], [10, 'Apple'] ];

 Your will also be given an array which list the new inventory being delivered to your store today. Example:

 var newInventory = [ [5, 'LG'], [10, 'Sony'], [4, 'Samsung'], [5, 'Apple'] ];

 Your task is to write a function that when invoked

 updateInventory(currentInventory, newInventory);

 returns the updated list of your current inventory in alphabetical order:

 [[15,'Apple'],[25,'HTC'],[5,'LG'],[1000,'Nokia'],[54,'Samsung'],[43,'Sony']]

 Please note however that the input arrays may not necessarily be passed in alphabetical order.


 Kata inspirad by the FreeCodeCamp's 'Inventory Update' algorithm

 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function updateInventory(curStock, newStock) {
    const hash = curStock.concat(newStock).reduce((carry, x) => {
        let k = x[1];
        if (!carry[k]) carry[k] = 0;
        carry[k] += x[0];
        return carry;
    }, {});

    return Object.keys(hash).reduce((carry, x) => {
        carry.push([hash[x], x]);
        return carry;
    }, []).sort((a, b) => a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0);
}

var currentInventory = [
    [25, 'HTC'],
    [1000, 'Nokia'],
    [50, 'Samsung'],
    [33, 'Sony'],
    [10, 'Apple']
];

var newInventory = [
    [5, 'LG'],
    [10, 'Sony'],
    [4, 'Samsung'],
    [5, 'Apple']
];

Test.assertSimilar(updateInventory(currentInventory, newInventory), [[15,'Apple'],[25,'HTC'],[5,'LG'],[1000,'Nokia'],[54,'Samsung'],[43,'Sony']]);
