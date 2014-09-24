/**
 * Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
 *
 * Date: 22 - 09 - 2014
 * LastUpdate: 23 - 09 - 2014
 * version: 0.4.0~beta
 *
 * Name: Operations.js
 *
 * Description:
 *   Set of operations avalible for the current urm implementation.
*/
const debug = require('debug')('OPS');

/*
 * Operations is an object that holds a set of "methods".
 * it asumes that the current object has registers and position, that's why
 * you must call this methods with a different context. The simplest way is:
 *
 *    operations["method"].call(context,arguments)
 *
 */
var errorStr = "Register isn't a number, cannot access actual value";

var Operations = {
  /*
   * Z(n):
   *   Resets the value on register "n" to 0
   */
  Z: function(s){
    var n = realVal(s);
    if(n === -1 || (typeof n !== 'number')){
      debug("Position isn't a number");
      throw new Error(errorStr);
    }

    if((n-1) > this.registers.length){
      for(var i = this.registers.length; i<(n-1);i++){
        this.registers.push(0);
      }
    }

    this.registers[n-1] = 0;
    this.position++;
  },
  S: function(s){
    var n = realVal(s);

    if(n === -1 || (typeof n !== 'number')){
      debug("Position isn't a number");
      throw new Error(errorStr);
    }

    if((n-1) > this.registers.length){
      for(var i = this.registers.length; i<=(n-1);i++){
        this.registers.push(0);
      }
    }

    this.registers[n-1]++;
    this.position++;
  },
  T: function(s){
    var n = realVal(s);

    if(n === -1 || !(n instanceof Array)){
      debug("Arguments aren't correct or neither a group of numbers");
      throw new Error("Arguments for operation are malformed, must be: T(number1,number2)");
    }

    this.registers[n[1]-1] = this.registers[n[0]-1];
    this.position++;
  }
};

function realVal(str){
  var numbers = str.split(","),
      value;

  if(numbers.length === 0){
    return -1;
  }

  switch(numbers.length){
    case 1:
      value = new Number(numbers[0]).valueOf();
      return (Number.isNaN(value)?-1:value);
    case 2:
      for(var i = numbers.length, l = i; l--;){
        var tmpN = new Number(numbers[l]).valueOf();
        if(Number.isNaN(tmpN)){
          return -1;
        }
        numbers[l] = tmpN;
      }
      return numbers;
    case 3:
      break;
  }
}

//Version of code, read-only
Operations.__defineGetter__('version',function(){
  return "0.4.0~beta";
});

module.exports = Operations;
