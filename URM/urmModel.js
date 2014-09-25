/**
 * Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
 *
 * Date: 20 - 09 - 2014
 * LastUpdate: 21 - 09 - 2014
 * version: 1.0.0
 *
 * Name: urmModel.js
 *
 * Description:
 *   This is the machine as we now. This machine makes the operations and makes the steps.
*/

const debug = require("debug")("MODEL"),
      FormalURM = require('./FormalURM');

function URModel(urmObject){
  if(!(urmObject instanceof FormalURM)){
    debug("Argument is not an instanceof of FormalURM.");
    throw new Error("Not a formal configuration for making a URM");
  }
  //Get a new copy of the initial conditiions as an array. This will be the
  // registers that we'll be modifing
  this.registers = urmObject.conditions.slice();
  //Internal counter for know how much work we did at the end.
  this.step = 0;

  //Position refers to instruction
  this.position = 0;
  this.current = "";

  this.logs = [];
  //make the configuration only readable
  this.__defineGetter__('configuration',function(){
    return urmObject;
  });

  //make the set of instructions only readable but avalible on this urm
  this.__defineGetter__('instructions',function(){
    return urmObject.instructions;
  });
}

//Append the method advance to every URM
/*
 * Advance is in charge of make the next step and execute every operation on our set of instructions
 *
*/
URModel.method('advance',function(){
  //Get the actual step of operations
  var operations = require('./Operations');

  //Get the current operation to make
  this.current = this.instructions[this.position];
  //Advance one step, notice that step isn't a instruction, is just for count the total steps made.
  this.step++;

  //If the instruction isn't of the form I(*) throw a new error
  if(this.current.indexOf("(")  === -1 || this.current.indexOf(")")===-1){
    debug("Malformed operation at:"+ (this.position+1));
    throw new Error("Malformed operation at line:"+ (this.position+1) + " in source file. You should call 'Operation(n)' or just: 'J(n,m,q)' for example.");
  }

  //Parse the string of the instruction
  var iElmnts = this.current.split('('),
      op = iElmnts[0],
      args = iElmnts[1].split(")")[0];

  if(op.length < 1 || !(op in operations)){
    throw new Error("Operation "+op+" not defined")
  }

  if(args.length < 1){
    debug("Operation with no arguments");
    throw new Error("Can't operate if arguments aren't provided for operation "+op+".");
  }

  //Call the operation method on our array of instructions with the context of our URM
  operations[op].call(this,args);
});

/*
 *  MakeLog is a function in charge of making a sting.
 *      The reason to be on a single function is because "log" and "print" functions both make 0
 *        the same string for logging, but log is intended to store the log for debug reasons.
 *
 */
function makeLog(){
  var stp = this.step,
      inst = this.position,
      rgstr = "["+this.registers.toString()+"]",
      finalStr = "";

  finalStr = "Step "+stp+" >>";
  finalStr+="\n\tI"+inst+":"+this.current;
  finalStr+="\n\t->  "+rgstr;

  return finalStr;
}

//Store in an array the total logs/strings that the program throws. This is intended to be used with a external logfile
// in future version
URModel.method('log',function(){
  this.logs.push(makeLog.apply(this));
});

//Just throw the current string to stdout
URModel.method('print',function(){
  console.log(makeLog.apply(this));
});

//Start this machine.
URModel.method('run',function(){
  //If position is bigger than the total set of instructions, stop, otherwise go to next instruction and print
  //  the current state of the urm
  while(this.position < this.instructions.length){
    this.advance();
    this.log();
    this.print();
    //debug(this);
  }
});

//Version of this set of functions
URModel.__defineGetter__("version",function(){
  return "1.0.0";
});

//Make this an avalible module.
module.exports = URModel;
