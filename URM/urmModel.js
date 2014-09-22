const debug = require("debug")("MODEL"),
      FormalURM = require('./FormalURM');

function URModel(urmObject){
  if(!(urmObject instanceof FormalURM)){
    debug("Argument is not an instanceof of FormalURM.");
    throw new Error("Not a formal configuration for making a URM");
  }

  this.conf = urmObject;
  this.registers = urmObject.conditions.slice();

  //this.Z = require('../Operations/Z');
  //this.S = require('../Operations/S');
  //this.T = require('../Operations/T');
  //this.J = require('../Operations/J');
}

URModel.method('next',function(){

});

module.exports = URModel;
