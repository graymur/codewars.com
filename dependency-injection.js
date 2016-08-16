/**
 * http://www.codewars.com/kata/5302d655be2a91068b0001fb/
 *
 Description:

 Did you hear about Dependency Injection pattern? The main idea of this pattern is that you may have ability to pass dependencies into your function in any order and they will be resolved automatically. Take a look at this:

 var myDependentFunc = inject(function (secondDepency, firstDependency) {
  firstDependency();
  secondDepency();
});

 myDependentFunc();

 As you can see we just put some variables into the function's signature and work with them as usualy. But we know nothing about where these variables are located! Let's assume that all dependencies are stored in the single hash object (for instanse 'deps') and the injector function will be sought among 'deps' properties:

 var deps = {
  'firstDependency': function () {return 'this is firstDependency';},
  'secondDepency': function () {return 'this is secondDepency';},
};

 Ok, I hope this is clear. Also, in order to setup DependencyInjector (DI) we need to specify dependency object:

 var DI = function (dependency) {
  this.dependency = dependency;
};

 Your task is create DI.prototype.inject method that will return a new function with resolved dependencies. And don't forget about nested functions. You shouldn't handle them.

 *
 */

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

var DI = function (dependency) {
    this.dependency = dependency;
};

// Should return new function with resolved dependencies
DI.prototype.inject = function (func) {
    let names, args = [];

    names = func.toString()
        .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg,'')
        .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
        .split(/,/);

    names.forEach(dep => {
        if (dep) {
            args.push(this.dependency[dep]);
        }
    });

    return function () {
        return func.apply(func, args.length > 0 ? args : undefined);
    };
};

var deps = {
    'dep1': function () {return 'this is dep1';},
    'dep2': function () {return 'this is dep2';},
    'dep3': function () {return 'this is dep3';},
    'dep4': function () {return 'this is dep4';}
};

var di = new DI(deps);

var myFunc = di.inject(function (dep3, dep1, dep2) {
    return [dep1(), dep2(), dep3()].join(' -> ');
});

var myFunc1 = di.inject(function () {
    return arguments.length;
});

Test.assertEquals(myFunc(), 'this is dep1 -> this is dep2 -> this is dep3');
Test.assertEquals(myFunc1(), 0);
