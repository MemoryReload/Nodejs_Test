const assert = require('assert');
var actualV=1;
var expectedV=1;
// assert.fail(actualV,expectedV,null,"=");
assert(actualV,'actualV is not exist!');
assert.ok(actualV);
assert.equal(actualV,expectedV,'actualV is not equal expectedV');
assert.throws(function () {
  throw new Error('Wrong value!');
},/value/);
assert.throws(function () {
  throw new Error('Wrong value!');
},function (error){
  if ((error instanceof Error)&&/value/.test(error)) {
    return true;
  }
},"unexpected error");
