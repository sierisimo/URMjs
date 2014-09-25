/**
 * Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
 *
 * Date: 20 - 09 - 2014
 * LastUpdate: 20 - 09 - 2014
 * version: 1.0.1
 *
 * Name: Prototype.js
 *
 * Description:
 *   Set of functions for extending native public behaivor of classes/objects
*/

//Append the function "method" to every function made, in this way
// we can call: "class.method('name', callback)" for OOP pseudo code
Function.prototype.method = function(name, func){
  if(!this.prototype[name]){
    this.prototype[name] = func;
    return this;
  }
};
