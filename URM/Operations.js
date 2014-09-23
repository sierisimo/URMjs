const debug = require('debug')('OPS');

var Operations = {
  Z: function(s){
    var n = realVal(s);
    this.registers[n-1] = 0;
  }
};

function realVal(str){
  //Check every case of Operations like J(m,n,q) and Z(n)
  if(str.indexOf(',') === -1){
    return new Number(str).valueOf();
  }
}
module.exports = Operations;
