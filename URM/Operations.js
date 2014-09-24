/**
 * Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
 *
 * Date: 22 - 09 - 2014
 * LastUpdate: 23 - 09 - 2014
 * version: 1.0.0~rc
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
    //At first, s is a string, that's why I send it to check for his "realValue"
    var n = realVal(s);
    //After getting the real value, check the result
    if(n === -1 || (typeof n !== 'number')){
      debug("Position isn't a number");
      throw new Error(errorStr);
    }
    /*
     * If "n" is bigger than the actual size of the registers, it means that we need to mark as zero
     * every register from actual length to "n" element
     */
    if((n-1) > this.registers.length){
      for(var i = this.registers.length; i<(n-1);i++){
        this.registers.push(0);
      }
    }
    //Set as zero the n register (user sees the register as n, for us is n-1 because the reigster start at 0)
    this.registers[n-1] = 0;
    this.position++;
  },
  /*
   * S(n):
   *    Adds one to the register in n
   */
  S: function(s){
    //At first, s is a string, that's why I send it to check for his "realValue"
    var n = realVal(s);

    if(n === -1 || (typeof n !== 'number')){
      debug("Position isn't a number");
      throw new Error(errorStr);
    }
    /*
     * If "n" is bigger than the actual size of the registers, it means that we need to mark as zero
     * every register from actual length to "n" element
     */
    if((n-1) > this.registers.length){
      for(var i = this.registers.length; i<=(n-1);i++){
        this.registers.push(0);
      }
    }
    //Add one to register n. Remember, for us: n is equals to n-1, because we started at position 0
    this.registers[n-1]++;
    this.position++;
  },
  /*
   * T(m,n):
   *    Copies the value on register "m" to register "n".
   */
  T: function(s){
    var n = realVal(s);
    // IF n is -1 some error happened parsing the string.
    //Also if it isn't an array containing [m,n] is a mistake on parsing
    if(n === -1 || !(n instanceof Array) || n.length !== 2){
      debug("Arguments aren't correct or neither a group of 2 numbers");
      throw new Error("Arguments for operation are malformed, must be: T(number1,number2)");
    }
    //Asing positions on our "registers"
    this.registers[n[1]-1] = this.registers[n[0]-1];
    this.position++;
  },
  /*
   * J(m,n,q):
   *     If register at "m" and register at "n" are equal, go to instruction q.
   */
  J: function(s){
    var n = realVal(s);

    //If something went wrong, n will be -1 or something that isn't an array of length 3
    if(n === -1 || !(n instanceof Array) || n.length !== 3){
      debug("Arguments aren't correct or neither a group of 3 numbers");
      throw new Error("Arguments for operation are malformed, must be: J(number1,number2,instruction)");
    }

    //Asign values to compare, just for look of the code
    var x = this.registers[n[0]-1],
        y = this.registers[n[1]-1],
        q = n[2];
    //If register at m is equals to register at n, change position of pointer
    if(x === y){
      debug("Jumping to instruction:"+q);
      this.position = q-1;
    }else{
      //Else, just go to next step
      this.position++;
    }
  }
};

/*
 * realVal(str):
 *    It needs a string for works, then it tries to check for form of the string:
 *        - "x" just an element:
 *            a) Is a character (or a group of characters) that can be parsed as numbers. returns the value parsed
 *            b) not a character representing a number, returns -1
 *
 *        - "x,y" two elements divided by a comma:
 *            *) checks for x and y to be characters that represents numbers, if they are, returns [x,y] else returns -1
 *
 *        - "x,y,z" three elements divided by a comma:
 *            *) checks for x, y and z, to be characters that represents numbers, if they are, returns [x,y,z] else returns -1
 *
 */
function realVal(str){
  var numbers = str.split(","),
      value;
  //Not elments on string. ergo: str === ""
  if(numbers.length === 0){
    return -1;
  }

  //numbers is an array of strings, where each element is a string that was divided from other
  // string by a comma
  switch(numbers.length){
    case 1:
      value = new Number(numbers[0]).valueOf();
      //check if it is a real number
      return (Number.isNaN(value)?-1:value);
    default:
      for(var i = numbers.length, l = i; l--;){
        var tmpN = new Number(numbers[l]).valueOf();
        //if "x" or "y" isn't a number, reutnr -1
        if(Number.isNaN(tmpN)){
          return -1;
        }
        numbers[l] = tmpN;
      }
      return numbers;
  }
}

//Version of code, read-only
Operations.__defineGetter__('version',function(){
  return "1.0.0~rc";
});

module.exports = Operations;
