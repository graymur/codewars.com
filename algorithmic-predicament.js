/**
 * https://www.codewars.com/kata/55d3b1f2c1b2f0d3470000a9
 *
 Oh no! Timmy's algorithim has gone wrong! help Timmy fix his algorithim!

 Task
 Your task is to fix timmy's algorithim so it returns the group name with the highest total age.

 You will receive two groups of people objects, with the two properties name and age. The name property
 is a string and the age property is a number. Your goal is to total the age of all people with the same
 names and return the name with the highest total age. If two name groups have the same total age return
 the first alphabetical name.
 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

function sortAge(p, c) {
    return p[1] < c[1] ? 1 : -1;
}

function sortName(p, c) {
    return p[0][0] > c[0][0] ? 1 : -1;
}

function highestAge(group1, group2){
    let grouppedObj = group1.concat(group2).reduce(function (curry, element) {
        if (typeof curry[element.name] === 'undefined') {
            curry[element.name] = 0;
        }

        curry[element.name] += element.age;

        return curry;
    }, {});

    let grouppedArr = [];

    for (var name in grouppedObj) {
        grouppedArr.push([name, grouppedObj[name]]);
    }

    grouppedArr = grouppedArr.sort(sortName).sort(sortAge);

    return grouppedArr[0][0];
}

Test.describe("Fix Timmys Algorithim", function() {
    Test.it("Fixed Tests", function() {
        Test.assertEquals(highestAge([{name:'kay',age:1},{name:'john',age:13},{name:'kay',age:76}],[{name:'john',age:1},{name:'alice',age:77}]), 'alice','Return the name of the highest total age');
        Test.assertEquals(highestAge([{name:'kay',age:1},{name:'john',age:13},{name:'kay',age:76}],[{name:'john',age:1},{name:'alice',age:76}]), 'kay','Return the name of the highest total age');
        Test.assertEquals(highestAge([{name:'kay',age:1},{name:'john',age:130},{name:'kay',age:76}],[{name:'john',age:1},{name:'alice',age:76}]), 'john','Return the name of the highest total age');
    });
});
