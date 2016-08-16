/**
 * http://www.codewars.com/kata/525c65e51bf619685c000059/
 *
 Description:

 Pete likes to bake some cakes. He has some recipes and ingredients. Unfortunately he is
 not good in maths. Can you help him to find out, how many cakes he could bake considering his recipes?

 Write a function cakes(), which takes the recipe (object) and the available ingredients
 (also an object) and returns the maximum number of cakes Pete can bake (integer). For
 simplicity there are no units for the amounts (e.g. 1 lb of flour or 200 g of sugar are
 simply 1 or 200). Ingredients that are not present in the objects, can be considered as 0.
 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function cakes(recipe, available) {
    let times = [], i;

    for (i in recipe) {
        times.push((isNaN(available[i]) ? 0 : available[i]) / recipe[i]);
    }

    return Math.floor(Math.min.apply(null, times));
}

describe('description example', function() {
    var recipe, available;

    it('pass example tests', function() {
        recipe = {flour: 500, sugar: 200, eggs: 1};
        available = {flour: 1200, sugar: 1200, eggs: 5, milk: 200};
        Test.assertEquals(cakes(recipe, available), 2, 'Wrong result for example #1');

        recipe = {apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100};
        available = {sugar: 500, flour: 2000, milk: 2000};
        Test.assertEquals(cakes(recipe, available), 0, 'Wrong result for example #2');
    });
});