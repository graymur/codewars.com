/**
 * http://www.codewars.com/kata/5324945e2ece5e1f32000370/
 */

"use strict";

let tests = require('./lib/framework.js');
let Test = tests.Test, describe = tests.describe, it = tests.it, before = tests.before, after = tests.after;

const dv = console.log.bind(console);

function sumStrings(a, b) {
    return ((parseInt(a) || 0) + (parseInt(b) || 0)).noExponents();
}

Number.prototype.noExponents= function(){
    var data= String(this).split(/[eE]/);
    if(data.length== 1) return data[0];

    var  z= '', sign= this<0? '-':'',
        str= data[0].replace('.', ''),
        mag= Number(data[1])+ 1;

    if(mag<0){
        z= sign + '0.';
        while(mag++) z += '0';
        return z + str.replace(/^\-/,'');
    }
    mag -= str.length;
    while(mag--) z += '0';
    return str + z;
};

//sumStrings('123','456');
dv(sumStrings('712569312664357328695151392', '8100824045303269669937'));

//Test.assertEquals(sumStrings('123','456'),'579');
//Test.assertEquals(sumStrings('','5'),'5');
//Test.assertEquals(sumStrings('712569312664357328695151392','8100824045303269669937'),'712577413488402631964821329');
//sumStrings('712569312664357328695151392', '8100824045303269669937')