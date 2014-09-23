/**
 * Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
 *
 * Date: 20 - 09 - 2014
 * LastUpdate: 21 - 09 - 2014
 * version: 0.0.1~alpha
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
 * Advance is in charge of make the next step and execute every operation
 *
*/
URModel.method('advance',function(){
  var operations = require('./Operations');

  this.current = this.instructions[this.position];
  this.step++;

  debug(this.instructions,this.position-1);

  if(this.current.indexOf("(")  === -1 || this.current.indexOf(")")===-1){
    debug("Malformed operation at:"+ (this.position+1));
    throw new Error("Malformed operation at line:"+ (this.position+1) + " in source file. You should call 'Operation(n)' or just: 'J(n,m,q)' for example.");
  }

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

  operations[op].call(this,args);
});

function makeLog(){
  var stp = this.step,
      inst = this.position,
      rgstr = "["+this.registers.toString()+"]",
      finalStr = "";

  finalStr = "Step "+stp+" >>";
  finalStr+="\tI"+inst+":"+this.current;
  finalStr+="\n\t->  "+rgstr;

  return finalStr;
}

URModel.method('log',function(){
  this.logs.push(makeLog.apply(this));
});

URModel.method('print',function(){
  console.log(makeLog.apply(this));
});

URModel.method('run',function(){
  //while(this.position < this.instructions.length){
  this.advance();
  this.log();
  this.print();
  debug(this);
  //}
});

URModel.__defineGetter__("version",function(){
  return "0.0.1~alpha";
});

module.exports = URModel;
