/**
 * Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
 *
 * Date: 20 - 09 - 2014
 * LastUpdate: 21 - 09 - 2014
 * version: 0.1.1~beta
 *
 * Name: FormalURM.js
 *
 * Description:
 *   This file contains the functions and methods of the URM formal object, this object only contains certain elements:
 *     - Initial conditions
 *     - Set of instructions
*/


const debug = require("debug")("FormalURM");

function URM(arr){
  if(!arr || !(arr instanceof Array)){
    debug(arr,"Not an instance of Array, instanceof Array is needed for creation of a new URM");
    throw new Error("Argument provided is not an instance of Array, instanceof Array is needed for creation of a new URM");
  }
  if(arr.length === 0){
    debug("Array has 0 elements.");
    throw new Error("The array provided doesn't looks like having elements. Cannot create a new URM based on that");
  }

  // Extract conditions and transform from string to array.
  var conStr = arr.shift();
  try{
    conStr = conStr.split("[")[1].split("]")[0];
  }catch(e){
    debug("Something went wrong spliting the string that is suppossed to be an array");
    throw new Error("Initial conditions were malformed.");
  }

  var conditions = conStr.split(",");

  //Assuming empty conditions as 0 example:
  // [1,,2] becomes-> [1,0,2]
  for(var i = conditions.length, l = i; l--;){
    if(conditions[l].length === 0){
      conditions.splice(l,1,0);
    }
    //If initial conditions have a letter or something that isn't a number
    // it is replaced with a 0.
    // example: [1,2,x] becomes-> [1,2,0]
    var n = new Number(conditions[l]).valueOf();
    if(Number.isNaN(n)){
      n = 0;
      debug("Not a Number founded at "+(l+1)+" position, replacing with a 0");
    }
    conditions[l] = n;
  }

  this.conditions = conditions;

  this.M = conditions.length;
  this.PC = 1;
  this.j = 1;

  var instructions = [];

  //Add every line to the array of instructions.
  for(var i = arr.length, l = i; l--;){
    //If line/element is just a space or enter,
    if(arr[l].length === 0){
        conditions.splice(l,1);
        continue;
    }
    var str = arr[l].toUpperCase().replace(/ /g,"");
    instructions.unshift(str);
  }

  this.instructions = instructions;

  this.P = instructions.length;

}

URM.prototype.toString = function(){
  var str = "";

  str+="<"+this.P+","+this.M+","+this.PC+">";
  return str;
};

//Current version of the Class
URM.__defineGetter__('version',function(){
  return "0.1.1~beta"
});

module.exports = URM;
